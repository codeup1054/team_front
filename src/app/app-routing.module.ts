import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyComponent} from './component/company/company.component';
import {TeamComponent} from './component/team/team.component';
import {HomeComponent} from "./component/home/home.component";
import {SandboxComponent} from "./component/sandbox/sandbox.component";
import {TableEditable} from "./component/table_editable/table_editable";
import {InlineEditingtwoComponent} from "./component/inline-editingtwo/inline-editingtwo.component";
import {BasicEditingComponent} from "./component/basic-editing/basic-editing.component";

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'demo', component: SandboxComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'team', component: TeamComponent},
  {path: 'table_editable', component: TableEditable},
  {path: 'editable_two', component: InlineEditingtwoComponent},
  {path: 'editable_3', component: BasicEditingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
