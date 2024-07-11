/* eslint-disable @next/next/no-img-element */
'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const STEPS = [
  {
    name: 'Step 1: Add image',
    description: 'Choose an image for your case',
    url: '/upload',
  },
  {
    name: 'Step 2: Customize design',
    description: 'Make the case yours',
    url: '/design',
  },
  {
    name: 'Step 3: Summary',
    description: 'Review your final design',
    url: '/preview',
  },
]

const Steps = () => {
  const pathname = usePathname()

  return (
    <ol className='rounded-md bg-white lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200'>
      {STEPS.map((step, i) => {
        const isCurrent = pathname.endsWith(step.url)
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url)
        )
        const imgPath = `/snake-${i + 1}.png`

        return (
          <li key={step.name} className='relative overflow-hidden lg:flex-1'>
            <div>
              <span
                className={cn(
                  'absolute left-0 top-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                  {
                    'bg-zinc-700': isCurrent,
                    'bg-primary': isCompleted,
                  }
                )}
                aria-hidden='true'
              />

              <span
                className={cn(
                  i !== 0 ? 'lg:pl-9' : '',
                  'flex items-center px-6 py-4 text-sm font-medium'
                )}>
                <span className='flex-shrink-0'>
                  <img
                    src={imgPath}
                    alt=''
                    className={cn(
                      'flex h-20 w-20 object-contain items-center justify-center',
                      {
                        'border-none': isCompleted,
                        'border-zinc-700': isCurrent,
                      }
                    )}
                  />
                </span>

                <span className='ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center'>
                  <span
                    className={cn('text-sm font-semibold text-zinc-700', {
                      'text-primary': isCompleted,
                      'text-zinc-700': isCurrent,
                    })}>
                    {step.name}
                  </span>
                  <span className='text-sm text-zinc-500'>
                    {step.description}
                  </span>
                </span>
              </span>

              {/* separator */}
              {i !== 0 ? (
                <div className='absolute inset-0 hidden w-3 lg:block'>
                  <svg
                    className='h-full w-full text-gray-300'
                    viewBox='0 0 12 82'
                    fill='none'
                    preserveAspectRatio='none'>
                    <path
                      d='M0.5 0V31L10.5 41L0.5 51V82'
                      stroke='currentcolor'
                      vectorEffect='non-scaling-stroke'
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Steps

/**
 * ClassNames Explanation:
 * 
 * - 'rounded-md': Applies medium border-radius to the ol element.
 * - 'bg-white': Sets the background color of the ol element to white.
 * - 'lg:flex': On large screens and up, displays the ol element as a flex container.
 * - 'lg:rounded-none': On large screens and up, removes border-radius from the ol element.
 * - 'lg:border-l': On large screens and up, adds a left border to the ol element.
 * - 'lg:border-r': On large screens and up, adds a right border to the ol element.
 * - 'lg:border-gray-200': On large screens and up, sets the color of the left and right borders to light gray (gray-200).
 * - 'relative': Positions the li elements relative to their normal position, allowing for absolute positioning within.
 * - 'overflow-hidden': Hides any content that overflows outside the li elements' boundaries.
 * - 'lg:flex-1': On large screens and up, makes each li element grow to fill available space in the flex container.
 * - 'absolute': Positions the span element absolutely within its closest positioned ancestor.
 * - 'left-0': Positions the span element to the left edge of its containing element.
 * - 'top-0': Positions the span element to the top edge of its containing element.
 * - 'h-full': Sets the height of the span element to 100% of its parent.
 * - 'w-1': Sets the width of the span element to 0.25rem (usually 1/4 of a unit).
 * - 'bg-zinc-400': Sets the background color of the span element to a medium gray (zinc-400).
 * - 'lg:bottom-0': On large screens and up, positions the span element to the bottom edge of its containing element.
 * - 'lg:top-auto': On large screens and up, allows the span element's top position to be automatically determined.
 * - 'lg:h-1': On large screens and up, sets the height of the span element to 0.25rem (usually 1/4 of a unit).
 * - 'lg:w-full': On large screens and up, sets the width of the span element to 100% of its parent.
 * - 'bg-zinc-700': Sets the background color of the span element to a dark gray (zinc-700) when the step is current.
 * - 'bg-primary': Sets the background color of the span element to the primary color when the step is completed.
 * - 'lg:pl-9': On large screens and up, adds left padding of 2.25rem (usually 9 units).
 * - 'flex': Displays the span element as a flex container.
 * - 'items-center': Aligns children of the span element along the cross axis to the center.
 * - 'px-6': Adds padding of 1.5rem (usually 6 units) on the left and right.
 * - 'py-4': Adds padding of 1rem (usually 4 units) on the top and bottom.
 * - 'text-sm': Sets text size to small.
 * - 'font-medium': Sets the font weight to medium.
 * - 'flex-shrink-0': Prevents the img element from shrinking to fit its container.
 * - 'h-20': Sets the height of the img element to 5rem (usually 20 units).
 * - 'w-20': Sets the width of the img element to 5rem (usually 20 units).
 * - 'object-contain': Ensures the img element maintains its aspect ratio while fitting within its container.
 * - 'border-none': Removes any border from the img element when the step is completed.
 * - 'border-zinc-700': Sets the border color of the img element to dark gray (zinc-700) when the step is current.
 * - 'ml-4': Adds left margin of 1rem (usually 4 units).
 * - 'h-full': Sets the height of the span element to 100% of its parent.
 * - 'mt-0.5': Adds top margin of 0.125rem (usually 0.5 units).
 * - 'min-w-0': Sets the minimum width of the span element to 0, allowing it to shrink to fit its content.
 * - 'flex-col': Displays the span element's children in a column layout.
 * - 'justify-center': Aligns children of the span element along the main axis to the center.
 * - 'text-primary': Sets the text color to the primary color when the step is completed.
 * - 'text-zinc-500': Sets the text color to a light gray (zinc-500).
 */
