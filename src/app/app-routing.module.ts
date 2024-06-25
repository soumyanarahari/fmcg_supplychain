import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { MaindashboardComponent } from "./maindashboard/maindashboard.component";
import { MaindashmanufacturerComponent } from "./maindashmanufacturer/maindashmanufacturer.component";
import { MaindashbrandComponent } from "./maindashbrand/maindashbrand.component";
import { MaindashsubscriptionComponent } from "./maindashsubscription/maindashsubscription.component";
import { ManindasheventsComponent } from "./manindashevents/manindashevents.component";
import { ManindashmessagesComponent } from "./manindashmessages/manindashmessages.component";
import { ManindashleadsComponent } from "./manindashleads/manindashleads.component";
import { ManindashadvtComponent } from "./manindashadvt/manindashadvt.component";
import { ManusuccessComponent } from "./manusuccess/manusuccess.component";
import { EventsuccessComponent } from "./eventsuccess/eventsuccess.component";
import { AdlandingComponent } from "./adlanding/adlanding.component";
import { BrandlandingComponent } from "./brandlanding/brandlanding.component";
import { BrandlistingComponent } from "./brandlisting/brandlisting.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { ContactusComponent } from "./contactus/contactus.component";
import { JoblistingComponent } from "./joblisting/joblisting.component";
import { JobpremiumplanComponent } from "./jobpremiumplan/jobpremiumplan.component";
import { ColorcosmeticsComponent } from "./colorcosmetics/colorcosmetics.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AdvtsubscriptionComponent } from "./advtsubscription/advtsubscription.component";
import { PaymentgatewayComponent } from "./paymentgateway/paymentgateway.component";
import { PgatewaydashboardComponent } from "./pgatewaydashboard/pgatewaydashboard.component";
import { PgatewaycontactdetailsComponent } from "./pgatewaycontactdetails/pgatewaycontactdetails.component";
import { MymessagesComponent } from "./mymessages/mymessages.component";
import { ManufacturersubscriptionComponent } from "./manufacturersubscription/manufacturersubscription.component";
import { EventssubscriptionComponent } from "./eventssubscription/eventssubscription.component";
import { JobssubscriptionComponent } from "./jobssubscription/jobssubscription.component";
import { SkincareComponent } from "./skincare/skincare.component";
import { TermsComponent } from "./terms/terms.component";
import { HaircareComponent } from "./haircare/haircare.component";
import { NeutraceuticalsComponent } from "./neutraceuticals/neutraceuticals.component";
import { PetcareComponent } from "./petcare/petcare.component";
import { CannabisComponent } from "./cannabis/cannabis.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ModalContentComponent } from "./modal-content/modal-content.component";
import { FoodComponent } from "./food/food.component";
import { BeveragesComponent } from "./beverages/beverages.component";
import { IngredientsComponent } from "./ingredients/ingredients.component";
import { LabtestingComponent } from "./labtesting/labtesting.component";
import { ServiceproviderComponent } from "./serviceprovider/serviceprovider.component";
import { ManufacturerlandingComponent } from "./manufacturerlanding/manufacturerlanding.component";
import { EventslandingComponent } from "./eventslanding/eventslanding.component";
import { EventdetailsComponent } from "./eventdetails/eventdetails.component";
import { JobdetailsComponent } from "./jobdetails/jobdetails.component";
import { CreateadsComponent } from "./createads/createads.component";
import { WelcomepageComponent } from "./welcomepage/welcomepage.component";
import { MaindashserviceproviderComponent } from "./maindashserviceprovider/maindashserviceprovider.component";
import { MaindashdistributorComponent } from "./maindashdistributor/maindashdistributor.component";
import { NewbrandlandingComponent } from "./newbrandlanding/newbrandlanding.component";
import { AdspricinglandingComponent } from "./adspricinglanding/adspricinglanding.component";
import { CreateadsplanaComponent } from "./createadsplana/createadsplana.component";
import { CreateadsplanbComponent } from "./createadsplanb/createadsplanb.component";
import { CreateadsplancComponent } from "./createadsplanc/createadsplanc.component";
import { CreateadsplandComponent } from "./createadspland/createadspland.component";
import { CreateadsplaneComponent } from "./createadsplane/createadsplane.component";
import { CreateadsplanfComponent } from "./createadsplanf/createadsplanf.component";
import { TermsforgraphicdesignComponent } from "./termsforgraphicdesign/termsforgraphicdesign.component";
import { AdrequestformComponent } from "./adrequestform/adrequestform.component";

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: "", component: HomepageComponent },
        { path: "blogs", component: BlogsComponent },
        { path: "maindash", component: MaindashboardComponent },
        { path: "manufacturer", component: MaindashmanufacturerComponent },
        { path: "brands", component: MaindashbrandComponent },
        // {path: 'individual', component: MaindashindividualComponent},
        { path: "distributor", component: MaindashdistributorComponent },
        {
          path: "service-provider",
          component: MaindashserviceproviderComponent,
        },

        { path: "subscriptions", component: MaindashsubscriptionComponent },
        { path: "events", component: ManindasheventsComponent },
        { path: "messages", component: ManindashmessagesComponent },
        { path: "leads", component: ManindashleadsComponent },
        { path: "advt", component: ManindashadvtComponent },
        { path: "manufacturersuccess", component: ManusuccessComponent },
        { path: "eventsuccess", component: EventsuccessComponent },
        { path: "adlanding", component: AdlandingComponent },
        // {path: 'brandlanding', component: BrandlandingComponent},
        { path: "brandlisting", component: BrandlistingComponent },
        { path: "aboutus", component: AboutusComponent },
        { path: "contactus", component: ContactusComponent },
        { path: "joblisting", component: JoblistingComponent },
        { path: "jobp/:id", component: JobpremiumplanComponent },
        { path: "colorcosmetics", component: ColorcosmeticsComponent },
        { path: "login", component: LoginComponent },
        { path: "signup", component: SignupComponent },
        { path: "skincare", component: SkincareComponent },
        { path: "petcare", component: PetcareComponent },
        { path: "cannabis", component: CannabisComponent },
        { path: "neutraceuticals", component: NeutraceuticalsComponent },
        { path: "haircare", component: HaircareComponent },
        { path: "terms", component: TermsComponent },
        { path: "food", component: FoodComponent },
        { path: "beverages", component: BeveragesComponent },
        { path: "ingredients", component: IngredientsComponent },
        { path: "labtesting", component: LabtestingComponent },
        { path: "serviceprovider", component: ServiceproviderComponent },
        { path: "forgot-password", component: ForgotPasswordComponent },
        { path: "reset-password", component: ResetPasswordComponent },
        { path: "mymessages", component: MymessagesComponent },
        { path: "advtsubscription", component: AdvtsubscriptionComponent },
        { path: "eventssubscription", component: EventssubscriptionComponent },
        { path: "jobssubscription", component: JobssubscriptionComponent },
        {
          path: "manufacturersubscription",
          component: ManufacturersubscriptionComponent,
        },
        { path: "paymentgateway", component: PaymentgatewayComponent },
        {
          path: "paymentgatewaydashboard",
          component: PgatewaydashboardComponent,
        },
        {
          path: "pgatewaycontactdetails",
          component: PgatewaycontactdetailsComponent,
        },
        { path: "eventslanding", component: EventslandingComponent },
        { path: "createads", component: CreateadsComponent },
        { path: "welcomepage", component: WelcomepageComponent },
        {
          path: "manufacturer-landing/:id",
          component: ManufacturerlandingComponent,
        },
        { path: "brand-landing/:id", component: BrandlandingComponent },
        {
          path: "company-landing/:id",
          component: NewbrandlandingComponent,
        },
        { path: "eventdetails", component: EventdetailsComponent },
        { path: "adspricinglanding", component: AdspricinglandingComponent },
        { path: "createadsplana", component: CreateadsplanaComponent },
        { path: "createadsplanb", component: CreateadsplanbComponent },
        { path: "createadsplanc", component: CreateadsplancComponent },
        { path: "createadspland", component: CreateadsplandComponent },
        { path: "createadsplane", component: CreateadsplaneComponent },
        { path: "createadsplanf", component: CreateadsplanfComponent },
        { path: "termsforgraphicdesign", component: TermsforgraphicdesignComponent },
        { path: "adrequestform", component: AdrequestformComponent },
        { path: "jobdetails/:id", component: JobdetailsComponent },
      ],
      { onSameUrlNavigation: "reload" }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
