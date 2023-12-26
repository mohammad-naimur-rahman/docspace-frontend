import { Separator } from '@/components/ui/separator'

export default function OrSeparator() {
  return (
    <div className='flex items-center justify-center gap-3 w-full sm:w-[300px] lg:w-[350px] max-w-[350px] mx-auto py-3.5'>
      <Separator className='max-w-36' />
      <p>Or</p>
      <Separator className='max-w-36' />
    </div>
  )
}
