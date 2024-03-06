import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userType: string ='';
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  constructor(private userService: UserService,) { }

  ngOnInit(): void {
    this.getUserType();
  }
  getUserType(): void{
    this.userService.getUserDetails().subscribe(
      (user) => {
       
        this.userType = user.userType;
      },
      (error) => {
        console.error('Error getting usertype', error);
      }
    );
  }
  
  getRouterLink(): any[] {
    if (this.userType === 'manufacturer') {
      return ['/manufacturer'];
    } else if (this.userType === 'brand') {
      return ['/brands']; // Adjust this based on your actual route for brands
    } else if (this.userType === 'individual') {
      return ['/individual']; // Adjust this based on your actual route for individual
    } 
    else if (this.userType === 'distributor') {
      return ['/distributor']; // Adjust this based on your actual route for individual
    }
    else if (this.userType === 'service provider') {
      return ['/service-provide']; // Adjust this based on your actual route for individual
    }else {
      return ['/default']; // Adjust this for a default route if needed
    }
  }

  getTitle(): string {
    if (this.userType === 'manufacturer') {
      return 'My Manufacturer Listing';
    } else if (this.userType === 'brand') {
      return 'My Brands Listing'; // Adjust this based on your desired title
    } else if (this.userType === 'individual') {
      return 'My Individual Listing'; // Adjust this based on your desired title
    } else if (this.userType === 'service provide') {
      return 'My Service Provide Listing'; // Adjust this based on your desired title
    } 
    else if (this.userType === 'distributor') {
      return 'My Distributor Listing'; // Adjust this based on your desired title
    } else {
      return 'Default Title'; // Adjust this for a default title if needed
    }
  }
}
