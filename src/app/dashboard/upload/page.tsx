'use client'

import { useState } from 'react'
import FileViewer from 'react-file-viewer'

export default function UploadForm() {
  const [file, setFile] = useState<File>()
  const [uploadedFile, setuploadedFile] = useState<any | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })
      // handle the error

      if (!res.ok) throw new Error(await res.text())
      const response = await res.json()
      setuploadedFile(response)
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type='file' name='file' onChange={e => setFile(e.target.files?.[0])} />
        <input type='submit' value='Upload' />
      </form>
      {uploadedFile?.path ? (
        <FileViewer
          fileType={uploadedFile?.name?.split('.').slice(-1)[0]}
          filePath={`/${uploadedFile?.path}`}
          onError={error => console.error(error)}
        />
      ) : null}
    </>
  )
}
