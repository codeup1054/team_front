import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyComponent} from './component/company/company.component';
import {TeamComponent} from './component/team/team.component';
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'team', component: TeamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
