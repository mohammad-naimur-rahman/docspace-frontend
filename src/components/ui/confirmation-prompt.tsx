import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'
import { CheckCircle, XCircle } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { Button } from './button'

interface Props {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  cb: () => void
  message?: string
}

export default function ConfirmationPrompt({ open, onOpenChange, cb, message }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm'>
        <DialogHeader className='sm:text-center'>
          <DialogTitle>{message || 'Are you sure?'}</DialogTitle>
        </DialogHeader>
        <DialogFooter className='items-center sm:justify-center gap-5 mt-10'>
          <DialogClose>
            <Button className='px-12' onClick={cb}>
              <CheckCircle className='mr-2' />
              Yes
            </Button>
          </DialogClose>
          <DialogClose>
            <Button variant='destructive' className='px-12'>
              <XCircle className='mr-2' />
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
