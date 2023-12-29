'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import useDebounce from '@/hooks/useDebounce'
import { useGetFilesQuery } from '@/redux/features/filesApi'
import { IFile } from '@/types/data-table-types'
import { getToken } from '@/utils/auth/getToken'
import { formatDate } from '@/utils/formatDate'
import { AlignRight, Search } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import FileTypeIcon from '../../files/file-type-icon'
import ThemeSwitcher from './theme-switcher'

interface Props {
  mobileNavOpen: boolean
  setmobileNavOpen: Dispatch<SetStateAction<boolean>>
}

export default function TopNav({ mobileNavOpen, setmobileNavOpen }: Props) {
  const [value, setValue] = useState('')

  const search = useDebounce(value, 1000)

  const { data } = useGetFilesQuery({ search, token: getToken() })
  return (
    <nav className='fixed top-0 left-0 lg:left-[255px] w-full lg:w-[calc(100%_-_255px)] h-16 flex items-center justify-between px-6'>
      <div className='rounded-full border border-muted-foreground border-opacity-50 flex items-center gap-3 p-2'>
        <Search />
        <input
          placeholder='Type to search'
          className='border-none outline-none bg-transparent w-96'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>

      {data?.data?.length > 0 ? (
        <Table className='fixed left-0 lg:left-[255px] bg-primary-foreground top-[80px] z-20 w-full min-h-20 max-w-[900px]'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Name</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((file: IFile) => (
              <TableRow key={file?._id}>
                <TableCell className='font-medium flex items-center gap-2'>
                  <FileTypeIcon type={file?.type} />
                  <p>{file?.title}</p>
                </TableCell>
                <TableCell>{formatDate(file?.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}

      <div className='flex items-center gap-3'>
        <ThemeSwitcher />
        <AlignRight
          className='cursor-pointer lg:hidden inline-block'
          onClick={() => setmobileNavOpen(!mobileNavOpen)}
        />
      </div>
    </nav>
  )
}
