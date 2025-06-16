export interface IUserInfoProps {
  id?:string
  friendId?:string
    img:string;
name:string;
total:number;   
index:number;
state?:number
className?:string
color:string;
friend?:boolean
friendSelect?:string[];
setFriendSelect?: React.Dispatch<React.SetStateAction<string[]>>;
delete?:boolean|'cancel'|'cancel/accept'


isSelectFriend?:boolean
}
export interface IAnyUserInfo {
    img:string;
    
  userId:string
    name:string;
  date:string;
  friendship:boolean |{
    status:'pending'|'accepted',
    side?:'outgoing'|'incoming',
    id:string,
    
  };
  tasks:{
    success:number;
    inprocess:number;
    cancel:number;
  }
}
export interface IMyUserInfo {
    img:string;
    name:string;
  date:string;
  tasks:{
    success:number;
    inprocess:number;
    cancel:number;
  }
}