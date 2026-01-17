"use client"

import { forwardRef } from "react"
import styles from "./Select.module.scss"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.relative}>
          <select
            ref={ref}
            className={`${styles.selectField} ${error ? styles.error : ""} ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.arrow} />
        </div>

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    )
  }
)

Select.displayName = "Select"

export default Select
