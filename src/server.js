const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const cors = require("cors"); // Import the cors middleware
const app = express();
const PORT = 3000;
const {
  createAdvertiserCustomer,
  createJobCustomer,
  createEventCustomer,
  createManufacturerCustomer,
  createAdvertisersCheckoutSession,
  createJobsCheckoutSession,
  createEventsCheckoutSession,
  createManufacturersCheckoutSession,
  createAdvertiserCustomerPortalSession,
  createJobCustomerPortalSession,
  createEventCustomerPortalSession,
  createManufacturerCustomerPortalSession,
  handleAdvertisersWebhook,
  handleJobsWebhook,
  handleEventsWebhook,
  handleManufacturersWebhook,
} = require("./stripe");
const util = require("util");

app.post(
  "/api/advertisersWebhooks",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const response = await handleAdvertisersWebhook(req, res);

    const advertiserSubscriptionsQuery =
      "SELECT id FROM advertiser_subscriptions WHERE price_id = ?";
    const advertiserSubscription = await queryAsync(
      advertiserSubscriptionsQuery,
      [response.priceId]
    );

    const updateUserQuery =
      "UPDATE users1 SET advertiser_subscription_id = ? WHERE advertiser_customer_id = ?";
    await queryAsync(updateUserQuery, [
      advertiserSubscription[0].id,
      response.customerId,
    ]);

    res.status(200).json({ received: true });
  }
);
app.post(
  "/api/jobsWebhooks",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const response = await handleJobsWebhook(req, res);

    const jobSubscriptionsQuery =
      "SELECT id FROM job_subscriptions WHERE price_id = ?";
    const jobSubscription = await queryAsync(jobSubscriptionsQuery, [
      response.priceId,
    ]);

    const updateUserQuery =
      "UPDATE users1 SET job_subscription_id = ? WHERE job_customer_id = ?";
    await queryAsync(updateUserQuery, [
      jobSubscription[0].id,
      response.customerId,
    ]);

    res.status(200).json({ received: true });
  }
);
app.post(
  "/api/eventsWebhooks",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const response = await handleEventsWebhook(req, res);

    const eventSubscriptionsQuery =
      "SELECT id FROM event_subscriptions WHERE price_id = ?";
    const eventSubscription = await queryAsync(eventSubscriptionsQuery, [
      response.priceId,
    ]);

    const updateUserQuery =
      "UPDATE users1 SET event_subscription_id = ? WHERE event_customer_id = ?";
    await queryAsync(updateUserQuery, [
      eventSubscription[0].id,
      response.customerId,
    ]);

    res.status(200).json({ received: true });
  }
);
app.post(
  "/api/manufacturersWebhooks",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const response = await handleManufacturersWebhook(req, res);

    const manufacturerSubscriptionsQuery =
      "SELECT id FROM manufacturer_subscriptions WHERE price_id = ?";
    const manufacturerSubscription = await queryAsync(
      manufacturerSubscriptionsQuery,
      [response.priceId]
    );

    const updateUserQuery =
      "UPDATE users1 SET manufacturer_subscription_id = ? WHERE manufacturer_customer_id = ?";
    await queryAsync(updateUserQuery, [
      manufacturerSubscription[0].id,
      response.customerId,
    ]);

    res.status(200).json({ received: true });
  }
);

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "162.241.252.224",
  user: "mijohhmy",
  password: "Pass,1234",
  // host: "localhost",
  // user: "root",
  // password: "password",
  database: "mijohhmy_phytolabcommunity",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

const queryAsync = util.promisify(db.query).bind(db);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "samantha@nextworldconsumer.com",
    pass: "Pass,1234",
  },
});
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const authToken = token.split(" ")[1];

  jwt.verify(authToken, "your-secret-key", (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      console.error("Error verifying token:", err);
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = decoded;
    next();
  });
}
app.get("/api/get-userDetails", authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.query("SELECT * FROM users1 WHERE id = ?", [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const userDetails = {
      username: results[0].name,
      email: results[0].email,
      userType: results[0].userType,
      // Add other user details as needed
    };
    res.json(userDetails);
  });
});
app.post("/api/subscribe-to-newsletter", authenticateToken, (req, res) => {
  const { emailInput } = req.body;
  const userId = req.user.id;

  console.log(emailInput, userId);
  // Store user in the database

  db.query(
    "INSERT INTO newsletter_subscription ( email, userId) VALUES (?, ?)",
    [emailInput, userId],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
        // reject(err);
      }
      res.status(200).json({ message: "Newsletter subscription successful" });
    }
  );
});
// Endpoint to get username from token
app.get("/api/get-username", authenticateToken, (req, res) => {
  // The authenticated user's information is available in req.user
  // res.json({ username: req.user.username });
  const userId = req.user.id;
  var username = "";
  db.query("SELECT name FROM users1 WHERE id = ?", [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    username = results[0].name;
    console.log(`username is ${results[0].name} & id is ${userId}`);
    res.json({ username });
  });
  // const username = req.user.username;
  // console.log(req.user);
  // console.log(username);
  // res.json({ username: username });
});

app.get("/api/get-user-id", authenticateToken, (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    console.log(userId);
    if (userId) {
      res.status(200).json({ userId });
    } else {
      res.status(500).json({ error: "User ID not available" });
    }
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const authToken = token.split(" ")[1];

  jwt.verify(authToken, "your-secret-key", (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      console.error("Error verifying token:", err);
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = user;
    next();
  });
}

app.post("/api/create-event", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const {
      // userId,
      event_name,
      event_date,
      street,
      postal_code,
      city,
      country,
      event_scheduled_date,
      state,
    } = req.body;
    // const eventCreaterId = userId.userId;
    // console.log(`from server file ${userId.userId}`);
    // Log relevant information
    console.log("Received request to create event:", {
      // userId: eventCreaterId,
      event_name,
      event_date,
      street,
      postal_code,
      city,
      country,
      event_scheduled_date,
      state,
    });

    // Your existing code for handling event creation
    const eventId = await createEvent(
      // eventCreaterId,
      userId,
      event_name,
      event_date,
      street,
      postal_code,
      city,
      country,
      event_scheduled_date,
      state
    );

    // Respond with the created event ID
    
    res.status(200).json({ message: "Event created successfully", eventId });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Function for creating an event and storing in the database
async function createEvent(
  userId,
  event_name,
  event_date,
  street,
  postal_code,
  city,
  country,
  event_scheduled_date,
  state
) {
  return new Promise((resolve, reject) => {
    // MySQL query to insert event details
    const query =
      "INSERT INTO events (userId, event_name, event_date, street, postal_code, city, country, event_scheduled_date, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      userId,
      event_name,
      event_date,
      street,
      postal_code,
      city,
      country,
      event_scheduled_date,
      state,
    ];

    // Execute the query
    db.query(query, values, (error, results) => {
      if (error) {
        // Handle database insertion error
        console.error("Error inserting event into database:", error);
        reject("Internal Server Error");
      } else {
        // Resolve with the ID of the newly created event
        resolve(results.insertId);
      }
    });
  });
}

app.get("/api/my-events", authenticateToken, (req, res) => {
  const userId = req.user.id; // Assuming username is the user identifier

  // Retrieve events from the database for the specific user
  db.query(
    "SELECT * FROM events WHERE userId = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);

    }
  );
});

const allEventsQuery = `
  SELECT events1.*, users3.subscription_plan
  FROM events1
  JOIN users3 ON events1.userId = users3.id
  ORDER BY users3.subscription_plan DESC
`;

app.get("/api/all-events", authenticateToken, (req, res) => {
  try {
    db.query(allEventsQuery, (error, results) => {
      if (error) {
        console.error("Error fetching all events:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      console.log(results);
      // res.status(200).json({ events: results });
      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching all events:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Read the HTML template file
const emailTemplate = fs.readFileSync("emailTemplate.ejs", "utf-8");

// app.post('/api/register', (req, res) => {
//   const { username, password, email } = req.body;

//   // Hash the password
//   bcrypt.hash(password, 10, (err, hash) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     // Store user in the database
//     db.query(
//       'INSERT INTO users1 (name, password, email) VALUES (?, ?,?)',
//       [username, hash,email],
//       (err) => {
//         if (err) {
//           return res.status(500).json({ error: err.message });
//         }
//         res.json({ message: 'User registered successfully' });
//       }
//     );
//   });
//   const renderedTemplate = ejs.render(emailTemplate, { username: username });
//   const emailOptions = {
//     from: 'samantha@nextworldconsumer.com',
//     to: email, // Assuming newUser is the registered user object
//     subject: 'Thanks for Registering!',
//     html: renderedTemplate,
//   };

//   transporter.sendMail(emailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });

// });
app.post("/api/register", (req, res) => {
  const { username, password, email, userType } = req.body;
  const renderedTemplate = ejs.render(emailTemplate, { username: username });
  const emailOptions = {
    from: "samantha@nextworldconsumer.com",
    to: email, // Assuming newUser is the registered user object
    subject: "Thanks for Registering!",
    html: renderedTemplate,
  };
  async function addSubscription(userId, subscriptionType, planType) {
    // Insert a new subscription for the user
    const query =
      "INSERT INTO subscriptions1 (userId, subscription_type, plan_type) VALUES (?, ?, ?)";
    const values = [userId, subscriptionType, planType];

    return new Promise((resolve, reject) => {
      db.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId); // Return the subscription ID if needed
        }
      });
    });
  }
// Check if email already exists
// db.query('SELECT * FROM users1 WHERE email = ?', [email], (error, results) => {
//   if (error) {
//     res.status(500).json({ error: 'Internal server error' });
//     return;
//   }

//   if (results.length > 0) {
//     res.status(400).json({ error: 'Email already exists' });
//     return;
//   }
// })
  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Store user in the database
    new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users1 (name, password, email, userType) VALUES (?, ?, ?, ?)",
        [username, hash, email, userType],
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results.insertId);
        }
      );
    })
      .then((userId) => {
        const subscriptionTypes = [
          "events",
          "jobs",
          "advertising",
          "manufacturer",
        ];
        for (const type of subscriptionTypes) {
          addSubscription(userId, type, "basic");
        }
        transporter.sendMail(emailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
        res.json({ message: "User registered successfully" });
      })
      .catch((error) => {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });
});

// Login user
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  db.query("SELECT * FROM users1 WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    bcrypt.compare(password, results[0].password, (error, match) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (!match) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate a token with user ID and username in the payload
      const token = jwt.sign({ id: results[0].id, email }, "your-secret-key", {
        expiresIn: "1h",
      });
      res.json({ token });
    });
  });
});

// server.js
// app.get('/api/get-current-subscription-plan', authenticateToken, (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming you have a user ID after authentication

//     // Replace the following line with your actual database query to fetch the subscription plan
//     // For example, if you have a column named 'subscription_plan' in your 'users' table
//     db.query('SELECT subscription_plan FROM users3 WHERE id = ?', [userId], (error, results) => {
//       if (error) {
//         console.error('Error fetching subscription plan:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       } else {
//         const subscriptionPlan = results[0]?.subscription_plan || 'basic';
//         res.status(200).json(subscriptionPlan);
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching subscription plan:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
app.post(
  "/api/upgrade-subscription/:type",
  authenticateToken,
  async (req, res) => {
    try {
      const { type } = req.params;
      const userId = req.user.id; // Assuming you have a middleware that adds user information to the request

      // Check if the user has an existing subscription for the given type
      const existingSubscription = await getSubscription(userId, type);

      if (!existingSubscription) {
        return res.status(404).json({
          message: "No existing subscription found for the given type",
        });
      }

      // Check if the existing subscription is a basic plan
      if (existingSubscription.plan_type !== "basic") {
        return res
          .status(400)
          .json({ message: "Cannot upgrade a non-basic subscription" });
      }

      // Perform the upgrade (change the plan_type to 'premium' or your equivalent)
      const updatedSubscription = await upgradeSubscription(userId, type);

      res.status(200).json({
        message: "Subscription upgraded successfully",
        subscription: updatedSubscription,
      });
    } catch (error) {
      console.error("Error upgrading subscription:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
async function getSubscription(userId, subscriptionType) {
  const query =
    "SELECT * FROM subscriptions1 WHERE userId = ? AND subscription_type = ?";
  const values = [userId, subscriptionType];

  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]); // Assuming a user can have only one subscription of a specific type
      }
    });
  });
}

async function upgradeSubscription(userId, subscriptionType) {
  const query =
    'UPDATE subscriptions1 SET plan_type = "premium" WHERE userId = ? AND subscription_type = ?';
  const values = [userId, subscriptionType];

  return new Promise((resolve, reject) => {
    db.query(query, values, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve({ userId, subscriptionType, plan_type: "premium" }); // Return the updated subscription details
      }
    });
  });
}
app.get(
  "/api/get-current-subscription-plan/:type",
  authenticateToken,
  (req, res) => {
    try {
      const userId = req.user.id; // Assuming you have a user ID after authentication
      const { type } = req.params;
      // Replace the following line with your actual database query to fetch the subscription plan
      // For example, if you have a column named 'subscription_plan' in your 'users' table

      db.query(
        "SELECT plan_type FROM subscriptions1 WHERE userId = ? AND subscription_type = ?",
        [userId, type],
        (error, results) => {
          if (error) {
            console.error("Error fetching subscription plan:", error);
            res.status(500).json({ message: "Internal Server Error" });
          } else {
            console.log(results);
            const subscriptionPlan = results[0].plan_type || "basic";
            res.status(200).json(subscriptionPlan);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching subscription plan:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

app.post("/api/userSubscriptions", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  const userQuery =
    "SELECT u.id, u.advertiser_subscription_id, a.title as advertiser_subscription_title, a.price_id as advertiser_subscription_price_id, u.job_subscription_id, j.title as job_subscription_title, j.price_id as job_subscription_price_id, u.event_subscription_id, e.title as event_subscription_title, e.price_id as event_subscription_price_id, u.manufacturer_subscription_id, m.title as manufacturer_subscription_title, m.price_id as manufacturer_subscription_price_id FROM users1 u LEFT JOIN advertiser_subscriptions a on u.advertiser_subscription_id = a.id LEFT JOIN job_subscriptions j on u.job_subscription_id = j.id LEFT JOIN event_subscriptions e on u.event_subscription_id = e.id LEFT JOIN manufacturer_subscriptions m on u.manufacturer_subscription_id = m.id WHERE u.id = ?";

  const userResults = await queryAsync(userQuery, [userId]);

  if (userResults.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(userResults[0]);
});

app.get("/api/advertiserSubscriptions", (req, res) => {
  const query = "SELECT id, title, price_id FROM advertiser_subscriptions";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching advertiser subscriptions:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(results);
  });
});

app.get("/api/jobSubscriptions", (req, res) => {
  const query = "SELECT id, title, price_id FROM job_subscriptions";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching job subscriptions:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(results);
  });
});

app.get("/api/eventSubscriptions", (req, res) => {
  const query = "SELECT id, title, price_id FROM event_subscriptions";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching event subscriptions:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(results);
  });
});

app.get("/api/manufacturerSubscriptions", (req, res) => {
  const query = "SELECT id, title, price_id FROM manufacturer_subscriptions";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching manufacturer subscriptions:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const formattedResults = results.map((result) => {
      if (result.title.includes("Yearly")) {
        return {
          ...result,
          isYearly: true,
        };
      } else {
        return {
          ...result,
          isYearly: false,
        };
      }
    });

    res.status(200).json(formattedResults);
  });
});

app.post(
  "/api/createAdvertisersCheckoutSession",
  authenticateToken,
  async (req, res) => {
    const {
      priceId,
      first,
      last,
      streetAddress,
      city,
      zipCode,
      state,
      country,
      billToContactAddress,
      taxId,
    } = req.body;
    const userId = req.user.id;

    if (!userId || !priceId) {
      return res.status(400).json({ error: "Missing information in payload" });
    }

    try {
      const userQuery =
        "SELECT id, name, email, advertiser_customer_id, advertiser_subscription_id FROM users1 WHERE id = ?";

      const userResults = await queryAsync(userQuery, [userId]);

      if (userResults.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      if (userResults[0].advertiser_subscription_id) {
        return res.status(400).json({ error: "User already subscribed" });
      }

      let customerId = userResults[0].advertiser_customer_id;

      if (!customerId) {
        customerId = await createAdvertiserCustomer(
          userResults[0].name,
          userResults[0].email
        );

        const updateQuery =
          "UPDATE users1 SET advertiser_customer_id = ? WHERE id = ?";
        await queryAsync(updateQuery, [customerId, userId]);
      }

      const subscriptionQuery =
        "SELECT id, title, price_id, account_id FROM advertiser_subscriptions WHERE price_id = ?";

      const subscriptionResults = await queryAsync(subscriptionQuery, [
        priceId,
      ]);

      storeUserBillingDetails(
        userId,
        first,
        last,
        streetAddress,
        city,
        zipCode,
        state,
        country,
        billToContactAddress,
        taxId
      );

      const checkoutSession = await createAdvertisersCheckoutSession(
        customerId,
        priceId,
        subscriptionResults[0].account_id
      );

      res.send(checkoutSession);
    } catch (err) {
      console.error("Error processing request:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.post(
  "/api/createJobsCheckoutSession",
  authenticateToken,
  async (req, res) => {
    const {
      priceId,
      first,
      last,
      streetAddress,
      city,
      zipCode,
      state,
      country,
      billToContactAddress,
      taxId,
    } = req.body;
    const userId = req.user.id;

    if (!userId || !priceId) {
      return res.status(400).json({ error: "Missing information in payload" });
    }

    try {
      const userQuery =
        "SELECT id, name, email, job_customer_id, job_subscription_id FROM users1 WHERE id = ?";

      const userResults = await queryAsync(userQuery, [userId]);

      if (userResults.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      if (userResults[0].job_subscription_id) {
        return res.status(400).json({ error: "User already subscribed" });
      }

      let customerId = userResults[0].job_customer_id;

      if (!customerId) {
        customerId = await createJobCustomer(
          userResults[0].name,
          userResults[0].email
        );

        const updateQuery =
          "UPDATE users1 SET job_customer_id = ? WHERE id = ?";
        await queryAsync(updateQuery, [customerId, userId]);
      }

      const subscriptionQuery =
        "SELECT id, title, price_id, account_id FROM job_subscriptions WHERE price_id = ?";

      const subscriptionResults = await queryAsync(subscriptionQuery, [
        priceId,
      ]);

      storeUserBillingDetails(
        userId,
        first,
        last,
        streetAddress,
        city,
        zipCode,
        state,
        country,
        billToContactAddress,
        taxId
      );

      const checkoutSession = await createJobsCheckoutSession(
        customerId,
        priceId,
        subscriptionResults[0].account_id
      );

      res.send(checkoutSession);
    } catch (err) {
      console.error("Error processing request:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.post(
  "/api/createEventsCheckoutSession",
  authenticateToken,
  async (req, res) => {
    const {
      priceId,
      first,
      last,
      streetAddress,
      city,
      zipCode,
      state,
      country,
      billToContactAddress,
      taxId,
    } = req.body;
    const userId = req.user.id;

    if (!userId || !priceId) {
      return res.status(400).json({ error: "Missing information in payload" });
    }

    try {
      const userQuery =
        "SELECT id, name, email, event_customer_id, event_subscription_id FROM users1 WHERE id = ?";

      const userResults = await queryAsync(userQuery, [userId]);

      if (userResults.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      if (userResults[0].event_subscription_id) {
        return res.status(400).json({ error: "User already subscribed" });
      }

      let customerId = userResults[0].event_customer_id;

      if (!customerId) {
        customerId = await createEventCustomer(
          userResults[0].name,
          userResults[0].email
        );

        const updateQuery =
          "UPDATE users1 SET event_customer_id = ? WHERE id = ?";
        await queryAsync(updateQuery, [customerId, userId]);
      }

      const subscriptionQuery =
        "SELECT id, title, price_id, account_id FROM event_subscriptions WHERE price_id = ?";

      const subscriptionResults = await queryAsync(subscriptionQuery, [
        priceId,
      ]);

      storeUserBillingDetails(
        userId,
        first,
        last,
        streetAddress,
        city,
        zipCode,
        state,
        country,
        billToContactAddress,
        taxId
      );

      const checkoutSession = await createEventsCheckoutSession(
        customerId,
        priceId,
        subscriptionResults[0].account_id
      );

      res.send(checkoutSession);
    } catch (err) {
      console.error("Error processing request:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.post(
  "/api/createManufacturersCheckoutSession",
  authenticateToken,
  async (req, res) => {
    const {
      priceId,
      first,
      last,
      streetAddress,
      city,
      zipCode,
      state,
      country,
      billToContactAddress,
      taxId,
    } = req.body;
    const userId = req.user.id;

    if (!userId || !priceId) {
      return res.status(400).json({ error: "Missing information in payload" });
    }

    try {
      const userQuery =
        "SELECT id, name, email, manufacturer_customer_id, manufacturer_subscription_id FROM users1 WHERE id = ?";

      const userResults = await queryAsync(userQuery, [userId]);

      if (userResults.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      if (userResults[0].manufacturer_subscription_id) {
        return res.status(400).json({ error: "User already subscribed" });
      }

      let customerId = userResults[0].manufacturer_customer_id;

      if (!customerId) {
        customerId = await createManufacturerCustomer(
          userResults[0].name,
          userResults[0].email
        );

        const updateQuery =
          "UPDATE users1 SET manufacturer_customer_id = ? WHERE id = ?";
        await queryAsync(updateQuery, [customerId, userId]);
      }

      const subscriptionQuery =
        "SELECT id, title, price_id, account_id FROM manufacturer_subscriptions WHERE price_id = ?";

      const subscriptionResults = await queryAsync(subscriptionQuery, [
        priceId,
      ]);

      storeUserBillingDetails(
        userId,
        first,
        last,
        streetAddress,
        city,
        zipCode,
        state,
        country,
        billToContactAddress,
        taxId
      );

      const checkoutSession = await createManufacturersCheckoutSession(
        customerId,
        priceId,
        subscriptionResults[0].account_id
      );

      res.send(checkoutSession);
    } catch (err) {
      console.error("Error processing request:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

const storeUserBillingDetails = (
  userId,
  first,
  last,
  streetAddress,
  city,
  zipCode,
  state,
  country,
  billToContactAddress,
  taxId
) => {
  const query =
    "INSERT INTO user_billing_details (user_id, first, last, street_address, city, zip_code, state, country, bill_to_contact_address, tax_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  queryAsync(query, [
    userId,
    first,
    last,
    streetAddress,
    city,
    zipCode,
    state,
    country,
    billToContactAddress,
    taxId,
  ]);
};

app.post(
  "/api/createAdvertiserCustomerPortalSession",
  authenticateToken,
  async (req, res) => {
    const userId = req.user.id;

    const query =
      "SELECT u.id, u.advertiser_customer_id, a.account_id FROM users1 u LEFT JOIN advertiser_subscriptions a on u.advertiser_subscription_id = a.id WHERE u.id = ?";

    const queryResults = await queryAsync(query, [userId]);

    if (queryResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (
      !queryResults[0].advertiser_customer_id ||
      !queryResults[0].account_id
    ) {
      return res
        .status(400)
        .json({ error: "User does not have any active subscriptions" });
    }

    const customerPortalSession = await createAdvertiserCustomerPortalSession(
      queryResults[0].advertiser_customer_id,
      queryResults[0].account_id
    );

    res.send(customerPortalSession);
  }
);

app.post(
  "/api/createJobCustomerPortalSession",
  authenticateToken,
  async (req, res) => {
    const userId = req.user.id;

    const query =
      "SELECT u.id, u.job_customer_id, j.account_id FROM users1 u LEFT JOIN job_subscriptions j on u.job_subscription_id = j.id WHERE u.id = ?";

    const queryResults = await queryAsync(query, [userId]);

    if (queryResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!queryResults[0].job_customer_id || !queryResults[0].account_id) {
      return res
        .status(400)
        .json({ error: "User does not have any active subscriptions" });
    }

    const customerPortalSession = await createJobCustomerPortalSession(
      queryResults[0].job_customer_id,
      queryResults[0].account_id
    );

    res.send(customerPortalSession);
  }
);

app.post(
  "/api/createEventCustomerPortalSession",
  authenticateToken,
  async (req, res) => {
    const userId = req.user.id;

    const query =
      "SELECT u.id, u.event_customer_id, e.account_id FROM users1 u LEFT JOIN event_subscriptions e on u.event_subscription_id = e.id WHERE u.id = ?";

    const queryResults = await queryAsync(query, [userId]);

    if (queryResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!queryResults[0].event_customer_id || !queryResults[0].account_id) {
      return res
        .status(400)
        .json({ error: "User does not have any active subscriptions" });
    }

    const customerPortalSession = await createEventCustomerPortalSession(
      queryResults[0].event_customer_id,
      queryResults[0].account_id
    );

    res.send(customerPortalSession);
  }
);

app.post(
  "/api/createManufacturerCustomerPortalSession",
  authenticateToken,
  async (req, res) => {
    const userId = req.user.id;

    const query =
      "SELECT u.id, u.manufacturer_customer_id, m.account_id FROM users1 u LEFT JOIN manufacturer_subscriptions m on u.advertiser_subscription_id = m.id WHERE u.id = ?";

    const queryResults = await queryAsync(query, [userId]);

    if (queryResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (
      !queryResults[0].manufacturer_customer_id ||
      !queryResults[0].account_id
    ) {
      return res
        .status(400)
        .json({ error: "User does not have any active subscriptions" });
    }

    const customerPortalSession = await createManufacturerCustomerPortalSession(
      queryResults[0].manufacturer_customer_id,
      queryResults[0].account_id
    );

    res.send(customerPortalSession);
  }
);
app.get(
  "/api/check-manufacturer-profile",
  authenticateToken,
  async (req, res) => {
    try {
      const userId = req.user.id;

      const results = await new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM m_profile WHERE userId = ?",
          [userId],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });

      let manufacturerProfileExists = false;

      if (results.length === 0) {
        res.json({ exists: manufacturerProfileExists });
      } else {
        manufacturerProfileExists = true;
        res.json({ exists: manufacturerProfileExists });
      }
    } catch (error) {
      console.error("Error checking manufacturer profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
app.post(
  "/api/update-manufacturer-profile",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        username,
        organization_name,
        designation,
        email,
        phone_number,
        street_address,
        city,
        postal_code,
        state,
        country,
      } = req.body;
      const userId = req.user.id;

      // Your existing code for handling event creation
      const eventId = await updateManufacturerProfile(
        userId,
        username,
        organization_name,
        designation,
        email,
        phone_number,
        street_address,
        city,
        postal_code,
        state,
        country
      );

      // Respond with the created event ID
      res
        .status(200)
        .json({ message: "Manufacturer profile updated successfully" });
    } catch (error) {
      // Log the error for debugging
      console.error("Error updating manufacturer profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
async function updateManufacturerProfile(
  userId,
  username,
  organization_name,
  designation,
  email,
  phone_number,
  street_address,
  city,
  postal_code,
  state,
  country
) {
  return new Promise((resolve, reject) => {
    // MySQL query to insert event details
    // const query =
    //   "UPDATE m_profile ( username, organization_name, designation, email,phone_number, street_address,city,postal_code,state,country ) SET (?, ?, ?, ?,?,?,?,?,?,?,?) WHERE userId = ?";
    // const values = [userId, username, organization_name, designation, email,phone_number, street_address,city,postal_code,state,country];
    const query = `
    UPDATE m_profile
    SET 
      username = ?,
      organization_name = ?,
      designation = ?,
      email = ?,
      phone_number = ?,
      street_address = ?,
      city = ?,
      postal_code = ?,
      state = ?,
      country = ?
    WHERE userId = ?
  `;
    const values = [
      username,
      organization_name,
      designation,
      email,
      phone_number,
      street_address,
      city,
      postal_code,
      state,
      country,
      userId,
    ];

    // Execute the query
    db.query(query, values, (error, results) => {
      if (error) {
        // Handle database insertion error
        console.error("Error inserting event into database:", error);
        reject("Internal Server Error");
      } else {
        // Resolve with the ID of the newly created event
        resolve(results.insertId);
      }
    });
  });
}
app.get(
  "/api/get-manufacturerProfileDetails",
  authenticateToken,
  (req, res) => {
    const userId = req.user.id;

    db.query(
      "SELECT * FROM m_profile WHERE userId = ?",
      [userId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const manufacturerProfileDetailsDetails = {
          username: results[0].username,
          email: results[0].email,
          organization_name: results[0].organization_name,
          designation: results[0].designation,

          phone_number: results[0].phone_number,
          street_address: results[0].street_address,
          city: results[0].city,
          postal_code: results[0].postal_code,
          state: results[0].state,
          country: results[0].country,
          // Add other user details as needed
        };
        res.json(manufacturerProfileDetailsDetails);
      }
    );
  }
);
app.post(
  "/api/create-manufacturer-profile",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        userId,
        username,
        organization_name,
        designation,
        email,
        phone_number,
        street_address,
        city,
        postal_code,
        state,
        country,
      } = req.body;
      // const userId = req.user.id;
      const mProfileCreaterId = userId.userId;

      console.log("Received request to create manufacturer profile:", {
        userId: mProfileCreaterId,
        username,
        organization_name,
        designation,
        email,
        phone_number,
        street_address,
        city,
        postal_code,
        state,
        country,
      });

      // Your existing code for handling event creation
      const eventId = await createManufacturerProfile(
        mProfileCreaterId,

        username,
        organization_name,
        designation,
        email,
        phone_number,
        street_address,
        city,
        postal_code,
        state,
        country
      );

      // Respond with the created event ID
      res.status(200).json({
        message: "Manufacturer profile created successfully",
        eventId,
      });
    } catch (error) {
      // Log the error for debugging
      console.error("Error creating event:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
async function createManufacturerProfile(
  userId,
  username,
  organization_name,
  designation,
  email,
  phone_number,
  street_address,
  city,
  postal_code,
  state,
  country
) {
  return new Promise((resolve, reject) => {
    // MySQL query to insert event details
    const query =
      "INSERT INTO m_profile (userId,  username, organization_name, designation, email,phone_number, street_address,city,postal_code,state,country ) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?)";
    const values = [
      userId,
      username,
      organization_name,
      designation,
      email,
      phone_number,
      street_address,
      city,
      postal_code,
      state,
      country,
    ];

    // Execute the query
    db.query(query, values, (error, results) => {
      if (error) {
        // Handle database insertion error
        console.error("Error inserting event into database:", error);
        reject("Internal Server Error");
      } else {
        // Resolve with the ID of the newly created event
        resolve(results.insertId);
      }
    });
  });
}
app.get("/api/subcategories", async (req, res) => {
  const { category } = req.query;

try {
  db.query(
    "SELECT product_subcategory.subcategory_name FROM product_subcategory JOIN product_category ON product_subcategory.category_id = product_category.category_id WHERE product_category.category_name = ?",
    [category],
    (error, results) => {
      if (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (!results || results.length === 0) {
        res.status(404).json({ message: 'No subcategories found for the given category' });
        return;
      }

      const subcategories = results.map((row) => row.subcategory_name);
      res.json(subcategories);
    }
  );
} catch (error) {
  console.error("Error fetching subcategories:", error);
  res.status(500).send("Internal Server Error");
}
});
// /api/get-eventDetails
app.get('/api/get-eventDetails/:event_id', (req, res) => {
  const { event_id } = req.params;

  // Execute a simple query to fetch event details from the 'events' table
  db.query('SELECT * FROM events WHERE id = ?', [event_id], (err, results) => {
    if (err) {
      console.error('Error fetching event details:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(results[0]); // Assuming 'id' is unique, so we return the first result
  });
});

// /api/update-event
app.post('/api/update-event', (req, res) => {
  const { id, event_name, event_date, street, postal_code, city, country, event_scheduled_date, state } = req.body;

  // Validate that 'id' is present in the request body
  if (!id) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  // You can handle the update logic here
  // Make sure to sanitize and validate your input data before updating the database

  db.query(
    'UPDATE events SET event_name=?, event_date=?, street=?, postal_code=?, city=?, country=?, event_scheduled_date=?, state=? WHERE id = ?',
    [event_name, event_date, street, postal_code, city, country, event_scheduled_date, state, id],
    (err, results) => {
      if (err) {
        console.error('Error updating event:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Check if the event was found and updated
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.json({ message: 'Event updated successfully' });
    }
  );
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { queryAsync };
