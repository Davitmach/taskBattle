export interface ISelect {
    active:string[]
    setActive: React.Dispatch<React.SetStateAction<string[]>>
    default:string
}