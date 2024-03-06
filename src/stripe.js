require("dotenv").config();

const advertisingStripe = require("stripe")(process.env.ADVERTISERS_SECRET_KEY);
const jobsStripe = require("stripe")(process.env.JOBS_SECRET_KEY);
const eventsStripe = require("stripe")(process.env.EVENTS_SECRET_KEY);
const manufacturersStripe = require("stripe")(
  process.env.MANUFACTURERS_SECRET_KEY
);

const stripeController = {
  createAdvertiserCustomer: async (name, email) => {
    const customer = await advertisingStripe.customers.create({
      name,
      email,
    });

    return customer.id;
  },

  createJobCustomer: async (name, email) => {
    const customer = await jobsStripe.customers.create({
      name,
      email,
    });

    return customer.id;
  },

  createEventCustomer: async (name, email) => {
    const customer = await eventsStripe.customers.create({
      name,
      email,
    });

    return customer.id;
  },

  createManufacturerCustomer: async (name, email) => {
    const customer = await manufacturersStripe.customers.create({
      name,
      email,
    });

    return customer.id;
  },

  createAdvertisersCheckoutSession: async (customerId, priceId, accountId) => {
    const session = await advertisingStripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        mode: "subscription",
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.CLIENT_URL}/paymentgatewaydashboard?success=true&customerId=${customerId}&priceId=${priceId}`,
        cancel_url: `${process.env.CLIENT_URL}/paymentgatewaydashboard?success=false&customerId=${customerId}&priceId=${priceId}`,
      },
      {
        stripeAccount: accountId,
      }
    );

    return session.url;
  },

  createJobsCheckoutSession: async (customerId, priceId, accountId) => {
    const session = await jobsStripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        mode: "subscription",
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.CLIENT_URL}/paymentgatewaydashboard?success=true&customerId=${customerId}&priceId=${priceId}`,
        cancel_url: `${process.env.CLIENT_URL}/paymentgatewaydashboard?success=false&customerId=${customerId}&priceId=${priceId}`,
      },
      {
        stripeAccount: accountId,
      }
    );

    return session.url;
  },

  createEventsCheckoutSession: async (customerId, priceId, accountId) => {
    const session = await eventsStripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        mode: "subscription",
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.CLIENT_URL}/paymentgatewaydashboard?success=true&customerId=${customerId}&priceId=${priceId}`,
        cancel_url: `${process.env.CLIENT_URL}/paymentgatewaydashboard?success=false&customerId=${customerId}&priceId=${priceId}`,
      },
      {
        stripeAccount: accountId,
      }
    );

    return session.url;
  },

  createManufacturersCheckoutSession: async (
    customerId,
    priceId,
    accountId
  ) => {
    const session = await manufacturersStripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        mode: "subscription",
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.CLIENT_URL}/paymentgatewaydashboard?success=true&customerId=${customerId}&priceId=${priceId}`,
        cancel_url: `${process.env.CLIENT_URL}/paymentgatewaydashboard?success=false&customerId=${customerId}&priceId=${priceId}`,
      },
      {
        stripeAccount: accountId,
      }
    );

    return session.url;
  },

  createAdvertiserCustomerPortalSession: async (customerId, accountId) => {
    const session = await advertisingStripe.billingPortal.sessions.create(
      {
        customer: customerId,
        return_url: `${process.env.CLIENT_URL}/advtsubscription`,
      },
      {
        stripeAccount: accountId,
      }
    );

    return session.url;
  },

  createJobCustomerPortalSession: async (customerId, accountId) => {
    const session = await jobsStripe.billingPortal.sessions.create(
      {
        customer: customerId,
        return_url: `${process.env.CLIENT_URL}/jobssubscription`,
      },
      {
        stripeAccount: accountId,
      }
    );

    return session.url;
  },

  createEventCustomerPortalSession: async (customerId, accountId) => {
    const session = await eventsStripe.billingPortal.sessions.create(
      {
        customer: customerId,
        return_url: `${process.env.CLIENT_URL}/eventssubscription`,
      },
      {
        stripeAccount: accountId,
      }
    );

    return session.url;
  },

  createManufacturerCustomerPortalSession: async (customerId, accountId) => {
    const session = await manufacturersStripe.billingPortal.sessions.create(
      {
        customer: customerId,
        return_url: `${process.env.CLIENT_URL}/manufacturersubscription`,
      },
      {
        stripeAccount: accountId,
      }
    );

    return session.url;
  },

  handleAdvertisersWebhook: async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = advertisingStripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.ADVERTISERS_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err);
      return res
        .status(400)
        .send(`Webhook Error: ${err.message}`);
    }

    const subscription = event.data.object;
    const customerId = subscription.customer;
    const priceId = subscription.plan.id;

    response = {};

    switch (event.type) {
      case "customer.subscription.created":
        console.log("Created");
        response.type = "Created";
        response.customerId = customerId;
        response.priceId = priceId;
        break;
      case "customer.subscription.updated":
        console.log("Updated");
        response.type = "Updated";
        response.customerId = customerId;
        response.priceId = priceId;
        break;
      case "customer.subscription.deleted":
        console.log("Deleted");
        response.type = "Deleted";
        response.customerId = customerId;
        response.priceId = null;
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return response;
  },

  handleJobsWebhook: async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = jobsStripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.JOBS_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`);
      return res
        .status(400)
        .send(`Webhook Error: ${err.message}`);
    }

    const subscription = event.data.object;
    const customerId = subscription.customer;
    const priceId = subscription.plan.id;

    response = {};

    switch (event.type) {
      case "customer.subscription.created":
        console.log("Created");
        response.type = "Created";
        response.customerId = customerId;
        response.priceId = priceId;
        break;
      case "customer.subscription.updated":
        console.log("Updated");
        response.type = "Updated";
        response.customerId = customerId;
        response.priceId = priceId;
        break;
      case "customer.subscription.deleted":
        console.log("Deleted");
        response.type = "Deleted";
        response.customerId = customerId;
        response.priceId = null;
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return response;
  },

  handleEventsWebhook: async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = eventsStripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.EVENTS_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`);
      return res
        .status(400)
        .send(`Webhook Error: ${err.message}`);
    }

    const subscription = event.data.object;
    const customerId = subscription.customer;
    const priceId = subscription.plan.id;

    response = {};

    switch (event.type) {
      case "customer.subscription.created":
        console.log("Created");
        response.type = "Created";
        response.customerId = customerId;
        response.priceId = priceId;
        break;
      case "customer.subscription.updated":
        console.log("Updated");
        response.type = "Updated";
        response.customerId = customerId;
        response.priceId = priceId;
        break;
      case "customer.subscription.deleted":
        console.log("Deleted");
        response.type = "Deleted";
        response.customerId = customerId;
        response.priceId = null;
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return response;
  },

  handleManufacturersWebhook: async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = manufacturersStripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.MANUFACTURERS_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`);
      return res
        .status(400)
        .send(`Webhook Error: ${err.message}`);
    }

    const subscription = event.data.object;
    const customerId = subscription.customer;
    const priceId = subscription.plan.id;

    response = {};

    switch (event.type) {
      case "customer.subscription.created":
        console.log("Created");
        response.type = "Created";
        response.customerId = customerId;
        response.priceId = priceId;
        break;
      case "customer.subscription.updated":
        console.log("Updated");
        response.type = "Updated";
        response.customerId = customerId;
        response.priceId = priceId;
        break;
      case "customer.subscription.deleted":
        console.log("Deleted");
        response.type = "Deleted";
        response.customerId = customerId;
        response.priceId = null;
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return response;
  },
};

module.exports = stripeController;
