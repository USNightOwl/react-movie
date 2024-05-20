import { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  className?: string
  title?: string
  titleClassName?: string
}

const Button = ({ title, icon, titleClassName, className, ...rest }: Props) => {
  return (
    <button className={className} {...rest}>
      <div className={titleClassName}>{title}</div>
      {icon}
    </button>
  )
}

export default Button