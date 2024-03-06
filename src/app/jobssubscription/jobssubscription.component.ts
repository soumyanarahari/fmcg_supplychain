import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';
import { DataStoreService } from '../data-store.service';
import { Router } from '@angular/router';
import { JobSubscriptionsOffers } from 'src/models/job-subscription-offers.model';
import { SubscriptionTypes } from '../enum/subscription-type.enum';
import { UserSubscriptions } from 'src/models/user-subscriptions.model';

@Component({
  selector: 'app-jobssubscription',
  templateUrl: './jobssubscription.component.html',
  styleUrls: ['./jobssubscription.component.scss']
})
export class JobssubscriptionComponent implements OnInit {
  basicJobSubscription:JobSubscriptionsOffers = {} as JobSubscriptionsOffers;
  premiumJobSubscription:JobSubscriptionsOffers = {} as JobSubscriptionsOffers;
  corporateJobSubscription:JobSubscriptionsOffers = {} as JobSubscriptionsOffers;
  userPlansSubscription:UserSubscriptions = {} as UserSubscriptions;

  constructor(
    public authService:AuthService,
    public eventService:EventService,
    public dataStoreService:DataStoreService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.getJobSubscriptionOffers();
    this.getUserCurrentSubscriptions();
  }

  getJobSubscriptionOffers(): void {
    this.eventService.getJobSubscriptionPlans().subscribe(
      (jobs) => {
        if(jobs)
        {
          jobs.forEach(
            (job) => {
              if(job.title === 'Basic Plan')
                this.basicJobSubscription = job;
              if(job.title === 'Premium Plan')
                this.premiumJobSubscription = job;
              if(job.title === 'Corporate Plan')
                this.corporateJobSubscription = job;
            }
          )
        }
      },
      (error) => {
        console.error('Error fetching job subscription offers:', error); 
      }
    );
  }

  subscribeToJob(jobOffer: JobSubscriptionsOffers): void{
    this.dataStoreService.clearAllOffers();
    this.dataStoreService.jobOfferSelected = jobOffer;
    this.dataStoreService.subscriptionSelected = SubscriptionTypes.JobOffers;
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
      this.userPlansSubscription.id > 0 && this.userPlansSubscription.job_subscription_title === planTitle
    );
  }

  manageSubscription(): void {
    this.router.navigate(['paymentgatewaydashboard']);
  }

  createCustomerPortalSession(): void {
    this.authService.createJobCustomerPortalSession().subscribe({
      next: (response) => {
        window.location.href = response;
      },
      error: (error) => {
        console.error('Error creating customer portal session:', error);
      },
    });
  }
}
