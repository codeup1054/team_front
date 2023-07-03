// import { registerLocaleData } from '@angular/common';
// import localeRu from '@angular/common/locales/ru';
// registerLocaleData(localeRu, 'ru');

import {LOCALE_ID, NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from "@angular/material/menu";


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MemberAddEditComponent} from './component/member/member.component';

import {MenubarComponent} from './component/menubar/menubar.component';
import {CompanyComponent} from './component/company/company.component';
import {TeamComponent} from './component/team/team.component';
import {CrudformComponent} from './component/crudform/crudform.component';
import {CutTextPipe} from './component/crudform/crudform.pipes';
import {SandboxComponent} from "./component/sandbox/sandbox.component";


@NgModule({
    declarations: [AppComponent,
        MemberAddEditComponent,
        MenubarComponent,
        CompanyComponent,
        TeamComponent,
        MemberAddEditComponent,
        CrudformComponent,
        SandboxComponent,
        CutTextPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        MatMenuModule,
    ],
  providers: [
      // { provide: LOCALE_ID, useValue: "ru" }, //replace "en-US" with your locale
      ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
