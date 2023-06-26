import {Component, Inject, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { MemberService } from "./member.service";

@Component({
  selector: 'member-edit',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})

export class MemberAddEditComponent implements OnInit {

  @Input() editable: boolean = false;

  empForm: FormGroup;

  role: string[] = [
    'back-end',
    'front-end',
    'QA',
    'Dev-ops',
    'mobile developer',
    'Business analyst',
  ];

  status: string[] = [
    'на проекте',
    'выведен',
  ];

  company_names: string[] = [
    'TSL',
    'БизнесМатика',
    'Инфосервис',
    'Интексофт',
    'Garpix',
    'ИП Даньковский',
    'ИП Майоров',
    'Гарпикс',
    'ИП Мальцев',
    'Extyl',
    'ИП Панарин',
    'ИП Молодчий Александр ',
    'ИП Кербер',
    'Redlab',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: MemberService,
    // private _compService: CompanyService,
    private _dialogRef: MatDialogRef<MemberAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    // const emp_list = _empService.getMemberList();
    // console.log("@@ emp_list", dataSource);

    // const new_id = Math.max(...emp_list.map(o => o.id))

    this.empForm = this._fb.group({

      id: 10,
      id_ext: 1100,
      fio: 'Фамилия Имя',
      firstname: 'Имя',
      email: 'name@mail.com',
      phone: '+71234567890',
      status: 'на проекте',
      date_start: new Date(),
      date_end: new Date(),
      role: 'back-end',
      company_name: 'TSL',
      grade: '1',
    });
  }


  // string[] = this._compService.getCompanyList();


  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    // const compService = this._compService.getCompanyNameList();
    // console.log(compService)
  }

  onFormSubmit() {
    if (this.empForm.valid) {

      console.log("@@ onFormSubmit" , this.empForm.value)

      if (this.data) {
        this._empService
          .updateMember(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(`Member detail updated!`, 'ok');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addMember(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Member added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
