import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './core/components/pages/contact/contact.component';
import { ErrorComponent } from './core/components/pages/error/error.component';
import { JobsComponent } from './core/components/pages/jobs/jobs.component';
import { PrivacyPolicyComponent } from './core/components/pages/privacy-policy/privacy-policy.component';
import { RegistrationComponent } from './features/auth/container/registration/registration.component';
import { TermsConditionsComponent } from './core/components/pages/terms-conditions/terms-conditions.component';
import { LoginComponent } from './features/auth/container/login/login.component';
import { AnnouncementComponent } from './features/announcement/container/announcement/announcement.component'
import { UserGuard } from './core/guards/UserGuard/user.guard';
import { AnnouncementsComponent } from './features/announcement/container/announcements/announcements.component';
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


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'error', component: ErrorComponent, canActivate: [UserGuard] },
    { path: 'privacy-policy', component: PrivacyPolicyComponent, canActivate: [UserGuard] },//VALIDAR
    { path: 'terms-conditions', component: TermsConditionsComponent, canActivate: [UserGuard] },//VALIDAR
    { path: 'announcement', component: AnnouncementsComponent, canActivate: [UserGuard] },
    { path: 'announcements', component: AnnouncementsComponent, canActivate: [UserGuard] },
    { path: 'create-announcement', component: AnnouncementComponent, canActivate: [UserGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [UserGuard] },//VALIDAR
    { path: 'companies', component: CompaniesComponent, canActivate: [UserGuard] },
    { path: 'companie-detail', component: CompanieDetailComponent, canActivate: [UserGuard] },
    { path: 'announcement-detail', component: AnnouncementDetailComponent, canActivate: [UserGuard] },
    { path: 'jobss', component: JobsComponent, canActivate: [UserGuard] },
    { path: 'countries', component: CountryComponent, canActivate: [UserGuard] },
    { path: 'trms', component: TrmComponent, canActivate: [UserGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [UserGuard] },
    { path: 'compensation', component: CompensationComponent, canActivate: [UserGuard] },
    { path: 'pre-approved', component: PreApprovedComponent, canActivate: [UserGuard] },
    { path: 'consolidated-announcement', component: ConsolidatedAnnouncementComponent, canActivate: [UserGuard] },
    { path: 'consolidated-compensation', component: ConsolidatedCompensationComponent, canActivate: [UserGuard] },
    { path: 'liquidation', component: LiquidationComponent, canActivate: [UserGuard] },
    { path: 'compesation-detail', component: CompensationDetailComponent, canActivate: [UserGuard] },
    { path: 'recover', component: RecoverPasswordComponent },
    { path: 'change', component: ChangePasswordComponent, canActivate: [UserGuard] },
    { path: 'pre-approved-history', component: PreApprovedHistoryComponent, canActivate: [UserGuard] },
     {path: 'liquidation-history', component: LiquidationHistoryComponent, canActivate: [UserGuard] },
    { path: '**', component: ErrorComponent } // This line will remain down from the whole component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }