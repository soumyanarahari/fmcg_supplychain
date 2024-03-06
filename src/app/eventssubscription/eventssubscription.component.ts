import { AuthService } from './../auth.service';
import { EventService } from './../event.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../login.service";
import { EventSubscriptionsOffers } from 'src/models/event-subscriptions-offers.model';
import { DataStoreService } from '../data-store.service';
import { SubscriptionTypes } from '../enum/subscription-type.enum';
import { UserSubscriptions } from 'src/models/user-subscriptions.model';

@Component({
  selector: "app-eventssubscription",
  templateUrl: "./eventssubscription.component.html",
  styleUrls: ["./eventssubscription.component.scss"],
})
export class EventssubscriptionComponent implements OnInit {
  premiumEventOffer:EventSubscriptionsOffers = {} as EventSubscriptionsOffers;
  premiumEventWithAdsOffer:EventSubscriptionsOffers = {} as EventSubscriptionsOffers;
  userPlansSubscription:UserSubscriptions = {} as UserSubscriptions;

  constructor(
    public router: Router,
    public eventService:EventService,
    public dataStoreService: DataStoreService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getEventSubscriptionOffers();
    this.getUserSubscriptions();
  }

  getEventSubscriptionOffers(): void {
    this.eventService.getEventSubscriptionPlans().subscribe(
      (events) => {
        if(events){
          events.forEach(
            (event) => {
              if(event.title === 'Premium Plan'){
                this.premiumEventOffer = event;
              }
              if(event.title === 'Premium Plan + Ads'){
                this.premiumEventWithAdsOffer = event;
              }
            }
          )
        }
      },
      (error) => {
        console.error('Error fetching event subscription offers:', error); 
      }
    );
  }

  subscribeToPlan(plan:EventSubscriptionsOffers): void{
    this.dataStoreService.clearAllOffers();
    this.dataStoreService.eventOfferSelected = plan;
    this.dataStoreService.subscriptionSelected = SubscriptionTypes.EventOffers;
    this.router.navigate(['pgatewaycontactdetails']);
  }

  getUserSubscriptions(): void {
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
      this.userPlansSubscription.id > 0 && this.userPlansSubscription.event_subscription_title === planTitle
    );
  }

  manageSubscription(): void {
    this.router.navigate(['paymentgatewaydashboard']);
  }

  createCustomerPortalSession(): void {
    this.authService.createEventCustomerPortalSession().subscribe({
      next: (response) => {
        window.location.href = response;
      },
      error: (error) => {
        console.error('Error creating customer portal session:', error);
      },
    });
  }
}
