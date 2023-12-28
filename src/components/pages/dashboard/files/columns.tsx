import { Button } from '@/components/ui/button'
import { ITableData } from '@/types/data-table-types'
import { ColumnDef } from '@tanstack/react-table'
import { Folder } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import FileTypeIcon from './file-type-icon'

export default function columns(setcurrentFolder: Dispatch<SetStateAction<string>>): ColumnDef<ITableData>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Name',
      enableSorting: true,
      cell: ({ row }) => {
        if (row.original.dataType === 'file') {
          return (
            <p className='flex items-center gap-2 cursor-pointer'>
              <FileTypeIcon type={row?.original?.type!} />
              {row?.original?.title}.{row?.original?.type}
            </p>
          )
        } else {
          return (
            <p
              className='flex items-center gap-2 font-semibold cursor-pointer'
              onClick={() => setcurrentFolder(row.original._id)}>
              <Folder className='w-7 h-7 text-sky-700' />
              {row.original.title}
            </p>
          )
        }
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      enableSorting: true,
    },
    {
      accessorKey: 'Size / files',
      header: 'Size / Files',
      cell: ({ row }) => {
        if (row.original.dataType === 'file') {
          return <p>{row.original.size} MB</p>
        } else {
          return <p>{row?.original?.subFolders?.length! + row?.original?.files?.length!}</p>
        }
      },
    },
    {
      accessorKey: 'download',
      header: 'Download',
      cell: ({ row }) => {
        if (row.original.dataType === 'file')
          return (
            <a href={row.original.filePath} download>
              <Button>Download</Button>
            </a>
          )
      },
    },
    {
      accessorKey: 'edit',
      header: 'Edit',
    },
    {
      accessorKey: 'delete',
      header: 'Delete',
    },
  ]
}
