import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';
import { ManufacturerSubscriptionOffers } from 'src/models/manufacturer-subscription-offers.model';
import { DataStoreService } from '../data-store.service';
import { Router } from '@angular/router';
import { SubscriptionTypes } from '../enum/subscription-type.enum';
import { UserSubscriptions } from 'src/models/user-subscriptions.model';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-manufacturersubscription',
  templateUrl: './manufacturersubscription.component.html',
  styleUrls: ['./manufacturersubscription.component.scss']
})
export class ManufacturersubscriptionComponent implements OnInit {
  username$: Observable<any> = new Observable<any>();
  basicMonthlyPlan:ManufacturerSubscriptionOffers = {} as ManufacturerSubscriptionOffers;
  premiumMonthlyPlan:ManufacturerSubscriptionOffers = {} as ManufacturerSubscriptionOffers;
  corporateMonthlyPlan:ManufacturerSubscriptionOffers = {} as ManufacturerSubscriptionOffers;
  basicYearlyPlan:ManufacturerSubscriptionOffers = {} as ManufacturerSubscriptionOffers;
  premiumYearlyPlan:ManufacturerSubscriptionOffers = {} as ManufacturerSubscriptionOffers;
  corporateYearlyPlan:ManufacturerSubscriptionOffers = {} as ManufacturerSubscriptionOffers;
  userPlansSubscription:UserSubscriptions = {} as UserSubscriptions;
  isToggleOn: boolean = false;

  constructor(
    public authService:AuthService,
    public eventService:EventService,
    public dataStoreService:DataStoreService,
    public router:Router,
    private datePipe: DatePipe,
    ) { }

  ngOnInit(): void {
    this.getUserCurrentSubscriptions();
    this.getManufacturerSubscriptionOffers();
    this.username$ = this.authService.getCurrentUsername();
  }

  getManufacturerSubscriptionOffers(): void {
    this.eventService.getManufacturerSubscriptionPlans().subscribe(
      (offers) => {
        if(offers)
        {
          offers.forEach((offer) => {
            if(offer.isYearly){
              if(offer.title === 'Basic Yearly Plan'){
                this.basicYearlyPlan = offer;
              }
              if(offer.title === 'Premium Yearly Plan'){
                this.premiumYearlyPlan = offer;
              }
              if(offer.title === 'Corporate Yearly Plan'){
                this.corporateYearlyPlan = offer;
              }
            }
            else{
              if(offer.title === 'Basic Monthly Plan'){
                this.basicMonthlyPlan = offer;
              }
              if(offer.title === 'Premium Monthly Plan'){
                this.premiumMonthlyPlan = offer;
              }
              if(offer.title === 'Corporate Monthly Plan'){
                this.corporateMonthlyPlan = offer;
              }
            }
          })
        }
      },
      (error) => {
        console.error('Error fetching manufacturer subscription offers:', error); 
      }
    );
  }
  
  toggleCardContent() {
    this.isToggleOn = !this.isToggleOn;
  }
  
  subscribeToPlan(offer:ManufacturerSubscriptionOffers): void{
    this.dataStoreService.clearAllOffers();
    this.dataStoreService.manufacturerOfferSelected = offer;
    this.dataStoreService.subscriptionSelected = SubscriptionTypes.ManufacturerOffers;
    this.router.navigate(['pgatewaycontactdetails']);
  }

  getUserCurrentSubscriptions(): void {
    this.authService.getUserSubscriptions().subscribe(
      (subscriptions) => {
        if(subscriptions.id)
        {
          this.dataStoreService.userSubscription = subscriptions;
          this.userPlansSubscription = subscriptions;
        }
      },
      (error) => {
        console.error('Error fetching user subscriptions:', error);
      }
    );
  }

  isSubscribed(planTitle: string): boolean {
    return (
      this.userPlansSubscription.id > 0 && this.userPlansSubscription.manufacturer_subscription_title === planTitle
    );
  }

  manageSubscription(): void {
    this.router.navigate(['paymentgatewaydashboard']);
  }

  createCustomerPortalSession(): void {
    this.authService.createManufacturerCustomerPortalSession().subscribe({
      next: (response) => {
        window.location.href = response;
      },
      error: (error) => {
        console.error('Error creating customer portal session:', error);
      },
    });
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'EEEE, d MMMM yyyy');
    return formattedDate !== null ? formattedDate : 'Default Value';
  }
}
