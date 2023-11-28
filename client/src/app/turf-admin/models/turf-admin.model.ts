export interface TurfAdmin{
    turfAdminName:string,
    email:string,
    phone:string,
    password:string | null,
    isVerified:boolean|null,
    _id:string;
}

export interface TurfAdminState  {
   turfadmin:TurfAdmin | null,
   isLoggedIn:boolean,
   error:string,
   success:string
}
export interface TurfData{
    turfName:string,
    turfLocation:string,
    turfPrice:string,
    turfFacilities:string | null,
    turfImages:string[]|[],
    turfContact:string | null,
    sportsDimension:string | null,
    sportsType:string | null
    _id:string|null
}