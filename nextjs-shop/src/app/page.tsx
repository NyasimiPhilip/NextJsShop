/* eslint-disable @next/next/no-img-element */
import { Icons } from '@/components/Icons'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Phone from '@/components/Phone'
import { Reviews } from '@/components/Reviews'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight, Check, Star } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='bg-slate-50 grainy-light'>
      <section>
        <MaxWidthWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
          <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
            <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
              <div className='absolute w-28 left-0 -top-20 hidden lg:block'>
                {/* <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28' /> */}
                <img src='/snake-1.png' className='w-full' alt=''/>
              </div>
              <h1 className='relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl'>
                Your Image on a{' '}
                <span className='bg-green-600 px-2 text-white'>Custom</span>{' '}
                Phone Case
              </h1>
              <p className='mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap'>
                Capture your favorite memories with your own,{' '}
                <span className='font-semibold'>one-of-one</span> phone case.
                CaseCobra allows you to protect your memories, not just your
                phone case.
              </p>

              <ul className='mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start'>
                <div className='space-y-2'>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-green-600' />
                    High-quality, durable material
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-green-600' />5 year
                    print guarantee
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-green-600' />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>

              <div className='mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5'>
                <div className='flex -space-x-4'>
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-1.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-2.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-3.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-4.jpg'
                    alt='user image'
                  />
                  <img
                    className='inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-5.jpg'
                    alt='user image'
                  />
                </div>

                <div className='flex flex-col justify-between items-center sm:items-start'>
                  <div className='flex gap-0.5'>
                    <Star className='h-4 w-4 text-green-600 fill-green-600' />
                    <Star className='h-4 w-4 text-green-600 fill-green-600' />
                    <Star className='h-4 w-4 text-green-600 fill-green-600' />
                    <Star className='h-4 w-4 text-green-600 fill-green-600' />
                    <Star className='h-4 w-4 text-green-600 fill-green-600' />
                  </div>

                  <p>
                    <span className='font-semibold'>1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
            <div className='relative md:max-w-xl'>
              <img
                src='/your-image.png'
                alt=''
                className='absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block'
              />
              <img
                src='/line.png'
                alt=''
                className='absolute w-20 -left-6 -bottom-6 select-none'
              />
              <Phone className='w-64' imgSrc='/testimonials/1.jpg' />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className='bg-slate-100 grainy-dark py-24'>
        <MaxWidthWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
          <div className='flex flex-col lg:flex-row items-center gap-4 sm:gap-6'>
            <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
              What our{' '}
              <span className='relative px-2'>
                customers{' '}
                <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500' />
              </span>{' '}
              say
            </h2>
            <img src='/snake-2.png' className='w-24 order-0 lg:order-2'  alt='' />
          </div>

          <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16'>
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                &quot;The case feels durable and I even got a compliment on the
                  design. Had the case for two and a half months now and{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it.&quot;
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-1.png'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Jonathan</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second user review */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
                <Star className='h-5 w-5 text-green-600 fill-green-600' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                &quot;I usually keep my phone together with my keys in my pocket
                  and that led to some pretty heavy scratchmarks on all of my
                  last phone cases. This one, besides a barely noticeable
                  scratch on the corner,{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                    looks brand new after about half a year
                  </span>
                  . I dig it.&quot;
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-4.jpg'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Josh</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-green-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>        

        <div className='pt-16'>             
          <Reviews/>
        </div>
      </section>

      <section>
        <MaxWidthWrapper className='py-24'>
          <div className='mb-12 px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                Upload your photo and get{' '}
                <span className='relative px-2 bg-green-600 text-white'>
                  your own case
                </span>{' '}
                now
              </h2>
            </div>
          </div>

          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='relative flex flex-col items-center md:grid grid-cols-2 gap-40'>
              <img
                alt=''
                src='/arrow.png'
                className='absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0'
              />

              <div className='relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl'>
                <img
                  src='/horse.jpg'
                  alt= ''
                  className='rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full'
                />
              </div>

              <Phone className='w-60' imgSrc='/horse_phone.jpg' />
            </div>
          </div>

          <ul className='mx-auto mt-12 max-w-prose font-medium space-y-2 w-fit'>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              High-quality silicone material
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              Scratch- and fingerprint resistant coating
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              Wireless charging compatible
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />5 year
              print warranty
            </li>

            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  size: 'lg',
                  className: 'mx-auto mt-8',
                })}
                href='/configure/Upload'>
                Create your case now <ArrowRight className='h-4 w-4 ml-1.5' />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
/**
 * ClassNames Explanation:
 * 
 * - 'bg-slate-50': Sets the background color to slate-50, a light gray color.
 * - 'grainy-light': Likely a custom class that adds a grainy texture to the background.
 * - 'pb-24': Adds padding-bottom of 6rem (96px).
 * - 'pt-10': Adds padding-top of 2.5rem (40px).
 * - 'lg:grid': Applies grid layout on large screens and above.
 * - 'lg:grid-cols-3': Defines three columns for the grid on large screens and above.
 * - 'sm:pb-32': Adds padding-bottom of 8rem (128px) on small screens and above.
 * - 'lg:gap-x-0': Sets the horizontal gap between grid columns to 0 on large screens and above.
 * - 'xl:gap-x-8': Sets the horizontal gap between grid columns to 2rem (32px) on extra-large screens and above.
 * - 'lg:pt-24': Adds padding-top of 6rem (96px) on large screens and above.
 * - 'xl:pt-32': Adds padding-top of 8rem (128px) on extra-large screens and above.
 * - 'lg:pb-52': Adds padding-bottom of 13rem (208px) on large screens and above.
 * - 'col-span-2': Spans the element across two columns in a grid layout.
 * - 'px-6': Adds padding on the left and right of 1.5rem (24px).
 * - 'lg:px-0': Sets padding on the left and right to 0 on large screens and above.
 * - 'lg:pt-4': Adds padding-top of 1rem (16px) on large screens and above.
 * - 'relative': Sets position to relative.
 * - 'mx-auto': Centers the element horizontally using margin auto.
 * - 'text-center': Centers the text.
 * - 'lg:text-left': Aligns the text to the left on large screens and above.
 * - 'flex': Applies flexbox layout.
 * - 'flex-col': Sets the flex direction to column.
 * - 'items-center': Centers the items horizontally.
 * - 'lg:items-start': Aligns items to the start (left) on large screens and above.
 * - 'absolute': Sets position to absolute.
 * - 'w-28': Sets the width to 7rem (112px).
 * - 'left-0': Aligns the element to the left.
 * - '-top-20': Moves the element 5rem (80px) upwards.
 * - 'hidden': Hides the element.
 * - 'lg:block': Displays the element as a block on large screens and above.
 * - 'inset-x-0': Sets the left and right edges to 0.
 * - 'bottom-0': Aligns the element to the bottom.
 * - 'bg-gradient-to-t': Applies a top-to-bottom gradient.
 * - 'via-slate-50/50': Sets the middle color of the gradient to 50% opacity slate-50.
 * - 'from-slate-50': Sets the starting color of the gradient to slate-50.
 * - 'h-28': Sets the height to 7rem (112px).
 * - 'text-balance': Likely a custom class for balanced text.
 * - 'mt-16': Adds margin-top of 4rem (64px).
 * - 'font-bold': Sets the font weight to bold.
 * - '!leading-tight': Forces the line height to be tight.
 * - 'text-gray-900': Sets the text color to gray-900, a very dark gray.
 * - 'text-5xl': Sets the font size to 3rem (48px).
 * - 'md:text-6xl': Sets the font size to 4rem (64px) on medium screens and above.
 * - 'lg:text-7xl': Sets the font size to 5rem (80px) on large screens and above.
 * - 'mt-8': Adds margin-top of 2rem (32px).
 * - 'text-lg': Sets the font size to 1.125rem (18px).
 * - 'lg:pr-10': Adds padding-right of 2.5rem (40px) on large screens and above.
 * - 'max-w-prose': Sets the maximum width to the length of a standard prose text line.
 * - 'sm:items-start': Aligns items to the start (left) on small screens and above.
 * - 'space-y-2': Adds a vertical margin between children of 0.5rem (8px).
 * - 'gap-1.5': Adds a gap of 0.375rem (6px).
 * - 'shrink-0': Prevents the element from shrinking.
 * - 'text-green-600': Sets the text color to green-600.
 * - 'mt-12': Adds margin-top of 3rem (48px).
 * - 'sm:flex-row': Arranges the children in a row layout on small screens and above.
 * - 'gap-5': Adds a gap of 1.25rem (20px).
 * - '-space-x-4': Adds a negative horizontal margin of -1rem (-16px) between children.
 * - 'inline-block': Displays the element as an inline-level block container.
 * - 'h-10': Sets the height to 2.5rem (40px).
 * - 'w-10': Sets the width to 2.5rem (40px).
 * - 'rounded-full': Rounds the corners to make the element a circle.
 * - 'ring-2': Adds a ring with a width of 2px.
 * - 'ring-slate-100': Sets the ring color to slate-100.
 * - 'object-cover': Sets the image object fit to cover.
 * - 'flex-col': Arranges the children in a column layout.
 * - 'gap-0.5': Adds a gap of 0.125rem (2px).
 * - 'h-4': Sets the height to 1rem (16px).
 * - 'w-4': Sets the width to 1rem (16px).
 * - 'fill-green-600': Fills the SVG with the color green-600.
 * - 'order-1': Sets the order of the flex item to 1.
 * - 'text-6xl': Sets the font size to 4rem (64px).
 * - 'lg:order-2': Sets the order of the flex item to 2 on large screens and above.
 * - 'w-24': Sets the width to 6rem (96px).
 * - 'order-0': Sets the order of the flex item to 0.
 * - 'lg:order-2': Sets the order of the flex item to 2 on large screens and above.
 * - 'mx-auto': Centers the element horizontally using margin auto.
 * - 'gap-y-16': Adds a vertical gap of 4rem (64px) between children.
 * - 'max-w-2xl': Sets the maximum width to 2xl (42rem, 672px).
 * - 'gap-4': Adds a gap of 1rem (16px).
 * - 'mb-2': Adds a margin-bottom of 0.5rem (8px).
 * - 'leading-8': Sets the line height to 2rem (32px).
 * - 'rounded-full': Rounds the corners to make the element a circle.
 * - 'h-12': Sets the height to 3rem (48px).
 * - 'w-12': Sets the width to 3rem (48px).
 * - 'object-cover': Sets the image object fit to cover.
 * - 'mt-2': Adds margin-top of 0.5rem (8px).
 * - 'sm:text-lg': Sets the font size to 1.125rem (18px) on small screens and above.
 * - 'relative': Sets position to relative.
 * - 'lg:mx-0': Removes horizontal margin on large screens and above.
 * - 'lg:mt-20': Adds margin-top of 5rem (80px) on large screens and above.
 * - 'h-fit': Sets the height to fit the content.
 * - 'md:max-w-xl': Sets the maximum width to xl (36rem, 576px) on medium screens and above.
 * - 'w-40': Sets the width to 10rem (160px).
 * - 'lg:w-52': Sets the width to 13rem (208px) on large screens and above.
 * - 'left-56': Moves the element 14rem (224px) to the left.
 * - 'w-20': Sets the width to 5rem (80px).
 * - '-left-6': Moves the element 1.5rem (24px) to the left.
 * - '-bottom-6': Moves the element 1.5rem (24px) downwards.
 * - 'md:grid': Applies grid layout on medium screens and above.
 * - 'grid-cols-2': Defines two columns for the grid.
 * - 'gap-40': Adds a gap of 10rem (160px).
 * - 'h-80': Sets the height to 20rem (320px).
 * - 'justify-self-end': Aligns the item to the end within the grid area.
 * - 'max-w-sm': Sets the maximum width to sm (24rem, 384px).
 * - 'lg:gap-56': Adds a gap of 14rem (224px) on large screens and above.
 * - 'lg:h-[520px]': Sets the height to 520px on large screens and above.
 * - 'max-h-full': Sets the maximum height to 100%.
 * - 'md:w-32': Sets the width to 8rem (128px) on medium screens and above.
 * - 'lg:w-40': Sets the width to 10rem (160px) on large screens and above.
 * - 'inset-0': Sets all inset properties (top, right, bottom, left) to 0.
 * - 'block': Displays the element as a block.
 * - 'aspect-video': Sets the aspect ratio to 16:9.
 * - 'h-full': Sets the height to 100%.
 * - 'max-h-full': Sets the maximum height to 100%.
 */