import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`glass rounded-2xl p-6 backdrop-blur-glass shadow-glass ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)

Card.displayName = 'Card'

export default Card
