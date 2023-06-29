import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CrudformComponent} from "../crudform/crudform.component";
import {CrudService} from "../crudform/crudform.service";
import {CoreService} from "../../core/core.service";
import {MemberAddEditComponent} from "../member/member.component";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {

  displayedColumns: string[] =
  [
  'id',
  'name',
  'manager',
  'contacts',
  'date_start',
  'date_end'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
      private _dialog: MatDialog,
      private _crudService: CrudService,
      private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getItemList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getItemList() {
    this._crudService.getItemList().subscribe({
      next: (res) => {
        console.log("@@ getItemList",res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CrudformComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getItemList();
        }
      },
    });
  }

  addForm() {
    const dialogRef = this._dialog.open(CrudformComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getItemList();
        }
      },
    });
  }
}
