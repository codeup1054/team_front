import {Component, OnInit, ViewChild} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {CrudService} from "../crudform/crudform.service";
import {CoreService} from "../../core/core.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

//
// @Pipe({
//   name: 'asType',
//   pure: true,
// })
// export class AsTypePipe implements PipeTransform
// {
//   transform<T>(value: any, clss: new (...args: any[]) => T): T
//   {
//     return value as T;
//   }
// }
//
// Customer
//
// public Customer: typeof Customer = Customer; //Type variable to use in templates
// public customer: Customer; //Case sensitivity allows creating similar variables if needed.

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  date_start: string;
}
const columnTypes: object = { date_start: 'date'} ;

// const ELEMENT_DATA: PeriodicElement[] = [
let ELEMENT_DATA: object[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', date_start: '2023-07-03'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



let columnNames:string[] = [] ;

ELEMENT_DATA.map(item => {
  // console.log("{@@", Object.keys(item));
  columnNames = [...new Set([...Object.keys(item) ,...columnNames ])]
} );

console.log("{@@ columnNames", columnNames);


/**
 * @title Table dynamically changing the columns displayed
 */

@Component({
  selector: 'table-dynamic-columns-example',
  styleUrls: ['sandbox.component.scss'],
  templateUrl: 'sandbox.component.html',
})
export class SandboxComponent implements OnInit{

  displayedColumns: string[] = columnNames;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: object[] = ELEMENT_DATA;
  columnTypes: object  = columnTypes;
  itemType: string = 'item';


  /** Get Data*/

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit():void
  {
    this.paginator.pageSizeOptions=[11,30,100];
    this.paginator._intl.itemsPerPageLabel="Test String";
  }


  @ViewChild(MatSort) sort!: MatSort;

  constructor(
      private _dialog: MatDialog,
      private _crudService: CrudService,
      private _coreService: CoreService
  ) {}

/** >>> Get Data */




  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  shuffle() {
    let currentIndex = this.columnsToDisplay.length;
    let columnTypes = this.columnTypes;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }

/** 2023-07-03   Get data Table */

    getItemList() {
      this._crudService.getItemList('company').subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          ELEMENT_DATA = res;

          console.log("@@ getItemList",res)

          columnNames = []

          ELEMENT_DATA.map(item => {
            console.log("@@ 02", Object.keys(item));
            columnNames = [...new Set([...Object.keys(item) ,...columnNames ])]
          } );

          console.log("@@ getItemList",res, columnNames);

          this.displayedColumns = columnNames;

          this.columnsToDisplay = columnNames;
          this.data = ELEMENT_DATA;
          this.itemType = 'company';

          this.paginator._intl.itemsPerPageLabel="Компаний на странице";
          this.paginator.pageSizeOptions=[9,18,37];


        },
        error: console.log,
      });
    }
}

