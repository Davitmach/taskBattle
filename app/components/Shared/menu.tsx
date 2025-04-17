import { PageConfig } from "@/app/config/pageConfig"
export const Menu = () => {
    
    return(
        <div className="">
{Object.keys(PageConfig).map((key)=> (
    <div key={key}>{key}</div>
))}

        </div>
    )
}