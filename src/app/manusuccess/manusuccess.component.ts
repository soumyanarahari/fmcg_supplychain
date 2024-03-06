import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manusuccess',
  templateUrl: './manusuccess.component.html',
  styleUrls: ['./manusuccess.component.scss']
})
export class ManusuccessComponent implements OnInit {
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
