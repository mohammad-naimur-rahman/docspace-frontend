'use client'

import ConfirmationPrompt from '@/components/ui/confirmation-prompt'
import { useDeleteFileMutation } from '@/redux/features/filesApi'
import { IFile } from '@/types/data-table-types'
import { getToken } from '@/utils/auth/getToken'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function FileDeleteComponent({ file }: { file: IFile }) {
  const [deleteFile, { isSuccess, isError, error }] = useDeleteFileMutation()
  const [showPrompt, setshowPrompt] = useState(false)

  useEffect(() => {
    if (isSuccess) toast.success('File deleted successfully!')
    if (isError) toast.error((error as Error).message)
  }, [isSuccess, error, isError])

  return (
    <>
      <Trash2 className='w-4 h-4 text-red-600 cursor-pointer' onClick={() => setshowPrompt(!showPrompt)} />

      {showPrompt ? (
        <ConfirmationPrompt
          open={showPrompt}
          onOpenChange={() => setshowPrompt(!showPrompt)}
          cb={async () => {
            try {
              // deleting file locally
              await axios.delete('/api/upload', { data: { path: `/${file.filePath}` } })

              // then delete from the databse
              await deleteFile({ id: file._id, token: getToken() })
            } catch (error) {
              toast.error((error as Error).message)
            }
          }}
        />
      ) : null}
    </>
  )
}
