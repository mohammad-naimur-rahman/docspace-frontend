'use client'

import { DataTable } from '@/components/pages/dashboard/files/data-table'
import FilePreviewer from '@/components/pages/dashboard/files/file-previewer'
import FileUpdater from '@/components/pages/dashboard/files/file-updater'
import FileUploader from '@/components/pages/dashboard/files/file-uploader'
import FolderUpdater from '@/components/pages/dashboard/files/folder-updater'
import NewFolderCreator from '@/components/pages/dashboard/files/new-folder-creator'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useGetFolderQuery } from '@/redux/features/foldersApi'
import { IFile, IFolder, ITableData } from '@/types/data-table-types'
import { getToken } from '@/utils/auth/getToken'
import { formatDate } from '@/utils/formatDate'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, Download, Folder } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function FilesPage() {
  // FIXME: backward folder tree
  const [prevFolder, setprevFolder] = useState<string | null>(null)
  const [currentFolder, setcurrentFolder] = useState<string>('root')
  const [parentFolder, setparentFolder] = useState<string | null>(null)
  const { isFetching, isSuccess, data } = useGetFolderQuery({ id: currentFolder, token: getToken() })
  const [tableData, settableData] = useState<ITableData[]>([])

  const folders = data?.data?.subFolders?.map((el: IFolder) => {
    return { ...el, dataType: 'folder' }
  })
  const files = data?.data?.files?.map((el: IFile) => {
    return { ...el, dataType: 'file' }
  })

  useEffect(() => {
    if (isSuccess && folders && files) {
      settableData([...folders, ...files])
    }
  }, [isSuccess, isFetching, prevFolder])

  console.log(prevFolder, currentFolder, parentFolder)

  const columns: ColumnDef<ITableData>[] = [
    {
      accessorKey: 'title',
      header: 'Name',
      enableSorting: true,
      cell: ({ row }) => {
        if (row.original.dataType === 'file') {
          return <FilePreviewer file={row.original as IFile} />
        } else {
          return (
            <p
              className='flex items-center gap-2 font-semibold cursor-pointer'
              onClick={() => {
                setprevFolder(currentFolder)
                setcurrentFolder(row.original._id)
                setparentFolder(prevFolder)
              }}>
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
      cell: ({ row }) => {
        return <p>{formatDate(row.original.createdAt)}</p>
      },
    },
    {
      accessorKey: 'Size / files',
      header: 'Size / Files',
      cell: ({ row }) => {
        if (row.original.dataType === 'file') return <p>{row.original.size} MB</p>
        else return <p>{row?.original?.subFolders?.length! + row?.original?.files?.length!}</p>
      },
    },
    {
      accessorKey: 'download',
      header: 'Download',
      cell: ({ row }) => {
        if (row.original.dataType === 'file')
          return (
            <a href={`/${row.original.filePath}`} download>
              <Button size='sm'>
                <Download className='mr-2 w-4 h-4' /> Download
              </Button>
            </a>
          )
      },
    },
    {
      accessorKey: 'edit',
      header: 'Edit',
      cell: ({ row }) => {
        if (row.original.dataType === 'file') return <FileUpdater file={row.original as IFile} />
        else return <FolderUpdater folder={row.original as IFolder} />
      },
    },
    {
      accessorKey: 'delete',
      header: 'Delete',
    },
  ]

  return (
    <section className='p-5'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex flex-wrap items-center gap-5'>
          <Typography variant='h2'>Documents</Typography>
          <NewFolderCreator currentFolder={currentFolder} />
        </div>
        <FileUploader currentFolder={currentFolder} />
      </div>

      <div className='pt-3 space-x-2'>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full'
          disabled={prevFolder === null}
          onClick={() => {
            setcurrentFolder(prevFolder || 'root')
            setprevFolder(parentFolder)
            //setparentFolder(currentFolder || null)
          }}>
          <ChevronLeft className='w-7 h-7' />
        </Button>
        <Button variant='outline' size='icon' className='rounded-full'>
          <ChevronRight className='w-7 h-7' />
        </Button>
      </div>

      <div className='pt-5'>
        {isFetching ? (
          <div className='flex flex-col gap-2'>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <Skeleton key={i} className='w-full h-10' />
            ))}
          </div>
        ) : null}
        {!isFetching && tableData ? <DataTable columns={columns} data={tableData} /> : null}
      </div>
    </section>
  )
}
