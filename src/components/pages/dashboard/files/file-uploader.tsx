'use client'

import { Button } from '@/components/ui/button'
import { fileTypesArr } from '@/constants/file-data-type'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { FileUploader as ReactDragDrop } from 'react-drag-drop-files'
import { toast } from 'sonner'

export default function FileUploader() {
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

      if (!res.ok) throw new Error(await res.text())
      const response = await res.json()
      console.log(response)
      toast.success('File uploaded successfully!')
      setshowUploadPlace(false)
    } catch (e: unknown) {
      console.error(e)
      toast.error((e as Error).message)
      setshowUploadPlace(false)
    }
  }
  return (
    <>
      {showUploadPlace ? (
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
      ) : (
        <Button size='lg' onClick={() => setshowUploadPlace(true)}>
          <Plus className='mr-1' /> Upload
        </Button>
      )}
    </>
  )
}
