"use client"

import { forwardRef } from "react"
import styles from "./Textarea.module.scss"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}

        <textarea
          ref={ref}
          className={`${styles.textarea} ${error ? styles.error : ""}`}
          {...props}
        />

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    )
  }
)

TextArea.displayName = "TextArea"

export default TextArea
