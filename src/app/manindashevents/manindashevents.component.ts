import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventService } from "../event.service";
import { AuthService } from "../auth.service";
import { Observable } from "rxjs";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-manindashevents",
  templateUrl: "./manindashevents.component.html",
  styleUrls: ["./manindashevents.component.scss"],
})
export class ManindasheventsComponent implements OnInit {
  // currentEventId: string | null = null;
  currentEventId: string = "";
  updateEventForm: FormGroup;
  showSidebar: boolean = false;
  username$: Observable<any> = new Observable<any>();
  sidebarExpanded = true;
  currentEventsSubscriptionPlan: String = "";
  myEvents: any;
  @Input() event: any;
  constructor(
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    public datePipe: DatePipe,
    public http: HttpClient,
    public eventService: EventService,
    public authService: AuthService,
    public toastr:ToastrService,
    public router:Router
  ) {
    this.from();
    this.to();
    this.eventList();

    this.updateEventForm = this.formBuilder.group({
      event_name: { value: "" },
      event_date: { value: "" },
      street: { value: "" },
      city: { value: "" },
      postal_code: { value: "" },
      state: { value: "" },
      country: { value: "" },
      event_scheduled_date: { value: "" },
    });
  }

  ngOnInit(): void {
    this.subscription();
    this.username$ = this.authService.getCurrentUsername();
  }

  open(content: any, eventId: string) {
    this.currentEventId = eventId;
    this.modalService.open(content);
    this.populateEventDetails(eventId)
  }
  fromDate: any;
  toDate: any;
  from() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 10);
    console.log(yesterday);
    this.fromDate = this.datePipe.transform(yesterday, "yyyy-MM-dd");
    this.toDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    console.log(this.fromDate);
  }
  to() {
    let lastweek = new Date();
    lastweek.setDate(lastweek.getDate() - 7);
    console.log(lastweek);
    this.fromDate = this.datePipe.transform(lastweek, "yyyy-MM-dd");
    this.toDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    console.log(this.fromDate);
  }
  eventList() {
    this.eventService.getMyEvents().subscribe((events) => {
      this.myEvents = events;
    });
  }
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  toggleSidebar1(): void {
    this.showSidebar = !this.showSidebar;
  }
  view(){
this.router.navigate(['/eventssubscription'])
  }
  eventDetails = {
    event_name: "",
    event_date: "",
    street: "",
    postal_code: "",
    city: "",
    country: "",
    event_scheduled_date: "",
    state: "",
  };
  userId: string | null = null;
  onCreateEvent(): void {
    // if (this.userId) {

    let eventData = {
      event_name: this.eventDetails.event_name,
      event_date: this.eventDetails.event_date,
      street: this.eventDetails.street,
      postal_code: this.eventDetails.postal_code,
      city: this.eventDetails.city,
      country: this.eventDetails.country,
      event_scheduled_date: this.eventDetails.event_scheduled_date,
      state: this.eventDetails.state,
      // userId: this.userId
    };

    this.eventService.createEvent(eventData).subscribe({
      next: (response) => {
        this.toastr.success('Event created successfully')
        console.log("Event created successfully:", response);
        // Add any additional logic here (e.g., redirect to a different page)
      },
      error: (error) => {
        this.toastr.error('Failed to create an event')
        console.error("Error creating event:", error);
        // Handle error (e.g., display an error message to the user)
      },
    });
    
  }
  subscription() {
    this.authService.getCurrentSubscriptionPlan("events").subscribe(
      (plan) => {
        // this.currentSubscriptionPlan = plan;
        this.currentEventsSubscriptionPlan = plan;
      },
      (error) => {
        console.error("Error fetching subscription plan:", error);
        // Handle error (e.g., show error message to the user)
      }
    );
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(
      currentDate,
      "EEEE, d MMMM yyyy"
    );
    return formattedDate !== null ? formattedDate : "Default Value";
  }
  populateEventDetails(event_id:string): void {
    this.eventService.getEventDetails(event_id).subscribe(
      (event) => {
        console.log(`update event: ${event}`);
        this.updateEventForm.patchValue(event); // Populate form with event details
      },
      (error) => {
        console.error("Error fetching event details:", error);
      }
    );
    // }
  }
  updateEvent(
    currentEventId: string,
    event_name: string,
    event_date: string,
    street: string,
    postal_code: string,
    city: string,
    country: string,
    event_scheduled_date: string,
    state: string
  ): void {
    const event_data = {
      id: currentEventId,
      event_name,
      event_date,
      street,
      postal_code,
      city,
      country,
      event_scheduled_date,
      state,
    };

    this.eventService.updateEvent(event_data).subscribe({
      next: (response) => {
        console.log("Event updated successfully:", response);
        // Add any additional logic here (e.g., redirect to a different page)
      },
      error: (error) => {
        console.error("Error updating event:", error);
        // Handle error (e.g., display an error message to the user)
      },
    });
  }
}
