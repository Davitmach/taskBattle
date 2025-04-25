export interface IUserInfoProps {
    img:string;
name:string;
total:number;   
index:number;
state?:number
className?:string
color:string
}
export interface IAnyUserInfo {
    img:string;
    name:string;
  date:string;
  friendship:boolean;
  tasks:{
    success:number;
    inprocess:number;
    cancel:number;
  }
}