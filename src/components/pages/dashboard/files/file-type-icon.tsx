import { IFileType } from '@/types/file-type'
import { BookOpenText, File, FilePieChart, FileText, ImageIcon, Music2, Play } from 'lucide-react'

interface Props {
  type: IFileType
}

export default function FileTypeIcon({ type }: Props) {
  if (['jpeg', 'jpg', 'png'].includes(type)) {
    return <ImageIcon className='w-5 h-5' />
  }

  if (['doc', 'docx'].includes(type)) {
    return <FileText className='w-5 h-5' />
  }

  if (['pdf'].includes(type)) {
    return <BookOpenText className='w-5 h-5' />
  }

  if (['txt'].includes(type)) {
    return <File className='w-5 h-5' />
  }

  if (['csv', 'xsl', 'xslx'].includes(type)) {
    return <FilePieChart className='w-5 h-5' />
  }

  if (['mp3'].includes(type)) {
    return <Music2 className='w-5 h-5' />
  }

  if (['mp4'].includes(type)) {
    return <Play className='w-5 h-5' />
  }
}
