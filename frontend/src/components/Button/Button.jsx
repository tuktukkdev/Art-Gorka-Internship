import './Button.css'

export function Button({ variant = 'primary', as: Tag = 'button', children, className = '', ...props }) {
  return (
    <Tag className={`button button--${variant} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
