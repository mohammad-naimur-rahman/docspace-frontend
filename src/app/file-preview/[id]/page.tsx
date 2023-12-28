'use client'

import Typography from '@/components/ui/typography'
import { useGetFileQuery } from '@/redux/features/filesApi'
import { IFile } from '@/types/data-table-types'
import { getToken } from '@/utils/auth/getToken'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
//@ts-ignore
import FileViewer from 'react-file-viewer'

export default function FileRenderer() {
  const { id } = useParams()
  const { isLoading, data } = useGetFileQuery({ id, token: getToken() })
  const file: IFile = data?.data

  const [text, settext] = useState('')
  useEffect(() => {
    if (file?.type === 'txt') {
      fetch(`/${file?.filePath}`)
        .then(res => res.text())
        .then(res => settext(res))
    }
  }, [file])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (file?.type === 'txt') {
    return (
      <div className='container'>
        <Typography variant='h4' className='py-10 text-center px-5'>
          {file?.title}
        </Typography>
        <p>{text}</p>
      </div>
    )
  }
  return (
    <div className='[&_canvas]:mx-auto'>
      <Typography variant='h4' className='py-10 text-center px-5'>
        {file?.title}
      </Typography>
      <FileViewer
        fileType={file?.type}
        filePath={`/${file?.filePath}`}
        onError={(error: any) => console.error(error)}
        classes='overflow-y-auto'
      />
    </div>
  )
}
