'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { IFile } from '@/types/data-table-types'
import FileTypeIcon from './file-type-icon'

interface Props {
  file: IFile
}

export default function FilePreviewer({ file }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <p className='flex items-center gap-2 cursor-pointer break-all'>
          <FileTypeIcon type={file?.type!} />
          {file?.title}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
