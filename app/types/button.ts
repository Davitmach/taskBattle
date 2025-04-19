export type ButtonType = 'Purple' | 'Green'
export interface IButtonProps  {
    children: React.ReactNode
    type: ButtonType
    className?: string
    onClick?: () => void
    disabled?: boolean
    loading?: boolean

}