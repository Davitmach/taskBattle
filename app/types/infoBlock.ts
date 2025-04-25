export type TaskType = 'complete' | 'inprocess' | 'cancel'
export interface ITaskHomePageInfoBlockProps {
type:TaskType,
}
export interface IInfoBlock {
    title:string,
    children:React.ReactNode,

}