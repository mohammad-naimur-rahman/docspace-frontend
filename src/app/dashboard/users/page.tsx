'use client'

import defaultAvatar from '@/assets/default-avatar.png'
import { DataTableColumnHeader } from '@/components/pages/dashboard/files/data-table/column-header'
import { DataTable } from '@/components/pages/dashboard/users/data-table/table'
import { Button } from '@/components/ui/button'
import ConfirmationPrompt from '@/components/ui/confirmation-prompt'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useGetAllUsersQuery, useMakeAdminMutation } from '@/redux/features/usersApi'
import { IUser } from '@/types/user'
import { getToken } from '@/utils/auth/getToken'
import withAuth from '@/utils/auth/withAuth'
import { ColumnDef } from '@tanstack/react-table'
import { ShieldPlus } from 'lucide-react'
import { useState } from 'react'

function UsersPage() {
  const [makeAdmin] = useMakeAdminMutation()
  const { isLoading, data } = useGetAllUsersQuery(getToken())
  const [showPrompt, setshowPrompt] = useState(false)
  const [id, setid] = useState<string | null>(null)

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'fullName',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-full overflow-hidden'>
              {row?.original?.profilePicture ? (
                <Img
                  src={row?.original.profilePicture}
                  alt={row?.original.fullName}
                  className='w-full h-full aspect-square object-cover'
                  activePlaceholder={false}
                  sizes='50px'
                />
              ) : (
                <Img src={defaultAvatar} alt={row?.original?.fullName} />
              )}
            </div>
            <p>{row?.original?.fullName}</p>
          </div>
        )
      },
      enableSorting: true,
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
      cell: ({ row }) => {
        return <>{row?.original?.role === 'admin' ? <p className='text-green-600'>Admin</p> : <p>User</p>}</>
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: () => {
        return (
          <div>
            <span className='py-1 px-2 text-xs text-green-900 bg-green-300 rounded-full'>Active</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'make admin',
      header: 'Make Admin',
      cell: ({ row }) => {
        if (row?.original?.role === 'user')
          return (
            <Button
              size='sm'
              onClick={() => {
                setshowPrompt(true)
                setid(row.original._id)
              }}>
              <ShieldPlus className='mr-2 w-4 h-4' /> Make Admin
            </Button>
          )
      },
    },
  ]

  return (
    <section className='p-5'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <Typography variant='h2'>Documents</Typography>
      </div>

      <div className='pt-5'>
        {isLoading ? (
          <div className='flex flex-col gap-2'>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <Skeleton key={i} className='w-full h-10' />
            ))}
          </div>
        ) : null}
        {!isLoading && data?.data ? <DataTable columns={columns} data={data?.data} /> : null}
      </div>

      {showPrompt ? (
        <ConfirmationPrompt
          open={showPrompt}
          onOpenChange={() => setshowPrompt(false)}
          cb={() => makeAdmin({ id, token: getToken() })}
          message='Are you sure to make this user an Admin?'
        />
      ) : null}
    </section>
  )
}

export default withAuth(UsersPage)
