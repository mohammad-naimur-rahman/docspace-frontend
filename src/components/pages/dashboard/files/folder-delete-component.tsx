'use client'

import ConfirmationPrompt from '@/components/ui/confirmation-prompt'
import { useDeleteFolderMutation } from '@/redux/features/foldersApi'
import { IFolder } from '@/types/data-table-types'
import { getToken } from '@/utils/auth/getToken'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function FolderDeleteComponent({ folder }: { folder: IFolder }) {
  const [deleteFolder, { isSuccess, isError, error }] = useDeleteFolderMutation()
  const [showPrompt, setshowPrompt] = useState(false)

  useEffect(() => {
    if (isSuccess) toast.success('Folder deleted successfully!')
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
            await deleteFolder({ id: folder._id, token: getToken() })
          }}
        />
      ) : null}
    </>
  )
}
