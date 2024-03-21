import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeTwoComponent } from './core/components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './core/components/pages/home-three/home-three.component';
import { PreloaderComponent } from './core/components/common/preloader/preloader.component';
import { NavbarStyleOneComponent } from './core/components/common/navbar-style-one/navbar-style-one.component';
import { FooterStyleOneComponent } from './core/components/common/footer-style-one/footer-style-one.component';
import { NavbarStyleTwoComponent } from './core/components/common/navbar-style-two/navbar-style-two.component';
import { NavbarStyleThreeComponent } from './core/components/common/navbar-style-three/navbar-style-three.component';
import { FooterStyleTwoComponent } from './core/components/common/footer-style-two/footer-style-two.component';
import { LoginComponent } from './features/auth/container/login/login.component';
import { RegisterComponent } from './core/components/pages/register/register.component';
import { EmployersComponent } from './core/components/pages/employers/employers.component';
import { EmployersDetailsComponent } from './core/components/pages/employers-details/employers-details.component';
import { DashboardComponent } from './core/components/pages/dashboard/dashboard.component';
import { ResumeDetailsComponent } from './core/components/pages/resume-details/resume-details.component';
import { TestimonialsComponent } from './core/components/pages/testimonials/testimonials.component';
import { PricingComponent } from './core/components/pages/pricing/pricing.component';
import { FaqComponent } from './core/components/pages/faq/faq.component';
import { ComingSoonComponent } from './core/components/pages/coming-soon/coming-soon.component';
import { ErrorComponent } from './core/components/pages/error/error.component';
import { PrivacyPolicyComponent } from './core/components/pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './core/components/pages/terms-conditions/terms-conditions.component';
import { AboutComponent } from './core/components/pages/about/about.component';
import { JobsComponent } from './core/components/pages/jobs/jobs.component';
import { FavouriteJobsComponent } from './core/components/pages/favourite-jobs/favourite-jobs.component';
import { JobDetailsComponent } from './core/components/pages/job-details/job-details.component';
import { PostAJobComponent } from './core/components/pages/post-a-job/post-a-job.component';
import { CandidatesComponent } from './core/components/pages/candidates/candidates.component';
import { CandidatesDetailsComponent } from './core/components/pages/candidates-details/candidates-details.component';
import { BlogDetailsComponent } from './core/components/pages/blog-details/blog-details.component';
import { BlogComponent } from './core/components/pages/blog/blog.component';
import { ContactComponent } from './core/components/pages/contact/contact.component';
import { HomeOneComponent } from './core/components/pages/home-one/home-one.component';
import { RegistrationComponent } from './features/auth/container/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';
import { AnnouncementComponent } from './features/announcement/container/announcement/announcement.component';
import { JwtInterceptor } from './core/interceptor/Jwt/jwt.interceptor';
import { AnnouncementsComponent } from './features/announcement/container/announcements/announcements.component';
import { JwtService } from './core/services/jwt/jwt.service';
import { CompaniesComponent } from './features/management/container/companies/companies.component';
import { CompanieDetailComponent } from './features/management/container/companie-detail/companie-detail.component';
import { AnnouncementDetailComponent } from './features/announcement/container/announcement-detail/announcement-detail.component';
import { CountryComponent } from './features/management/container/country/country.component';
import { TrmComponent } from './features/management/container/trm/trm.component';
import { ProductsComponent } from './features/management/container/products/products.component';
import { CompensationComponent } from './features/announcement/container/compensation/compensation.component';
import { PreApprovedComponent } from './features/management/container/pre-approved/pre-approved.component';
import { ConsolidatedAnnouncementComponent } from './features/management/container/consolidated-announcement/consolidated-announcement.component';
import { ConsolidatedCompensationComponent } from './features/management/container/consolidated-compensation/consolidated-compensation.component';
import { LiquidationComponent } from './features/management/container/liquidation/liquidation.component';
import { CompensationDetailComponent } from './features/announcement/container/compensation-detail/compensation-detail.component';
import { RecoverPasswordComponent } from './features/auth/container/recover-password/recover-password.component';
import { ChangePasswordComponent } from './features/auth/container/change-password/change-password.component';
import { PreApprovedHistoryComponent } from './features/management/container/pre-approved-history/pre-approved-history.component';
import { LiquidationHistoryComponent } from './features/management/container/liquidation-history/liquidation-history.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    PreloaderComponent,
    NavbarStyleOneComponent,
    FooterStyleOneComponent,
    NavbarStyleTwoComponent,
    NavbarStyleThreeComponent,
    FooterStyleTwoComponent,
    LoginComponent,
    RegisterComponent,
    EmployersComponent,
    EmployersDetailsComponent,
    DashboardComponent,
    ResumeDetailsComponent,
    TestimonialsComponent,
    PricingComponent,
    FaqComponent,
    ComingSoonComponent,
    ErrorComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    AboutComponent,
    JobsComponent,
    FavouriteJobsComponent,
    JobDetailsComponent,
    PostAJobComponent,
    CandidatesComponent,
    CandidatesDetailsComponent,
    BlogDetailsComponent,
    BlogComponent,
    ContactComponent,
    RegistrationComponent,
    AnnouncementComponent,
    AnnouncementsComponent,
    CompaniesComponent,
    CompanieDetailComponent,
    AnnouncementDetailComponent,
    CountryComponent,
    TrmComponent,
    ProductsComponent,
    CompensationComponent,
    PreApprovedComponent,
    ConsolidatedAnnouncementComponent,
    ConsolidatedCompensationComponent,
    LiquidationComponent,
    CompensationDetailComponent,
    RecoverPasswordComponent,
    ChangePasswordComponent,
    PreApprovedHistoryComponent,
    LiquidationHistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [JwtService, { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  //{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
