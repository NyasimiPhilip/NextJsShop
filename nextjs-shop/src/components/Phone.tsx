/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  dark?: boolean
}
{/*eslint-disable-next-line @next/next/no-img-element*/}
const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden',
        className
      )}
      {...props}>
      <img
        src={
          dark
            ? '/phone-template-dark-edges.png'
            : '/phone-template-white-edges.png'
        }
        className='pointer-events-none z-50 select-none'
        alt='phone image'
      />

      <div className='absolute -z-10 inset-0'>
        
        <img
          className='object-cover min-w-full min-h-full'
          src={imgSrc}
          alt='overlaying phone image'
        />
      </div>
    </div>
  )
}

export default Phone
/**
 * ClassNames Explanation:
 * 
 * - 'relative': Positions the div relative to its normal position, allowing for absolute positioning within.
 * - 'pointer-events-none': Disables pointer events on the element, making it non-interactive.
 * - 'z-50': Sets the z-index to 50, placing the element in front of other elements with lower z-index values.
 * - 'overflow-hidden': Hides any content that overflows outside the element's boundaries.
 * - 'absolute': Positions the div absolutely within its closest positioned ancestor.
 * - '-z-10': Sets the z-index to -10, placing the element behind other elements with higher z-index values.
 * - 'inset-0': Positions the element on all sides (top, right, bottom, left) to 0, stretching it to fill its parent.
 * - 'object-cover': Ensures the img covers the entire area of its container, maintaining aspect ratio and cropping if necessary.
 * - 'min-w-full': Sets the minimum width of the img to 100% of its container.
 * - 'min-h-full': Sets the minimum height of the img to 100% of its container.
 * - 'select-none': Prevents the img from being selected.
 */