interface IFriends {
    img:string;
    name:string;
    total:number;
}

    export interface ITaskWithFuncProps {
        title: string
        type: "Совместное" | 'Одиночное'
        timeout: number
        date:string
        friends?: IFriends[]
        phrase?:string
    }
    export interface ITaskProps {
        title: string
        type: "Совместное" | 'Одиночное'
        timeout: number
        color:string
        date:string
        friends?: IFriends[]
        phrase?:string

    }
