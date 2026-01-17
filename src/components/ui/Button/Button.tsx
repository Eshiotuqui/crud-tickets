import styles from "./Button.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost"
}

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const buttonClass = [styles.button, styles[variant], className].join(" ").trim()

  return <button className={buttonClass} {...props} />
}
