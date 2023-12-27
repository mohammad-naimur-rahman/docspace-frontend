import { IFileType } from '@/types/file-type'

export interface IFolder {
  _id: string
  title: string
  subFolders: string[]
  files: string[]
  dataType: string
  createdAt: Date
}

export interface IFile {
  _id: string
  title: string
  filePath: string
  size: number
  type: IFileType
  dataType: string
  createdAt: Date
}

export interface ITableData {
  _id: string
  title: string
  dataType: 'folder' | 'file'
  type?: IFileType
  subFolders?: string[]
  files?: string[]
  size?: number
  filePath?: string
}
