export type TaskType = 'COMPLETED' | 'IN_PROGRESS' | 'CANCELLED'
type Task = {
    title: string;
    type: string;
    timeout: number;
    date: string;
    friends?: { img: string; name: string; total: number }[];
  };
export interface ITaskHomePageInfoBlockProps {
type:TaskType,
data?: Task[];
}
export interface IInfoBlock {
    title:string,
    children:React.ReactNode,

}