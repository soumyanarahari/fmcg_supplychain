import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { PlanModel } from '../../models/plan.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AdvertisementSubscriptionsOffers } from 'src/models/advertisement-subscription-offers.model';
import { DataStoreService } from '../data-store.service';
import { UserSubscriptions } from 'src/models/user-subscriptions.model';
import { SubscriptionTypes } from '../enum/subscription-type.enum';

@Component({
  selector: 'app-advtsubscription',
  templateUrl: './advtsubscription.component.html',
  styleUrls: ['./advtsubscription.component.scss']
})
export class AdvtsubscriptionComponent implements OnInit {
  basicAdvertisementSubscription:AdvertisementSubscriptionsOffers = {} as AdvertisementSubscriptionsOffers;
  premiumAdvertisementSubscription:AdvertisementSubscriptionsOffers = {} as AdvertisementSubscriptionsOffers;
  corporateAdvertisementSubscription:AdvertisementSubscriptionsOffers = {} as AdvertisementSubscriptionsOffers;
  userPlansSubscription:UserSubscriptions = {} as UserSubscriptions;

  constructor(
    public router: Router, 
    public authService: AuthService,
    public eventService: EventService,
    public dataStoreService: DataStoreService
  ) {}

  ngOnInit(): void {
    this.getUserSubscriptions();
    this.fetchSubscriptionPlans();
  }

  fetchSubscriptionPlans(): void {
    this.eventService.getAdvtSubscriptions().subscribe(
      (advertisements) => {
        if(advertisements){
          advertisements.forEach(
            (advertisement) =>{
              if(advertisement.title === 'Basic Plan')
                this.basicAdvertisementSubscription = advertisement;
              if(advertisement.title === 'Premium Plan')
                this.premiumAdvertisementSubscription = advertisement;
              if(advertisement.title === 'Corporate Plan')
                this.corporateAdvertisementSubscription = advertisement;
            }
          )
        }
      },
      (error) => {
        console.error('Error fetching subscription plans:', error);
      }
    );
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
      this.userPlansSubscription.id > 0 && this.userPlansSubscription.advertiser_subscription_title === planTitle
    );
  }

  subscribeToAdvertisement(advertisement:AdvertisementSubscriptionsOffers): void{
    this.dataStoreService.clearAllOffers();
    this.dataStoreService.advertisementOfferSelected = advertisement;
    this.dataStoreService.subscriptionSelected = SubscriptionTypes.AdvertisementOffers;
    this.router.navigate(['pgatewaycontactdetails']);
  }

  createCustomerPortalSession(): void {
    this.authService.createAdvtCustomerPortalSession().subscribe({
      next: (response) => {
        window.location.href = response;
      },
      error: (error) => {
        console.error('Error creating customer portal session:', error);
      },
    });
  }

  manageSubscription(): void {
    this.router.navigate(['paymentgatewaydashboard']);
  }
}
