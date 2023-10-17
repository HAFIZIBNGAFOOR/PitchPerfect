export interface ColumnType{
    columns:columnData[],
    rowActions:RowActions[],
    rowsPerPage:string
}
export interface RowActions{
    label:string, 
    dataProperty:string,
    actionIdtoReturn:string
}
export  interface columnData{
    title:string,
    dataProperty:string,
    sortable:boolean,
    filterable:boolean
}
export interface Users{
    userName:string,
    email:string,
    phone:string,
    _id:string,
    isBlocked:boolean
}