export interface IRadio {
    text:'Совместное'|'Одиночное';
    active:string;
    setActive:React.Dispatch<React.SetStateAction<string>>;
}