import {Component, OnInit} from "@angular/core";
import {CrudService} from "../crudform/crudform.service";
// import {moment} from 'moment';
import * as moment from 'moment/moment';
import {MAT_DATE_LOCALE} from "@angular/material/core";

@Component(
    {
        selector: 'basic-editing',
        templateUrl: 'basic-editing.component.html',
        styleUrls: ['basic-editing.component.css']
    }
)


export class BasicEditingComponent implements OnInit {

    constructor(private _crudService: CrudService) {

    }

    entityItems: entityItem[] = []
    columns: string[] = ['Init']
    oldItem: entityItem = {}
    types: any = {'picker': ['date_start', 'date_end']}

    before3days = new Date((new Date().getTime() - 3600 * 24 * 3 * 1000));

    ngOnInit(): void {
        // this.crudForm.patchValue(this.data);
        const compService = this.getItemList();
    }

    onEdit(item: any) {

        this.oldItem = JSON.parse(JSON.stringify(item))
        console.log('@@ onEdit', this.oldItem)
        this.entityItems.forEach(e => { // @ts-ignore
                e['isEdit'] = false
            }
        );
        item['isEdit'] = true
    }

    columnValueValidation: any = {
        contacts: {
            mask: /^[a-zA-ZА-Яа-я\s]{3,}$/,
            tip: "Не менее 3-ex букв, включая пробел",
            sample: "Москва"
        }
    }


    validateColumnValue(columnValue: any, k:any) {
        let res = false

        const valEmpty = (columnValue === '' || columnValue === null)
        const v = this.columnValueValidation
        let regCheck = false
        let tip = 'проверьте значение'

        if (k in v) {
            regCheck = !v[k].mask.test(columnValue)
            tip = v[k].tip
        }


        console.log("@@ regCheck",k,regCheck, v.mask )

        return valEmpty ? 'Required' : regCheck ?   tip : false ;
    }


    validateForm(item: any) {
        // console.log("@@ validateForme", item, item !== '', item === null)

        let res = false

        for (let k in item) {
            if (item[k] == '' || item[k] == null) res = true

            // console.log("@@ k", k, item[k], res)
            // const regCheck = k in this.columnValueValidation ?this.columnValueValidation[k].test(item[k]):3
            // console.log("@@ regCheck",regCheck)
        }

        return res
    }


    onAdd() {
        let newItem: entityItem = {}
        const firstEl = this.entityItems[0]

        for (let key in firstEl) {
            let test = {};
            newItem[key] = '1';
        }

        this.entityItems.unshift(newItem)
        this.onEdit(newItem)
    }

    onUpdate(item: any) {
        debugger;
        console.log(item)
    }

    onCancel(item: any) {
        // console.log('@@ onCancel', this.oldItem)
        let oldItem = this.oldItem
        for (let key in oldItem) {
            item[key] = oldItem[key]
        }
        item['isEdit'] = false
    }

    onDelete(item: any) {
        // console.log('@@ onDelete', item)

        this.entityItems = this.entityItems.filter(it => {
            return it['id'] !== item['id'];
        });

        item['isEdit'] = true
        item.unlink()
    }


    getItemList() {
        this._crudService.getItemList('company').subscribe({
            next: (res) => {
                res['date_start'] = (moment(res['date_start']).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"))
                this.entityItems = res;
                this.columns = Object.keys(res[0]).slice(2);
                console.log("@@.01 getItemList", res, moment(), '***', this.before3days)
            }
        })
    }


    onFormSubmit() {

        console.log("@@.03 onFormSubmit()")
    }

    //         if (this.data) {
    //             this._crudService
    //                 .updateItem(this.data.id, this.crudForm.value)
    //                 .subscribe({
    //                     next: (val: any) => {
    //                         this._coreService.openSnackBar(`Member detail updated!`, 'ok');
    //                         this._dialogRef.close(true);
    //                     },
    //                     error: (err: any) => {
    //                         console.error(err);
    //                     },
    //                 });
    //         } else {
    //             this._crudService.addItem(this.crudForm.value).subscribe({
    //                 next: (val: any) => {
    //                     this._coreService.openSnackBar('Member added successfully');
    //                     this._dialogRef.close(true);
    //                 },
    //                 error: (err: any) => {
    //                     console.error(err);
    //                 },
    //             });
    //         }
    //
    // }
}

export interface entityItem {

    // isEdit: boolean;
    [key: string]: string;

    // columns?: string;
    // data?: any[] ;
}