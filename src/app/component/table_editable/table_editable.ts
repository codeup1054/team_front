import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatTableDataSource} from "@angular/material/table";
import {CrudService} from "../crudform/crudform.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";


let columnNames:string[] = [] ;
let ELEMENT_DATA: object[] = []

ELEMENT_DATA.map(item => {
    // console.log("{@@", Object.keys(item));
    columnNames = [...new Set([...Object.keys(item) ,...columnNames ])]
} );


@Component({
    selector: 'app-root',
    templateUrl: './table_editable.html',
    styleUrls: ['./table_editable.scss']
})



export class TableEditable {
    title = 'inline-table-editor';
    displayedColumns: string[] = columnNames;
    data: object[] = ELEMENT_DATA;
    dataSource!: MatTableDataSource<any>;
    itemType: string = 'item';

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;


    getItemList() {
        this._crudService.getItemList('company').subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;

                ELEMENT_DATA = res;

                // console.log("@@ getItemList",res)

                columnNames = ['Действия', 'Удалить']
                columnNames = []

                ELEMENT_DATA = ELEMENT_DATA.map(item => {
                    // console.log("@@ 02", item);
                    let _item: {[k: string]: any} = item;
                    // _item = item

                    columnNames = [...new Set([...Object.keys(item) , ...columnNames ])]
                    _item['Действия'] = "<i class='bi bi-save'></i>"
                    return _item
                } );

                console.log("@@ getItemList ELEMENT_DATA",ELEMENT_DATA);

                this.displayedColumns = columnNames;
                // this.columnsToDisplay = columnNames;
                this.data = ELEMENT_DATA;
                this.itemType = 'company';

                this.paginator._intl.itemsPerPageLabel="Компаний на странице";
                this.paginator.pageSizeOptions=[5,9,37];

            },
            error: console.log,
        });
    }

    ngOnInit(): void
    {
        this.getItemList();
    }

    users: User[] =
        [
            {
                "id": "637dc47cf3acd827f438d013",
                "firstName": "Mccarthy",
                "lastName": "Morales",
                "email": "mccarthymorales@teraprene.com"
            },
            {
                "id": "637dc47c8c3b65109f6fafa0",
                "firstName": "Penelope",
                "lastName": "Shelton",
                "email": "penelopeshelton@teraprene.com"
            },
            {
                "id": "637dc47cf9a9db5424b19032",
                "firstName": "Charmaine",
                "lastName": "Hodges",
                "email": "charmainehodges@teraprene.com"
            },
            {
                "id": "637dc47cb300b3c61ec8031d",
                "firstName": "Tyler",
                "lastName": "Rowe",
                "email": "tylerrowe@teraprene.com"
            },
            {
                "id": "637dc47c2c1cc463ba91bf50",
                "firstName": "Hart",
                "lastName": "Mcdaniel",
                "email": "hartmcdaniel@teraprene.com"
            },
            {
                "id": "637dc47c98928fe06b21f561",
                "firstName": "Shannon",
                "lastName": "Austin",
                "email": "shannonaustin@teraprene.com"
            },
            {
                "id": "637dc47c03c7b9520c89e87c",
                "firstName": "Sybil",
                "lastName": "Quinn",
                "email": "sybilquinn@teraprene.com"
            },
            {
                "id": "637dc47c52b5c39804750dda",
                "firstName": "Morrow",
                "lastName": "Bolton",
                "email": "morrowbolton@teraprene.com"
            }
        ]

    userSelected: User = {} as User;
    itemSelected: object = {};
    isEditing: boolean = false

    form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]]
    });

    constructor(
        private _dialog: MatDialog,
        private _crudService: CrudService,
        private fb: FormBuilder,
    ) {}




    Title = "Компании"
    Price = 121312.4
    _date = new Date()
    jso = {d:1,b:3}

    selectItem(item: object) {
        if(Object.keys(this.itemSelected).length === 0) {
            this.itemSelected = item;
            this.isEditing = true

            // this.form.patchValue({
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     email: user.email
            // })
        }
    }


    selectUser(user: User) {
        if(Object.keys(this.userSelected).length === 0) {
            this.userSelected = user;
            this.isEditing = true

            this.form.patchValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            })
        }
    }

    deleteUser(index: number) {
        if(confirm('Are you sure you want to delete this user?')) {
            this.users.splice(index, 1);
        }
    }

    update() {
        if(!this.isEditing) {
            this.users[0] = {
                id: this.generateId(),
                firstName: this.form.value.firstName!,
                lastName: this.form.value.lastName!,
                email: this.form.value.email!
            }
        }
        else {
            let index = this.users.map(u => u.id).indexOf(this.userSelected.id);

            this.users[index] = {
                id: this.userSelected.id,
                firstName: this.form.value.firstName!,
                lastName: this.form.value.lastName!,
                email: this.form.value.email!
            };
        }


        // clean up
        this.userSelected = {} as User;
        this.isEditing = false
        this.form.reset();
    }

    cancel() {
        if(!this.isEditing && confirm('All unsaved changes will be removed. Are you sure you want to cancel?')) {
            this.users.splice(0, 1);
        }

        this.userSelected = {} as User;
        this.isEditing = false
        this.form.reset();
    }

    addUser() {
        this.users.unshift({
            id: '-',
            firstName: '',
            lastName: '',
            email: ''
        })

        this.userSelected = this.users[0];
    }

    isEmpty(obj: any) {
        return Object.keys(obj).length === 0;
    }

    generateId() {
        // generate random 24 string
        return (Math.random() + 1).toString(36).substring(4) + (Math.random() + 1).toString(36).substring(4)
    }
}

export interface User {
    // [index: string]: string;
    id: any;
    firstName: any;
    lastName: any;
    email: any;
    comment?: any;
    // get: (name:string) => string;
}