export  interface AdminData{
    email:string,
    password:string
}
// export enum NavItem{
//     User='UserManagement',
//     TurfAdmin='TurfAdminManagement',
//     Dashboard ="DashboardManagement"
// }
export interface UsersType{
    userName:string,
    email:string,
    phone:string,
    isBlocked:boolean,
    password:string,
    _id:string
}
export interface Sports{
    sportsName:string|null,
    sportsDimension:string[]|null
}