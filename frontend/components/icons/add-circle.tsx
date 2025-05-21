import React from 'react'
import { scaleSize, px } from '@/lib/utils'

interface AddCircleProps {
  size?: number;
  fill?: string;
  className?: string;
}

const AddCircle: React.FC<AddCircleProps> = ({ 
  size = 1, 
  fill = "currentColor",
  className = ""
}) => {
  const [width, height] = scaleSize(size, { width: 32, height: 33 });
  
  return (
    <svg 
      width={px(width)} 
      height={px(height)} 
      viewBox="0 0 32 33" 
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M16.0161 30.9608C8.09999 30.9608 1.68274 24.5436 1.68274 16.6275C1.68274 8.71138 8.09999 2.29413 16.0161 2.29413C23.9322 2.29413 30.3494 8.71138 30.3494 16.6275C30.3494 24.5436 23.9322 30.9608 16.0161 30.9608ZM14.6827 9.96079V15.2941H9.34941V17.9608H14.6827L14.6827 23.2941H17.3494V17.9608H22.6827V15.2941L17.3494 15.2941V9.96079H14.6827Z" 
        fill="inherit"
      />
    </svg>
  )
}

export default AddCircle
