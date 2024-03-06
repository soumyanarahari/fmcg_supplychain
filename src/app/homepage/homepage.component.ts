import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  userForm: FormGroup;
  showSidebar: boolean = false;
  sidebarExpanded = true;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  constructor(
    private router: Router,
    public http: HttpClient,
    private formBuilder: FormBuilder,
	private userService: UserService,
  ) {
    this.userForm = this.formBuilder.group({
      // username: { value: '', disabled: true },
      email: { value: "", disabled: true },
      // Add other form controls as needed
    });
  }
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  toggleSidebar1(): void {
    this.showSidebar = !this.showSidebar;
  }
  populateUserDetails(): void {
    // const userId = this.authService.getUserId(); // Assuming you have a method to get the user ID

    // if (userId) {
    this.userService.getUserDetails().subscribe(
      (user) => {
        console.log(`homests ${user}`);
        this.userForm.patchValue(user); // Populate form with user details
      },
      (error) => {
        console.error("Error fetching user details:", error);
      }
    );
    // }
  }
  subscribeForNewsletter(email:string):void{
	const emailInput =email;
	  // if (this.userId) {
	  
		// const eventData = { title, description, date, userId: this.userId };
		
		this.userService.subscribeForNewsletter(emailInput).subscribe({
		  next: (response) => {
			console.log('newsletters successfully:', response);
			// Add any additional logic here (e.g., redirect to a different page)
		  },
		  error: (error) => {
			console.error('Error newsletter:', error);
			// Handle error (e.g., display an error message to the user)
		  },
		});
	  // } else {
	  //   console.error('User ID is null. Unable to create event.');
	  //   // Handle the case where user ID is not available
	  // }
	}
  ngOnInit() {
    this.populateUserDetails();
  }
}
