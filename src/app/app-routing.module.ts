import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogsComponent } from './blogs/blogs.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { MaindashmanufacturerComponent } from './maindashmanufacturer/maindashmanufacturer.component';
import { MaindashsubscriptionComponent } from './maindashsubscription/maindashsubscription.component';
import { ManindasheventsComponent } from './manindashevents/manindashevents.component';
import { ManindashmessagesComponent } from './manindashmessages/manindashmessages.component';
import { ManindashleadsComponent } from './manindashleads/manindashleads.component';
import { ManindashadvtComponent } from './manindashadvt/manindashadvt.component';
import { ManusuccessComponent } from './manusuccess/manusuccess.component';
import { EventsuccessComponent } from './eventsuccess/eventsuccess.component';
import { AdlandingComponent } from './adlanding/adlanding.component';
import { BrandlandingComponent } from './brandlanding/brandlanding.component';
import { BrandlistingComponent } from './brandlisting/brandlisting.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { JoblistingComponent } from './joblisting/joblisting.component';
import { JobpremiumplanComponent } from './jobpremiumplan/jobpremiumplan.component';
import { ColorcosmeticsComponent } from './colorcosmetics/colorcosmetics.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdvtsubscriptionComponent } from './advtsubscription/advtsubscription.component';
import { PaymentgatewayComponent } from './paymentgateway/paymentgateway.component';
import { PgatewaydashboardComponent } from './pgatewaydashboard/pgatewaydashboard.component';
import { PgatewaycontactdetailsComponent } from './pgatewaycontactdetails/pgatewaycontactdetails.component';
import { MymessagesComponent } from './mymessages/mymessages.component';
import { ManufacturersubscriptionComponent } from './manufacturersubscription/manufacturersubscription.component';
import { EventssubscriptionComponent } from './eventssubscription/eventssubscription.component';
import { JobssubscriptionComponent } from './jobssubscription/jobssubscription.component';
import { SkincareComponent } from './skincare/skincare.component';
import { TermsComponent } from './terms/terms.component';
import { HaircareComponent } from './haircare/haircare.component';

const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forRoot([
    {path: '', component: HomepageComponent},
    {path: 'blogs', component: BlogsComponent},
    {path: 'maindash', component: MaindashboardComponent},
    {path: 'manufacturer', component: MaindashmanufacturerComponent},
    {path: 'subscriptions', component: MaindashsubscriptionComponent},
    {path: 'events', component: ManindasheventsComponent},
    {path: 'messages', component: ManindashmessagesComponent},
    {path: 'leads', component: ManindashleadsComponent},
    {path: 'advt', component: ManindashadvtComponent},
    {path: 'manufacturersuccess', component: ManusuccessComponent},
    {path: 'eventsuccess', component: EventsuccessComponent},
    {path: 'adlanding', component: AdlandingComponent},
    {path: 'brandlanding', component: BrandlandingComponent},
    {path: 'brandlisting', component: BrandlistingComponent},
    {path: 'aboutus', component: AboutusComponent},
    {path: 'contactus', component: ContactusComponent},
    {path: 'joblisting', component: JoblistingComponent},
    {path: 'jobp', component: JobpremiumplanComponent},
    {path: 'colorcosmetics', component: ColorcosmeticsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'skincare', component: SkincareComponent},
    {path: 'haircare', component: HaircareComponent},
    {path: 'terms', component: TermsComponent},
    {path: 'mymessages', component: MymessagesComponent},
    {path: 'advtsubscription', component: AdvtsubscriptionComponent},
    {path: 'eventssubscription', component: EventssubscriptionComponent},
    {path: 'jobssubscription', component: JobssubscriptionComponent},
    {path: 'manufacturersubscription', component: ManufacturersubscriptionComponent},
    {path: 'paymentgateway', component: PaymentgatewayComponent},
    {path: 'paymentgatewaydashboard', component:PgatewaydashboardComponent },
    {path: 'pgatewaycontactdetails', component:PgatewaycontactdetailsComponent },
  ],{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
