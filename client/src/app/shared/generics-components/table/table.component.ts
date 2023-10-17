import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnType, Users, columnData } from '../../interface/interface';
import { MatTableDataSource } from '@angular/material/table';

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
  @Input() tableConfig!:ColumnType ;
  @Input() set dataSource(data:any){
    this.setDataSource(data);
  }
  @Input() actionType!:string;
  @Output() tableAction:EventEmitter<any>=new EventEmitter()


ngOnInit(): void {
  this.displayedColumns = this.tableConfig.columns
  this.displayColumnName =[...this.displayedColumns.map(col=>col.dataProperty),'actions'];
  this.actions = this.tableConfig.rowActions;
  console.log(this.actions,this.tableConfig.rowActions,this.displayColumnName);
  
}
setDataSource(data:any){
  this._dataSource = new MatTableDataSource<any>(data);
}
performAction(user:any){
  this.tableAction.emit(user);
}

}
