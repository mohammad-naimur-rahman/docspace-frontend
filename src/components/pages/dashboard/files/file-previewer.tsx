'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Img } from '@/components/ui/img'
import { IFile } from '@/types/data-table-types'
import FileTypeIcon from './file-type-icon'

interface Props {
  file: IFile
}

export default function FilePreviewer({ file }: Props) {
  const renderText = (filePath: string): string => {
    let text = ''
    fetch(`/${filePath}`)
      .then(response => response.text())
      .then(textOutput => {
        text = textOutput
      })
    console.log(text)
    return text
  }

  return (
    <Dialog>
      <DialogTrigger>
        {['pdf', 'doc', 'docx', 'txt', 'csv', 'xls', 'xlsx'].includes(file.type) ? (
          <a href={`/file-preview/${file._id}`} target='_blank' onClick={e => e.stopPropagation()}>
            <p className='flex items-center gap-2 cursor-pointer break-all'>
              <FileTypeIcon type={file?.type!} />
              {file?.title}
            </p>
          </a>
        ) : (
          <p className='flex items-center gap-2 cursor-pointer break-all'>
            <FileTypeIcon type={file?.type!} />
            {file?.title}
          </p>
        )}
      </DialogTrigger>
      <DialogContent className='max-w-[900px] min-h-[calc(100svh_-_30px)] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>{file.title}</DialogTitle>
          <DialogDescription className='pt-5 overflow-y-auto'>
            {/**For Images */}
            {['jpeg', 'jpg', 'png'].includes(file.type) ? (
              <Img
                activePlaceholder={false}
                src={`/${file.filePath}`}
                sizes='80vw'
                className='w-full h-full'
                alt={file.title}
              />
            ) : null}

            {['txt'].includes(file.type) ? <pre className='w-full h-[80vh]'>{renderText(file.filePath)}</pre> : null}

            {file.type === 'mp3' ? (
              <audio controls>
                <source src={`/${file.filePath}`} type='audio/mpeg' />
              </audio>
            ) : null}

            {file.type === 'mp4' ? (
              <video controls>
                <source src={`/${file.filePath}`} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
