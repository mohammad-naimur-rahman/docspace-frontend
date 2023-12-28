'use client'

import { Button } from '@/components/ui/button'
import { fileTypesArr } from '@/constants/file-data-type'
import { useCreateFileMutation } from '@/redux/features/filesApi'
import { getToken } from '@/utils/auth/getToken'
import { Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FileUploader as ReactDragDrop } from 'react-drag-drop-files'
import { toast } from 'sonner'

export default function FileUploader({ currentFolder }: { currentFolder: string }) {
  const [uploadFile, { isSuccess, isError, error }] = useCreateFileMutation()
  const [showUploadPlace, setshowUploadPlace] = useState(false)
  const handleChange = async (file: Blob) => {
    if (!file) return
    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })

      const response = await res.json()

      if (response.success === false) {
        toast.error(response.message)
        return
      }
      await uploadFile({
        payload: {
          title: response.name,
          size: +response.size,
          filePath: response.path,
          type: response?.name?.split('.').slice(-1)[0],
          parentFolder: currentFolder,
        },
        token: getToken(),
      })
      setshowUploadPlace(false)
    } catch (e: unknown) {
      console.error(e)
      toast.error((e as Error).message)
      setshowUploadPlace(false)
    }
  }

  useEffect(() => {
    if (isSuccess) toast.success('File uploaded successfully!')
    if (isError) toast.error((error as Error).message)
  }, [isSuccess, error, isError])

  return (
    <>
      {showUploadPlace ? (
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <ReactDragDrop
              handleChange={handleChange}
              name='file'
              types={fileTypesArr}
              classes='[&_span]:text-primary'
              naxSize={10}
            />

            <Button size='icon' variant='outline' onClick={() => setshowUploadPlace(false)}>
              <X />
            </Button>
          </div>
          <p className='text-xs italic text-muted-foreground'>Max size: 10 MB</p>
        </div>
      ) : (
        <Button size='lg' onClick={() => setshowUploadPlace(true)}>
          <Plus className='mr-1' /> Upload
        </Button>
      )}
    </>
  )
}
