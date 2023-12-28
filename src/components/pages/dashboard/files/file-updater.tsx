'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUpdateFileMutation } from '@/redux/features/filesApi'
import { IFile } from '@/types/data-table-types'
import { getToken } from '@/utils/auth/getToken'
import { Pencil, PencilLine } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  file: IFile
}

export default function FileUpdater({ file }: Props) {
  const [updateFile, { isSuccess, isError, error }] = useUpdateFileMutation()
  const [folderName, setfolderName] = useState(file?.title)

  useEffect(() => {
    if (isSuccess) toast.success('Folder updated successfully!')
    if (isError) toast.error((error as Error).message)
  }, [isSuccess, error, isError])

  return (
    <Dialog>
      <DialogTrigger>
        <PencilLine className='w-4 h-4 text-blue-700' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>
            <Input
              placeholder='Folder Name'
              value={folderName}
              onChange={e => setfolderName(e.target.value)}
              className='mt-5 mb-3'
            />
          </DialogDescription>
        </DialogHeader>

        <DialogClose className='flex justify-end'>
          <Button
            onClick={async () => {
              if (folderName.length === 0) {
                toast.error("Folder name can't be empty")
                return
              }
              await updateFile({ id: file._id, payload: { title: folderName }, token: getToken() })
            }}>
            <Pencil className='w-4 h-4 mr-2' />
            Update
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
