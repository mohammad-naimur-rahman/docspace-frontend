'use client'

import { useGetFileQuery } from '@/redux/features/filesApi'
import { getToken } from '@/utils/auth/getToken'
import { useParams } from 'next/navigation'
//@ts-ignore
import FileViewer from 'react-file-viewer'

export default function FileRenderer() {
  const { id } = useParams()
  const { data } = useGetFileQuery({ id, token: getToken() })
  return (
    <div className='[&_canvas]:mx-auto'>
      <FileViewer
        fileType={data?.data?.type}
        filePath={`/${data?.data?.filePath}`}
        onError={(error: any) => console.error(error)}
        classes='overflow-y-auto'
      />
    </div>
  )
}
