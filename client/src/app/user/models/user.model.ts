export interface UserData{
    userName:string,
    email:string,
    phone:string,
    password:string,
    age:string|null,
}
export interface SportsType{
    _id:string,
    sportsName:string,
    sportsDimensions:string[],
    __v:string
}
export interface Location{
    long :number,
    lat :number
}
export  interface UserProfile {
    name: string;
    email: string;
    phone: string;
    location:null| {
        address:string,
        long:string,
        lat:string
    }
    age: number ;
    _id: string;
    wallet: number;
}
export interface SignUpResponse {
    message: string;
    user: {
      userName: string;
      email: string;
      phone: string;
      // ... other properties from your User model
    };
  }
export interface VerifyOTPResponse{
    message:string,
    status:true
}
export interface LoginResponse{
    message:string,
    token:string,
}
  
export interface ProfileResponse {
    profileData: UserProfile;
}
export interface FakeApiModel{
    title:string,
    completed:string,
    getData:string
}
// { userId: 1, id: 1, title: 'delectus aut autem', completed: false }