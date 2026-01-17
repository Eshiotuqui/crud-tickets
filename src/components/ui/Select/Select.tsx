import styles from "@/styles/SelectInput.module.scss"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export default function Select({ label, options, ...props }: SelectProps) {
  return (
    <div className={styles.selectWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.relative}>
        <select className={styles.select} {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow} />
      </div>
    </div>
  )
}
