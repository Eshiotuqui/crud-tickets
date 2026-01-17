import styles from "./Button.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost"
  isLoading?: boolean
}

export default function Button({
  variant = "primary",
  className = "",
  isLoading,
  children,
  ...props
}: ButtonProps) {
  const buttonClass = [styles.button, styles[variant], isLoading ? styles.loading : "", className]
    .join(" ")
    .trim()

  return (
    <button className={buttonClass} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <span className={styles.spinner} /> : children}
    </button>
  )
}
