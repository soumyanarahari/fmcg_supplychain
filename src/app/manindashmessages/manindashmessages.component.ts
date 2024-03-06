import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manindashmessages',
  templateUrl: './manindashmessages.component.html',
  styleUrls: ['./manindashmessages.component.scss']
})
export class ManindashmessagesComponent implements OnInit {
  username$: Observable<any> = new Observable<any>();
  sidebarExpanded = true;
  showSidebar: boolean = false;
  constructor( private datePipe: DatePipe,public authService:AuthService,) { }

  ngOnInit(): void {
    this.username$ = this.authService.getCurrentUsername();
  }
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  toggleSidebar1(): void {
    this.showSidebar = !this.showSidebar;
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'EEEE, d MMMM yyyy');
    return formattedDate !== null ? formattedDate : 'Default Value';
  }
}
