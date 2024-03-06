import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-maindashsubscription',
  templateUrl: './maindashsubscription.component.html',
  styleUrls: ['./maindashsubscription.component.scss']
})
export class MaindashsubscriptionComponent implements OnInit {
  username$: Observable<any> = new Observable<any>();
  showSidebar: boolean = false;
  sidebarExpanded = true;
  currentManufacturerSubscriptionPlan:string ='';
  currentEventsSubscriptionPlan:string ='';
  currentJobsSubscriptionPlan:string ='';
  currentAdvtSubscriptionPlan:string ='';
  constructor(public authService:AuthService, public router:Router, private datePipe: DatePipe,) { }

  ngOnInit(): void {
    this.manu_sub();
    this.events_sub();
    this.jobs_sub();
    this.advt_sub();
    this.username$ = this.authService.getCurrentUsername();
  }
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  toggleSidebar1(): void {
    this.showSidebar = !this.showSidebar;
  }
  manuchangeplan(){
    this.router.navigate(['/manufacturersubscription'])
  }
  eventschangeplan(){
    this.router.navigate(['/eventssubscription'])
  }
  jobschangeplan(){
    this.router.navigate(['/jobssubscription'])
  }
  advtchangeplan(){
    this.router.navigate(['/advtsubscription'])
  }
manu_sub(){
  this.authService.getCurrentSubscriptionPlan("manufacturer").subscribe(
    (plan) => {
      // this.currentSubscriptionPlan = plan;
      this.currentManufacturerSubscriptionPlan = plan;
    },
    (error) => {
      console.error('Error fetching subscription plan:', error);
      // Handle error (e.g., show error message to the user)
    }
  );
}
events_sub(){
  this.authService.getCurrentSubscriptionPlan("events").subscribe(
    (plan) => {
      // this.currentSubscriptionPlan = plan;
      this.currentEventsSubscriptionPlan = plan;
    },
    (error) => {
      console.error('Error fetching subscription plan:', error);
      // Handle error (e.g., show error message to the user)
    }
  );
}
jobs_sub(){
  this.authService.getCurrentSubscriptionPlan("jobs").subscribe(
    (plan) => {
      // this.currentSubscriptionPlan = plan;
      this.currentJobsSubscriptionPlan = plan;
    },
    (error) => {
      console.error('Error fetching subscription plan:', error);
      // Handle error (e.g., show error message to the user)
    }
  );
}
advt_sub(){
  this.authService.getCurrentSubscriptionPlan("advertising").subscribe(
    (plan) => {
      // this.currentSubscriptionPlan = plan;
      this.currentAdvtSubscriptionPlan = plan;
      console.log(this.currentAdvtSubscriptionPlan)
    },
    (error) => {
      console.error('Error fetching subscription plan:', error);
      // Handle error (e.g., show error message to the user)
    }
  );
}
advt_changeplan(){
  this.router.navigate(['/advtsubscription']);
}
getCurrentDate(): string {
  const currentDate = new Date();
  const formattedDate = this.datePipe.transform(currentDate, 'EEEE, d MMMM yyyy');
  return formattedDate !== null ? formattedDate : 'Default Value';
}
}
