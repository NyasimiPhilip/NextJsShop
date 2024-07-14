'use client'

import HandleComponent from '@/components/HandleComponent'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, formatPrice } from '@/lib/utils'
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'
import {  Label as HeadlessLabel, Radio, RadioGroup } from '@headlessui/react'
import { useRef, useState } from 'react'
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from '@/validators/option-validator'
import { Label as CustomLabel } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react'
import { BASE_PRICE } from "@/app/config/products"
import { useUploadThing } from '@/lib/uploadthing'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import { saveConfig as _saveConfig, SaveConfigArgs } from './actions'
import { useRouter } from 'next/navigation'

interface DesignConfiguratorProps {
  configId: string
  imageUrl: string
  imageDimensions: { width: number; height: number }
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfiguratorProps) => {
    const { toast } = useToast()
    const router = useRouter()

    const { mutate: saveConfig, isPending } = useMutation({
        mutationKey: ['save-config'],
        mutationFn: async (args: SaveConfigArgs) => {
        await Promise.all([saveConfiguration(), _saveConfig(args)])
        },
        onError: () => {
            toast({
                title: 'Something went wrong',
                description: 'There was an error on our end. Please try again.',
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            router.push(`/configure/preview?id=${configId}`)
        },
})

const [options, setOptions] = useState<{
    color: (typeof COLORS)[number]
    model: (typeof MODELS.options)[number]
    material: (typeof MATERIALS.options)[number]
    finish: (typeof FINISHES.options)[number]
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  })

const [renderedDimension, setRenderedDimension] = useState({
width: imageDimensions.width / 4,
height: imageDimensions.height / 4,
})

const [renderedPosition, setRenderedPosition] = useState({
x: 150,
y: 205,
})

const phoneCaseRef = useRef<HTMLDivElement>(null)
const containerRef = useRef<HTMLDivElement>(null)

const { startUpload } = useUploadThing('imageUploader')

async function saveConfiguration() {
    try {
        const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
        } = phoneCaseRef.current!.getBoundingClientRect()

        const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect()

        const leftOffset = caseLeft - containerLeft
        const topOffset = caseTop - containerTop

        const actualX = renderedPosition.x - leftOffset
        const actualY = renderedPosition.y - topOffset

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        const userImage = new Image()
        userImage.crossOrigin = 'anonymous'
        userImage.src = imageUrl
        await new Promise((resolve) => (userImage.onload = resolve))

        ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
        )

        const base64 = canvas.toDataURL()
        const base64Data = base64.split(',')[1]

        const blob = base64ToBlob(base64Data, 'image/png')
        const file = new File([blob], 'filename.png', { type: 'image/png' })

        await startUpload([file], { configId })
    } catch (err) {
        toast({
        title: 'Something went wrong',
        description:
            'There was a problem saving your config, please try again.',
        variant: 'destructive',
        })
    }
}

function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
}

return (
        <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
            <div
            ref={containerRef}
            className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            >
                <div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]'>
                    <AspectRatio
                    ref={phoneCaseRef}
                    ratio={896 / 1831}
                    className='pointer-events-none relative z-50 aspect-[896/1831] w-full'
                    >
                        <NextImage
                        fill
                        alt='phone image'
                        src='/phone-template.png'
                        className='pointer-events-none z-50 select-none'
                        />
                    </AspectRatio>
                    <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
                        <div
                            className={cn(
                            'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
                            `bg-${options.color.tw}`
                            )}
                        />
                </div>    
                <Rnd
                default={{
                    x: 150,
                    y: 205,
                    height: imageDimensions.height / 4,
                    width: imageDimensions.width / 4,
                }}
                onResizeStop={(_, __, ref, ___, { x, y }) => {
                    setRenderedDimension({
                    height: parseInt(ref.style.height.slice(0, -2)),
                    width: parseInt(ref.style.width.slice(0, -2)),
                    });
        
                    setRenderedPosition({ x, y });
                }}
                onDragStop={(_, data) => {
                    const { x, y } = data;
                    setRenderedPosition({ x, y });
                }}
                className='absolute z-20 border-[3px] border-primary'
                lockAspectRatio
                resizeHandleComponent={{
                    bottomRight: <HandleComponent />,
                    bottomLeft: <HandleComponent />,
                    topRight: <HandleComponent />,
                    topLeft: <HandleComponent />,
                }}
                >
                    <div className='relative w-full h-full'>
                        <NextImage
                        src={imageUrl}
                        fill
                        alt='your image'
                        className='pointer-events-none'
                        />
                    </div>
                </Rnd>
            </div>
  
            <div className='h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white'>
                <ScrollArea className='relative flex-1 overflow-auto'>
                    <div
                        aria-hidden='true'
                        className='absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none'
                    />
  
                    <div className='px-8 pb-12 pt-8'>
                        <h2 className='tracking-tight font-bold text-3xl'>
                        Customize your case
                        </h2>
                        <div className='w-full h-px bg-zinc-200 my-6' />
                        <div className='relative mt-4 h-full flex flex-col justify-between'>
                            <div className='flex flex-col gap-6'>
                                <RadioGroup
                                value={options.color}
                                onChange={(val) => {
                                    setOptions((prev) => ({
                                    ...prev,
                                    color: val,
                                    }));
                                }}
                                >
                                    <CustomLabel>Color: {options.color.label}</CustomLabel>
                                    <div className='mt-3 flex items-center space-x-3'>
                                        {COLORS.map((color) => (
                                        <Radio
                                            key={color.label}
                                            value={color}
                                            className={cn(
                                            'relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer focus:outline-none',
                                            {
                                                'ring ring-offset-1 ring-primary':
                                                options.color === color,
                                                'ring-2 ring-primary': options.color !== color,
                                            }
                                            )}
                                        >
                                            <span className='sr-only'>{color.label}</span>
                                            <span
                                            aria-hidden='true'
                                            className={cn(
                                                'h-full w-full rounded-full',
                                                `bg-${color.tw}`
                                            )}
                                            />
                                        </Radio>
                                        ))}
                                    </div>
                                </RadioGroup>
  
                                <div className='space-y-2'>
                                <CustomLabel>Model: {options.model.label}</CustomLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-label='Select Model'
                                            variant='outline'
                                            role='button'
                                            aria-haspopup='true'
                                            aria-expanded='false'
                                            className='w-full justify-between'
                                        >
                                            {options.model.label}
                                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-[200px]'>
                                        {MODELS.options.map((model) => (
                                        <DropdownMenuItem
                                        key={model.label}
                                        onSelect={() => {
                                            setOptions((prev) => ({
                                            ...prev,
                                            model,
                                            }));
                                        }}
                                        className='cursor-pointer'
                                        >
                                            {model.label}
                                            {model.label === options.model.label && (
                                            <Check className='w-4 h-4 opacity-50' />
                                             )}
                                        </DropdownMenuItem>
                                         ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className='space-y-2'>
                                <CustomLabel>Material: {options.material.label}</CustomLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-label='Select Material'
                                            variant='outline'
                                            role='button'
                                            aria-haspopup='true'
                                            aria-expanded='false'
                                            className='w-full justify-between'
                                        >
                                            <span className='font-medium'>{options.material.label}</span>
                                            <div className='ml-auto flex items-center space-x-2'>
                                                <span className='text-gray-500'>${(options.material.price / 100).toFixed(2)}</span>
                                                <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className='w-[300px]'>
                                        {MATERIALS.options.map((material) => (
                                            <DropdownMenuItem
                                            key={material.label}
                                            onSelect={() => {
                                                setOptions((prev) => ({
                                                ...prev,
                                                material,
                                                }));
                                            }}
                                            className='cursor-pointer w-full flex flex-col items-start space-y-2'
                                            >
                                                <span className='flex justify-between w-full'>
                                                    <span className='flex items-center space-x-2'>
                                                        <span>{material.label}</span>
                                                        {material.label === options.material.label && (
                                                        <Check className='w-4 h-4 opacity-50' />
                                                        )}
                                                    </span>
                                                    <span className='font-medium text-gray-900'>
                                                        {formatPrice(material.price / 100)}
                                                    </span>
                                                </span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

  
                            
  
                            <div className='space-y-2'>
                                <CustomLabel>Finish: {options.finish.label}</CustomLabel>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            aria-label='Select Finish'
                                            variant='outline'
                                            role='button'
                                            aria-haspopup='true'
                                            aria-expanded='false'
                                            className='w-full justify-between'
                                        >
                                            <span className='font-medium'>{options.finish.label}</span>
                                            <div className='ml-auto flex items-center space-x-2'>
                                                <span className='text-gray-500'>${(options.finish.price / 100).toFixed(2)}</span>
                                                <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
                                            </div>                                            
                                            
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-[300px]'>
                                        {FINISHES.options.map((finish) => (
                                            <DropdownMenuItem
                                            key={finish.label}
                                            onSelect={() => {
                                                setOptions((prev) => ({
                                                ...prev,
                                                finish,
                                                }));
                                            }}
                                            className='cursor-pointer w-full flex flex-col items-start space-y-2'
                                            >
                                                <span className='flex justify-between w-full'>
                                                    <span className='flex items-center space-x-2'>                                                    
                                                        <span>{finish.label}</span>
                                                        {finish.label === options.finish.label && (
                                                        <Check className='w-4 h-4 opacity-50' />
                                                        )}
                                                    </span>
                                                    <span className='font-medium text-gray-900'>
                                                            {formatPrice(finish.price / 100)}
                                                    </span>
                                                </span>                                               
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
  
                        <div className='w-full h-px bg-zinc-200 my-6' /></div>
                    </div>
                </ScrollArea>

                <div className='w-full px-8 h-16 bg-white'>
                    <div className='h-px w-full bg-zinc-200' />
                        <div className='w-full h-full flex justify-between items-center'>        
                            <p className='text-xl font-medium text-primary'>
                                {formatPrice(
                                    (BASE_PRICE + options.finish.price + options.material.price) / 100
                                )}
                            </p>
                            <Button
                                isLoading={isPending}
                                disabled={isPending}
                                loadingText="Saving"
                                onClick={() =>
                                    saveConfig({
                                        configId,
                                        color: options.color.value,
                                        finish: options.finish.value,
                                        material: options.material.value,
                                        model: options.model.value,
                                    })
                                }
                                size='sm'
                            >
                                Continue
                                <ArrowRight className='h-4 w-4 ml-1.5 inline' />
                            </Button>
                        </div> 
                    </div>
                </div>
        </div>
    )
}
export default DesignConfigurator


/**
 * ClassNames Explanation:
 * 
 * - 'relative': Positions the element relative to its normal position.
 * - 'mt-20': Adds margin-top of 5rem (80px).
 * - 'grid': Displays the element as a grid container.
 * - 'grid-cols-1 lg:grid-cols-3': Sets the number of columns to 1 on small screens and 3 on large screens.
 * - 'mb-20': Adds margin-bottom of 5rem (80px).
 * - 'pb-20': Adds padding-bottom of 5rem (80px).
 * - 'h-[37.5rem]': Sets the height to 37.5rem (600px) using a responsive design approach.
 * - 'overflow-hidden': Hides overflow content outside of its container.
 * - 'col-span-2': Spans the element across 2 columns in a grid layout.
 * - 'w-full': Sets the width to 100% of its container.
 * - 'max-w-4xl': Sets a maximum width of 64rem (1024px).
 * - 'flex': Displays the element as a flex container.
 * - 'items-center': Centers flex items along the cross-axis.
 * - 'justify-center': Centers flex items along the main-axis.
 * - 'rounded-lg': Rounds the corners of the element with a large border-radius.
 * - 'border-2': Adds a border with a width of 2px.
 * - 'border-dashed': Sets the border style to dashed.
 * - 'border-gray-300': Sets the border color to gray-300.
 * - 'p-12': Adds padding of 3rem (48px) on all sides.
 * - 'text-center': Aligns text to the center.
 * - 'focus:outline-none': Removes outline focus style.
 * - 'focus:ring-2': Adds a 2px ring around the element on focus.
 * - 'focus:ring-primary': Sets the color of the focus ring to primary color.
 * - 'focus:ring-offset-2': Adds a 2px offset to the focus ring.
 * - 'z-50': Sets the z-index to 50.
 * - 'absolute': Positions the element absolutely.
 * - 'inset-0': Sets top, right, bottom, and left to 0.
 * - 'left-[3px]': Positions the element 3px from the left.
 * - 'top-px': Positions the element 1px from the top.
 * - 'right-[3px]': Positions the element 3px from the right.
 * - 'bottom-px': Positions the element 1px from the bottom.
 * - 'shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]': Adds a shadow with specific settings.
 * - 'bg-opacity-50': Sets the background color with 50% opacity.
 * - 'pointer-events-none': Disables pointer events on the element.
 * - 'aspect-[896/1831]': Sets the aspect ratio of the element.
 * - 'w-60': Sets the width to 15rem (240px).
 * - 'absolute': Positions the element absolutely.
 * - 'bg-zinc-200': Sets the background color to zinc-200.
 * - 'z-40': Sets the z-index to 40.
 * - 'inset-0': Sets top, right, bottom, and left to 0.
 * - 'rounded-[32px]': Rounds the corners of the element with a specific border-radius.
 * - 'z-20': Sets the z-index to 20.
 * - 'border-[3px]': Adds a border with a width of 3px.
 * - 'border-primary': Sets the border color to primary color.
 * - 'resizeHandleComponent': Defines custom components for resizing.
 * - 'lockAspectRatio': Locks the aspect ratio of the Rnd component.
 * - 'absolute': Positions the element absolutely.
 * - 'border-[3px]': Adds a border with a width of 3px.
 * - 'border-primary': Sets the border color to primary color.
 * - 'h-full': Sets the height to 100% of its container.
 * - 'px-8': Adds padding of 2rem (32px) on the x-axis.
 * - 'pb-12': Adds padding-bottom of 3rem (48px).
 * - 'pt-8': Adds padding-top of 2rem (32px).
 * - 'tracking-tight': Sets the letter spacing to tight.
 * - 'font-bold': Sets the font weight to bold.
 * - 'text-3xl': Sets the font size to 1.875rem (30px).
 * - 'w-full': Sets the width to 100% of its container.
 * - 'bg-zinc-200': Sets the background color to zinc-200.
 * - 'mt-4': Adds margin-top of 1rem (16px).
 * - 'gap-6': Sets the gap between flex items to 1.5rem (24px).
 * - 'flex-1': Makes the element grow to fill the available space.
 * - 'space-y-2': Sets the space between direct children to 0.5rem (8px).
 * - 'items-center': Centers flex items along the cross-axis.
 * - 'w-[200px]': Sets the width to 12.5rem (200px).
 * - 'justify-between': Aligns items evenly along the main-axis with space between them.
 * - 'cursor-pointer': Changes the cursor to pointer on hover.
 * - 'w-8 h-8': Sets the width and height to 2rem (32px).
 * - 'rounded-full': Rounds the corners to make the element a circle.
 * - 'ring': Adds a ring around the element.
 * - 'ring-offset-1': Adds an offset to the ring.
 * - 'ring-primary': Sets the ring color to primary color.
 * - 'w-full': Sets the width to 100% of its container.
 * - 'h-px': Sets the height to 1px.
 * - 'bg-zinc-200': Sets the background color to zinc-200.
 * - 'text-xl': Sets the font size to 1.25rem (20px).
 * - 'font-medium': Sets the font weight to medium.
 * - 'w-12': Sets the width to 3rem (48px).
 * - 'p-0': Sets padding to 0.
 * - 'h-12': Sets the height to 3rem (48px).
 * - 'rounded-lg': Rounds the corners of the element with a large border-radius.
 * - 'opacity-50': Sets the opacity to 50%.
 * - 'w-5': Sets the width to 1.25rem (20px).
 * - 'h-5': Sets the height to 1.25rem (20px).
 **/

