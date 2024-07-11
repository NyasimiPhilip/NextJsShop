import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'

const Footer = () => {
  return (
    <footer className='bg-white h-20 relative'>
      <MaxWidthWrapper>
        <div className='border-t border-gray-200' />

        <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
          <div className='text-center md:text-left pb-2 md:pb-0'>
            <p className='text-sm text-muted-foreground'>
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className='flex items-center justify-center'>
            <div className='flex space-x-8'>
              <Link
                href='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Terms
              </Link>
              <Link
                href='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Privacy Policy
              </Link>
              <Link
                href='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer

/**
 * ClassNames Explanation:
 * 
 * - 'bg-white': Sets the background color of the footer to white.
 * - 'h-20': Sets the height of the footer to 20 units (usually 5rem).
 * - 'relative': Positions the footer relative to its normal position, allowing for absolute positioning within.
 * - 'border-t': Adds a top border to the div.
 * - 'border-gray-200': Sets the color of the top border to a light gray (gray-200).
 * - 'h-full': Sets the height of the div to 100% of its parent.
 * - 'flex': Applies flexbox layout to the div for flexible box layouts.
 * - 'flex-col': Arranges children in a column layout.
 * - 'md:flex-row': On medium screens and up, arranges children in a row layout.
 * - 'md:justify-between': On medium screens and up, justifies space between children elements.
 * - 'justify-center': Centers children elements along the main axis.
 * - 'items-center': Centers children elements along the cross axis.
 * - 'text-center': Centers text within the div.
 * - 'md:text-left': On medium screens and up, aligns text to the left.
 * - 'pb-2': Adds padding-bottom of 2 units (usually 0.5rem).
 * - 'md:pb-0': On medium screens and up, sets padding-bottom to 0.
 * - 'text-sm': Sets text size to small.
 * - 'text-muted-foreground': Applies a muted color to the text.
 * - 'hover:text-gray-600': Changes text color to gray-600 on hover.
 * - 'space-x-8': Adds horizontal spacing between children of 8 units (usually 2rem).
 */