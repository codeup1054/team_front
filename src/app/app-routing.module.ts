import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyComponent} from './component/company/company.component';
import {TeamComponent} from './component/team/team.component';
import {HomeComponent} from "./component/home/home.component";
import {SandboxComponent} from "./component/sandbox/sandbox.component";
import {TableEditable} from "./component/table_editable/table_editable";

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'demo', component: SandboxComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'team', component: TeamComponent},
  {path: 'table_editable', component: TableEditable}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
