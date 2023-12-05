import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ColumnType, Users, columnData } from '../../models/shared-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  _dataSource = new MatTableDataSource();
  displayedColumns!:  columnData[]
  displayColumnName:any=[];
  actions:any;
  @ViewChild('paginator') paginator!: MatPaginator;

  @Input() tableConfig!:ColumnType ;
  @Input() set dataSource(data:any){
    this.setDataSource(data);
  }
  @Input() actionType!:string;
  @Input() textColor!:string
  @Output() tableAction:EventEmitter<any>=new EventEmitter()
  @Output() tableAction2:EventEmitter<any>=new EventEmitter()


ngOnInit(): void {
  this.displayedColumns = this.tableConfig.columns
  this.displayColumnName =[...this.displayedColumns.map(col=>col.dataProperty)];
  this.actions = this.tableConfig.rowActions;
}
setDataSource(data:any){
  this._dataSource = new MatTableDataSource<any>(data);
  this._dataSource.paginator = this.paginator;

}
performAction(user:any){
  this.tableAction.emit(user);
}
rowClass(row:any):string{
  if( row &&row.color) return `${row.color}-class`
  else return `default-class`
}
performSecondAction(data:any){
  this.tableAction2.emit(data.turfID)
}
secondClass(row:any){
  if( row &&row.secondColor) return `${row.secondColor}-class`
  else return `default-class`
}
}
