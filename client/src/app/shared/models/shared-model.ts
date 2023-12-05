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
// export interface Profile{
//     name:string,
//     email:string,
//     phone:string,
//     age:number | ''
//     _id:string | null
//     location:null|{
//         long:string ,
//         lat:string,
//         address:string
//     }
// }
export type Position = [number, number];
