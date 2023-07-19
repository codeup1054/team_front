import {Component, Inject, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { CrudService } from "./crudform.service";

@Component({
    selector: 'member-edit',
    templateUrl: './crudform.component.html',
    styleUrls: ['./crudform.component.scss']
})

export class CrudformComponent implements OnInit {

    @Input() editable: boolean = false;

    crudForm: FormGroup;

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
        private _crudService: CrudService,
        // private _compService: CompanyService,
        private _dialogRef: MatDialogRef<CrudformComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _coreService: CoreService
    ) {
        // const emp_list = _crudService.getMemberList();
        // console.log("@@ emp_list", dataSource);

        // const new_id = Math.max(...emp_list.map(o => o.id))

        this.crudForm = this._fb.group({
            id: 10,
            company_name: 'TSL',
            grade: '1',
        });
    }


    ngOnInit(): void {
        this.crudForm.patchValue(this.data);
        const compService = this._crudService.getItemList('team');
        // console.log(compService)
    }

    onFormSubmit() {
        if (this.crudForm.valid) {

            console.log("@@ onFormSubmit" , this.crudForm.value)

            if (this.data) {
                this._crudService
                    .updateItem(this.data.id, this.crudForm.value)
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
                this._crudService.addItem(this.crudForm.value).subscribe({
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
