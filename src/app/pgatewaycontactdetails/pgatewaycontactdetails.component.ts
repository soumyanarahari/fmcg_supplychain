import { SubscriptionTypes } from './../enum/subscription-type.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStoreService } from '../data-store.service';
import { EventService } from '../event.service';
import { CheckOutSessionModel } from 'src/models/checkout-session.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-pgatewaycontactdetails',
  templateUrl: './pgatewaycontactdetails.component.html',
  styleUrls: ['./pgatewaycontactdetails.component.scss']
})
export class PgatewaycontactdetailsComponent implements OnInit {
  checkOutSession:CheckOutSessionModel = {} as CheckOutSessionModel;
  contactForm = new FormGroup({
    city: new FormControl(""),
    state: new FormControl(""),
    taxId: new FormControl(""),
    country: new FormControl(""),
    zipCode: new FormControl(""),
    billToContactAddress: new FormControl(false),
    address : new FormControl("", [Validators.required,Validators.minLength(5)]),
    lastName : new FormControl("", [Validators.required,Validators.minLength(2)]),
    firstName : new FormControl("", [Validators.required, Validators.minLength(2)])
  });
  
  constructor(
    public eventService:EventService,
    public dataStoreService:DataStoreService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
  }

  onSubmitContactDetails():void{
    this.checkOutSession.city = this.contactForm.value.city;
    this.checkOutSession.taxId = this.contactForm.value.taxId;
    this.checkOutSession.state = this.contactForm.value.state;
    this.checkOutSession.last = this.contactForm.value.lastName;
    this.checkOutSession.country = this.contactForm.value.country;
    this.checkOutSession.first = this.contactForm.value.firstName;
    this.checkOutSession.zipCode = this.contactForm.value.zipCode;
    this.checkOutSession.streetAddress = this.contactForm.value.address;
    this.checkOutSession.billToContactAddress = this.contactForm.value.billToContactAddress;
    if(this.dataStoreService.subscriptionSelected === SubscriptionTypes.EventOffers){
      this.checkOutSession.priceId = this.dataStoreService.eventOfferSelected.price_id;
      this.createEventsCheckoutSession();
    }
    else if(this.dataStoreService.subscriptionSelected === SubscriptionTypes.JobOffers)
    {
      this.checkOutSession.priceId = this.dataStoreService.jobOfferSelected.price_id;
      this.createJobsCheckoutSession();

    }
    else if(this.dataStoreService.subscriptionSelected === SubscriptionTypes.AdvertisementOffers){
      this.checkOutSession.priceId = this.dataStoreService.advertisementOfferSelected.price_id;
      this.createAdvertisersCheckoutSession();
    }
    else if(this.dataStoreService.subscriptionSelected === SubscriptionTypes.ManufacturerOffers)
    {
      this.checkOutSession.priceId = this.dataStoreService.manufacturerOfferSelected.price_id;
      this.createManufacturersCheckoutSession();
    }
  } 

  createEventsCheckoutSession(): void {
    this.eventService.eventCheckoutSession(this.checkOutSession).subscribe(
      {
        next: (session) => {
          if(session)
            window.location.href = session;
        },
        error: (error) => {
          console.error('Error while routing to stripe due to', error);
        }
      });
  }


  createJobsCheckoutSession(): void {
    this.eventService.jobCheckoutSession(this.checkOutSession).subscribe(
      (session) => {
        if(session)
          window.location.href = session;
      },
      (error) => {
        console.error('Error while routing to stripe due to', error);
      }
    );
  }

  createAdvertisersCheckoutSession(): void{
    this.eventService.advertisementCheckoutSession(this.checkOutSession).subscribe(
      (session) => {
        if(session)
          window.location.href = session;
      },
      (error) => {
        console.error('Error while routing to stripe due to', error);
      }
    );
  }

  createManufacturersCheckoutSession(): void{
    this.eventService.manufacturerCheckoutSession(this.checkOutSession).subscribe(
      (session) => {
        if(session)
          window.location.href = session;
      },
      (error) => {
        console.error('Error while routing to stripe due to', error);
      }
    );
  }
}
