import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-manindashadvt',
  templateUrl: './manindashadvt.component.html',
  styleUrls: ['./manindashadvt.component.scss']
})
export class ManindashadvtComponent implements OnInit {
  username$: Observable<any> = new Observable<any>();
  sidebarExpanded = true;
  showSidebar: boolean = false;
  constructor(public modalService:NgbModal,public datePipe:DatePipe,public authService:AuthService,) {
    this.from();
   }
   toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  toggleSidebar1(): void {
    this.showSidebar = !this.showSidebar;
  }
  ngOnInit(): void {
    this.username$ = this.authService.getCurrentUsername();
  }
  open(content:any) {
		this.modalService.open(content);
	}
  fromDate:any;
  toDate:any;
  from(){        
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate());
    console.log(yesterday);
    this.fromDate = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
    this.toDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.fromDate); 
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'EEEE, d MMMM yyyy');
    return formattedDate !== null ? formattedDate : 'Default Value';
  }
}
