'use client'

import { DataTable } from '@/components/pages/dashboard/files/data-table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useGetFolderQuery } from '@/redux/features/foldersApi'
import { getToken } from '@/utils/auth/getToken'
import { ColumnDef } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

interface IFolder {
  _id: string
  title: string
  subFolders: string[]
  files: string[]
  dataType: string
  createdAt: Date
}

interface IFile {
  _id: string
  title: string
  filePath: string
  size: number
  type: string
  dataType: string
  createdAt: Date
}

interface ITableData {
  _id: string
  title: string
}

export const columns: ColumnDef<ITableData>[] = [
  {
    accessorKey: 'title',
    header: 'Name',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    enableSorting: true,
  },
  {
    accessorKey: 'download',
    header: 'Download',
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
  }, [isSuccess])

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
