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
import { useCreateFolderMutation } from '@/redux/features/foldersApi'
import { getToken } from '@/utils/auth/getToken'
import { FolderPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function NewFolderCreator({ currentFolder }: { currentFolder: string }) {
  const [createFolder, { isSuccess, isError, error }] = useCreateFolderMutation()
  const [folderName, setfolderName] = useState('')

  useEffect(() => {
    if (isSuccess) toast.success('Folder created successfully!')
    if (isError) toast.error((error as Error).message)
  }, [isSuccess, error, isError])

  return (
    <Dialog>
      <DialogTrigger>
        <Button size='lg'>
          <FolderPlus className='mr-1' />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            <Input placeholder='Folder Name' onChange={e => setfolderName(e.target.value)} className='mt-5 mb-3' />
          </DialogDescription>
          <DialogClose className='flex justify-end'>
            <Button
              onClick={async () => {
                if (folderName.length === 0) {
                  toast.error("Folder name can't be empty")
                  return
                }
                await createFolder({ payload: { title: folderName, parentFolder: currentFolder }, token: getToken() })
              }}>
              <FolderPlus className='w-4 h-4 mr-2' />
              Create
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
