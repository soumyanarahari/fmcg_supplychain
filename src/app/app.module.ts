import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogsComponent } from './blogs/blogs.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { MaindashbrandComponent } from './maindashbrand/maindashbrand.component';
import { MaindashmanufacturerComponent } from './maindashmanufacturer/maindashmanufacturer.component';
import { MaindashsubscriptionComponent } from './maindashsubscription/maindashsubscription.component';
import { ManindasheventsComponent } from './manindashevents/manindashevents.component';
import { ManindashmessagesComponent } from './manindashmessages/manindashmessages.component';
import { ManindashleadsComponent } from './manindashleads/manindashleads.component';
import { ManindashadvtComponent } from './manindashadvt/manindashadvt.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ManusuccessComponent } from './manusuccess/manusuccess.component';
import { EventsuccessComponent } from './eventsuccess/eventsuccess.component';
import { AdlandingComponent } from './adlanding/adlanding.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ToastrModule } from 'ngx-toastr';
import { SkincareComponent } from './skincare/skincare.component';
import { TermsComponent } from './terms/terms.component';
import { HaircareComponent } from './haircare/haircare.component';
import { NeutraceuticalsComponent } from './neutraceuticals/neutraceuticals.component';
import { PetcareComponent } from './petcare/petcare.component';
import { CannabisComponent } from './cannabis/cannabis.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { FoodComponent } from './food/food.component';
import { BeveragesComponent } from './beverages/beverages.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { LabtestingComponent } from './labtesting/labtesting.component';
import { ServiceproviderComponent } from './serviceprovider/serviceprovider.component';
import { ManufacturerlandingComponent } from './manufacturerlanding/manufacturerlanding.component';
import { EventslandingComponent } from './eventslanding/eventslanding.component';
import { EventdetailsComponent } from './eventdetails/eventdetails.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { CreateadsComponent } from './createads/createads.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { MaindashserviceproviderComponent } from './maindashserviceprovider/maindashserviceprovider.component';
import { MaindashdistributorComponent } from './maindashdistributor/maindashdistributor.component';
import { NewbrandlandingComponent } from './newbrandlanding/newbrandlanding.component';
import { AdspricinglandingComponent } from './adspricinglanding/adspricinglanding.component';
import { CreateadsplanaComponent } from './createadsplana/createadsplana.component';
import { CreateadsplanbComponent } from './createadsplanb/createadsplanb.component';
import { CreateadsplancComponent } from './createadsplanc/createadsplanc.component';
import { CreateadsplandComponent } from './createadspland/createadspland.component';
import { CreateadsplaneComponent } from './createadsplane/createadsplane.component';
import { CreateadsplanfComponent } from './createadsplanf/createadsplanf.component';
import { TermsforgraphicdesignComponent } from './termsforgraphicdesign/termsforgraphicdesign.component';
import { AdrequestformComponent } from './adrequestform/adrequestform.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BlogsComponent,
    MaindashboardComponent,
    SidebarComponent,
    MaindashmanufacturerComponent,
    MaindashbrandComponent,
    MaindashdistributorComponent,
    NewbrandlandingComponent,
    MaindashserviceproviderComponent,
    MaindashsubscriptionComponent,
    ManindasheventsComponent,
    ManindashmessagesComponent,
    ManindashleadsComponent,
    ManindashadvtComponent,
    ManusuccessComponent,
    EventsuccessComponent,
    AdlandingComponent,
    BrandlandingComponent,
    BrandlistingComponent,
    AboutusComponent,
    ContactusComponent,
    JoblistingComponent,
    JobpremiumplanComponent,
    ColorcosmeticsComponent,
    LoginComponent,
    SignupComponent,
    AdvtsubscriptionComponent,
    PaymentgatewayComponent,
    PgatewaydashboardComponent,
    PgatewaycontactdetailsComponent,
    MymessagesComponent,
    ManufacturersubscriptionComponent,
    EventssubscriptionComponent,
    JobssubscriptionComponent,
    SkincareComponent,
    TermsComponent,
    HaircareComponent,
    NeutraceuticalsComponent,
    PetcareComponent,
    CannabisComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ModalContentComponent,
    FoodComponent,
    BeveragesComponent,
    IngredientsComponent,
    LabtestingComponent,
    ServiceproviderComponent,
    ManufacturerlandingComponent,
    EventslandingComponent,
    EventdetailsComponent,
    JobdetailsComponent,
    CreateadsComponent,
    WelcomepageComponent,
    AdspricinglandingComponent,
    CreateadsplanaComponent,
    CreateadsplanbComponent,
    CreateadsplancComponent,
    CreateadsplandComponent,
    CreateadsplaneComponent,
    CreateadsplanfComponent,
    TermsforgraphicdesignComponent,
    AdrequestformComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgbTooltipModule
    // CaroyuselModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
