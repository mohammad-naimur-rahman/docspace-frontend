'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Typography from '@/components/ui/typography'
import { IFile } from '@/types/data-table-types'
import { useEffect, useState } from 'react'
//@ts-ignore - the package has no type support
import { ExcelRenderer } from 'react-excel-renderer'
import { toast } from 'sonner'

export default function XlsxRenderer({ file }: { file: IFile }) {
  const [header, setheader] = useState([])
  const [cols, setcols] = useState([])

  useEffect(() => {
    fetch(`/${file.filePath}`)
      .then(response => response.blob())
      .then(blob => {
        ExcelRenderer(blob, (err: any, resp: any) => {
          if (err) {
            toast.error(err.message)
            console.log(err)
          } else {
            setheader(resp.rows[0])
            setcols(resp.rows.slice(1))
          }
        })
      })
      .catch(error => {
        toast.error(error)
      })
  }, [file.filePath])

  return (
    <div className='p-5'>
      <Typography variant='h4' className='py-10 text-center px-5'>
        {file?.title}
      </Typography>
      <Table>
        <TableHeader>
          <TableRow>
            {header?.map((col, i) => (
              <TableHead key={i} className='font-semibold'>
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cols?.map((row, i) => (
            <TableRow key={i}>
              {/* @ts-ignore */}
              {row?.map((col, j) => (
                <TableCell key={j}>{col}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
