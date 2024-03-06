import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pgatewaydashboard',
  templateUrl: './pgatewaydashboard.component.html',
  styleUrls: ['./pgatewaydashboard.component.scss']
})
export class PgatewaydashboardComponent implements OnInit {
  paymentFailed:boolean = false;
  paymentSucceed:boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        console.log(params);
        if(params['success'] === 'true')
          this.paymentSucceed = true;
        if(params['success'] === 'false')
          this.paymentFailed = true;
        const param2 = params['customerId'];
        const param3 = params['priceId'];
      }
    );
  }

}
