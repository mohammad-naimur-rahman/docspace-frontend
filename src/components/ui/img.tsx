import { cn } from '@/lib/utils'
import Image, { StaticImageData } from 'next/image'

interface Props {
  src: StaticImageData | string
  alt: string
  width?: number
  height?: number
  sizes?: string
  className?: string
  activePlaceholder?: boolean
}

export function Img({
  src,
  alt,
  width = 500,
  height = 500,
  sizes = '40vw',
  className,
  activePlaceholder = true,
  ...rest
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      width={width}
      height={height}
      className={cn('w-full h-auto block', className)}
      placeholder={activePlaceholder ? 'blur' : 'empty'}
      loading='lazy'
      {...rest}
    />
  )
}
