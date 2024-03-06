import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss']
})
export class MaindashboardComponent implements OnInit {
  username$: Observable<any> = new Observable<any>();
  sidebarExpanded = true;
  showSidebar: boolean = false;
	constructor(private modalService: NgbModal,  private datePipe: DatePipe,public authService:AuthService,public router: Router) {
    
  }
  ngOnInit(): void {
    this.username$ = this.authService.getCurrentUsername();
  }
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
  toggleSidebar1(): void {
    this.showSidebar = !this.showSidebar;
  }
  view(){
    this.router.navigate(['/jobssubscription'])
      }
  myfunction(){
    let fullId = document.getElementById("id1") as HTMLElement;
 fullId.style.display='none';
 let fullId1 = document.getElementById("id2") as HTMLElement;
    fullId1.style.display='block';
  }
  backfunction(){
    let fullId3 = document.getElementById("id2") as HTMLElement;
 fullId3.style.display='none';
 let fullId = document.getElementById("id3") as HTMLElement;
 fullId.style.display='none';
 let fullId4 = document.getElementById("id1") as HTMLElement;
    fullId4.style.display='block';
  }
  nextfunction(){
    let fullId3 = document.getElementById("id2") as HTMLElement;
 fullId3.style.display='none';
 let fullId = document.getElementById("id1") as HTMLElement;
 fullId.style.display='none';
 let fullId4 = document.getElementById("id3") as HTMLElement;
    fullId4.style.display='block';
  }
  backfunction1(){
    let fullId3 = document.getElementById("id2") as HTMLElement;
 fullId3.style.display='block';
 let fullId = document.getElementById("id1") as HTMLElement;
 fullId.style.display='none';
 let fullId4 = document.getElementById("id3") as HTMLElement;
    fullId4.style.display='none';
  }
  customques(){
    let fullId5 = document.getElementById("id5") as HTMLElement;
    fullId5.style.display='block';
    let fullId6 = document.getElementById("id4") as HTMLElement;
    fullId6.style.display='block';
  }
  open(content:any) {
		this.modalService.open(content);
	}
  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'EEEE, d MMMM yyyy');
    return formattedDate !== null ? formattedDate : 'Default Value';
  }
}
