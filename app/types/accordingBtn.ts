export interface IAccordingBtnProps {
    color:string,
    innerColor?:string,
    state:boolean,
    onClick: () => void
}
export interface IAccordingBtnWithoutAnimProps {
    color:string,
    innerColor?:string,
    className:string
    onClick: () => void
}