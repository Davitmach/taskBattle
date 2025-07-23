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
        phrase?:string,
        id:string
        taskParticipantId?:string
        requiredReadyCount?:number
        readyCount?:number
        ready?:boolean
    }
    export interface ITaskProps {
        title: string
        type: "Совместное" | 'Одиночное'
        timeout: number
        color:string
        date:string
        friends?: IFriends[]
        phrase?:string
        id:string

    }
