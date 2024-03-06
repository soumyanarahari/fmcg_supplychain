import { JobSubscriptionsOffers } from './../models/job-subscription-offers.model';
import { EventSubscriptionsOffers } from './../models/event-subscriptions-offers.model';
import { Injectable } from '@angular/core';
import { SubscriptionTypes } from './enum/subscription-type.enum';
import { ManufacturerSubscriptionOffers } from 'src/models/manufacturer-subscription-offers.model';
import { AdvertisementSubscriptionsOffers } from 'src/models/advertisement-subscription-offers.model';
import { UserSubscriptions } from 'src/models/user-subscriptions.model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  subscriptionSelected:SubscriptionTypes | undefined;
  jobOfferSelected: JobSubscriptionsOffers = {} as JobSubscriptionsOffers;
  eventOfferSelected: EventSubscriptionsOffers = {} as EventSubscriptionsOffers;
  manufacturerOfferSelected: ManufacturerSubscriptionOffers = {} as ManufacturerSubscriptionOffers;
  advertisementOfferSelected: AdvertisementSubscriptionsOffers = {}  as AdvertisementSubscriptionsOffers;
  userSubscription: UserSubscriptions = {} as UserSubscriptions;
  constructor() { }

  clearAllOffers(){
    this.jobOfferSelected = {} as JobSubscriptionsOffers;
    this.eventOfferSelected = {} as EventSubscriptionsOffers;
    this.manufacturerOfferSelected = {} as ManufacturerSubscriptionOffers;
    this.advertisementOfferSelected = {} as AdvertisementSubscriptionsOffers;
    this.subscriptionSelected = undefined;
  }
}
