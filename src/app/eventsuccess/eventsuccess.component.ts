import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventsuccess',
  templateUrl: './eventsuccess.component.html',
  styleUrls: ['./eventsuccess.component.scss']
})
export class EventsuccessComponent implements OnInit {
  activeParam="";
  activeParam1="";
  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => this.activeParam = params.name);
    this.route.queryParams.subscribe(params => this.activeParam1 = params.nameu);
    console.log(this.activeParam); 
    console.log(this.activeParam1); 
  }

  ngOnInit(): void {
  }


}
