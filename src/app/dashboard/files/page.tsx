'use client'

import { DataTable } from '@/components/pages/dashboard/files/data-table'
import FileTypeIcon from '@/components/pages/dashboard/files/file-type-icon'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useGetFolderQuery } from '@/redux/features/foldersApi'
import { IFile, IFolder, ITableData } from '@/types/data-table-types'
import { getToken } from '@/utils/auth/getToken'
import { ColumnDef } from '@tanstack/react-table'
import { Folder, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function FilesPage() {
  const [currentFolder, setcurrentFolder] = useState('root')
  const { isFetching, isSuccess, data } = useGetFolderQuery({ id: currentFolder, token: getToken() })
  const [tableData, settableData] = useState<ITableData[]>([])

  const folders = data?.data?.subFolders?.map((el: IFolder) => {
    return { ...el, dataType: 'folder' }
  })
  const files = data?.data?.files?.map((el: IFile) => {
    return { ...el, dataType: 'file' }
  })

  useEffect(() => {
    if (isSuccess) {
      settableData([...folders, ...files])
    }
  }, [isSuccess, isFetching])

  const columns: ColumnDef<ITableData>[] = [
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

  return (
    <section className='p-5'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <Typography variant='h2'>Documents</Typography>
        <Button size='lg'>
          <Plus className='mr-1' /> Upload
        </Button>
      </div>

      <div className='pt-8'>
        {isFetching ? (
          <div className='flex flex-col gap-4'>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <Skeleton key={i} className='w-full h-14' />
            ))}
          </div>
        ) : null}
        {tableData ? <DataTable columns={columns} data={tableData} /> : null}
      </div>
    </section>
  )
}
