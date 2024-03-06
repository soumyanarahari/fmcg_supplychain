import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
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
import { ProfileService } from "../profile.service";
import { AuthService } from '../auth.service';
import { SubcategoryService } from '../subcategory.service';

@Component({
  selector: "app-maindashmanufacturer",
  templateUrl: "./maindashmanufacturer.component.html",
  styleUrls: ["./maindashmanufacturer.component.scss"],
  providers: [DatePipe], 
})
export class MaindashmanufacturerComponent implements OnInit {
  username$: Observable<any> = new Observable<any>();
  showSidebar: boolean = false;
  productForm: FormGroup;
  productCategories = ['Skincare', 'Haircare', 'Cannabis', 'Nutraceuticals', 'Colour Cosmetics','Body Care', 'Personal Care','PetCare'];
  subcategories: string[] = [];
 
  selectedSubcategories: string[] = [];
  isDropdownOpen = false;

  userForm: FormGroup;
  updateProfileForm: FormGroup;
  userId: string | null = null;
  isProfileCreated: boolean = false;
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
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  toggleSidebar1(): void {
    this.showSidebar = !this.showSidebar;
  }
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private subcategoryService: SubcategoryService
  ) {
    this.authService.getUserId().subscribe({
      next: (userId) => {
        this.userId = userId;
      },
      error: (error) => {
        console.error('Error getting user ID:', error);
      },
    });
    this.productForm = this.formBuilder.group({
      category: [''],
      subcategories: [[]],
    });
    this.userForm = this.formBuilder.group({
      username: { value: '' },
      email: { value: '' },
      // Add other form controls as needed
    });
    this.updateProfileForm = this.formBuilder.group({
      username: { value: '' },
      email: { value: '' },

      organization_name: { value: '' },
      designation: { value: '' },

      phone_number: { value: '' },
      street_address: { value: '' },
      city: { value: '' },
      postal_code: { value: '' },
      state: { value: '' },
      country: { value: '' },
      // Add other form controls as needed
    });
  }

  password: any;
  show = false;
  password1: any;
  show1 = false;

  ngOnInit() {
    this.password = "password";
    this.checkManufacturerProfile();
    this.populateUserDetails();
    //  this.populateManufacturerProfileDetails();
    this.username$ = this.authService.getCurrentUsername();
    
  }
  openDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  getSubcategoriesValue(): string {
    const subcategoriesControl = this.productForm.get('subcategories');
    return subcategoriesControl ? subcategoriesControl.value?.join(', ') || '' : '';
  }
  // selectSubcategory(subcategory: string) {
  //   if (!this.selectedSubcategories.includes(subcategory)) {
  //     this.selectedSubcategories.push(subcategory);
  //   }
  // }
  
  selectSubcategory(subcategory: string) {
    const subcategories = this.productForm.get('subcategories');
    // if (!subcategories.value.includes(subcategory)) {
      if (subcategories?.value && !subcategories.value.includes(subcategory)) {
      subcategories.setValue([...subcategories.value, subcategory]);
    }
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'EEEE, d MMMM yyyy');
    return formattedDate !== null ? formattedDate : 'Default Value';
  }
  populateManufacturerProfileDetails(): void {
    // const userId = this.authService.getUserId(); // Assuming you have a method to get the user ID

    // if (userId) {
    this.profileService.getManufacturerProfileDetails().subscribe(
      (user) => {
        console.log(`cmp ${user}`);
        this.updateProfileForm.patchValue(user); // Populate form with user details
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
    // }
  }
  onCategoryChange(): void {
    const selectedCategory = this.productForm.get('category')?.value;
 
    if (selectedCategory) {
      this.subcategoryService.getSubcategories(selectedCategory).subscribe(
        (subcategories) => {
          this.subcategories = subcategories;
        
        },
        (error) => {
          console.error('Error fetching subcategories:', error);
        }
      );
    } else {
      this.subcategories = [];
    }
  }
  populateUserDetails(): void {
    // const userId = this.authService.getUserId(); // Assuming you have a method to get the user ID

    // if (userId) {
      this.userService.getUserDetails().subscribe(
        (user) => {
          console.log(`cmp ${user}`)
          this.userForm.patchValue(user); // Populate form with user details
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    // }
  }
  onClick() {
    if (this.password === "password") {
      this.password = "text";
      this.show = true;
    } else {
      this.password = "password";
      this.show = false;
    }
  }
  onClick1() {
    if (this.password1 === "password") {
      this.password1 = "text";
      this.show1 = true;
    } else {
      this.password1 = "password";
      this.show1 = false;
    }
  }
  checkManufacturerProfile(): void {
    this.profileService.isManufacturerProfileCreated().subscribe(
      (result) => {
        this.isProfileCreated = result;
      },
      (error) => {
        console.error("Error checking manufacturer profile:", error);
      }
    );
  }
  createManufacturerProfile(
    username: string,
    organization_name: string,
    designation: string,
    email: string,
    phone_number: string,
    street_address: string,
    city: string,
    postal_code: string,
    state: string,
    country: string
  ): void {
    if (this.userId) {
      const m_profile_data = {
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
        userId: this.userId,
      };

      this.profileService.createManufacturerProfile(m_profile_data).subscribe({
        next: (response) => {
          console.log('Manufacturer profile created successfully:', response);
          // Add any additional logic here (e.g., redirect to a different page)
        },
        error: (error) => {
          console.error('Error creating manufacturer profile:', error);
          // Handle error (e.g., display an error message to the user)
        },
      });
    } else {
      console.error('User ID is null. Unable to create manufacturer profile.');
      // Handle the case where user ID is not available
    }
  }
  updateManufacturerProfile(
    username: string,
    organization_name: string,
    designation: string,
    email: string,
    phone_number: string,
    street_address: string,
    city: string,
    postal_code: string,
    state: string,
    country: string
  ): void {
    if (this.userId) {
      const m_profile_data = {
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
        userId: this.userId,
      };

      this.profileService.updateManufacturerProfile(m_profile_data).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          // Add any additional logic here (e.g., redirect to a different page)
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          // Handle error (e.g., display an error message to the user)
        },
      });
    } else {
      console.error('User ID is null. Unable to create event.');
      // Handle the case where user ID is not available
    }
  }


}
