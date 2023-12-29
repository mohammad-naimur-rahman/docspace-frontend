import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { IUpdateIdData, IUser } from '@/types/user'
import { getToken } from '@/utils/auth/getToken'
import { FileSignature, Pen, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  name: string
  isLoading: boolean
  updateProfile: (payload: IUpdateIdData<IUser>) => void
}

export default function Name({ isLoading, name, updateProfile }: Props) {
  const [updatedName, setupdatedName] = useState(name)
  const [editMode, seteditMode] = useState(false)

  useEffect(() => {
    setupdatedName(name)
  }, [name])

  const handleUpdateName = () => {
    seteditMode(false)
    updateProfile({ payload: { fullName: updatedName }, token: getToken() })
  }

  if (isLoading) {
    return <Skeleton className='my-2 w-64 h-10' />
  }

  return (
    <div className='flex items-center'>
      {editMode ? (
        <div className='flex items-center gap-3 py-5'>
          <Input placeholder='Edit your Name' value={updatedName} onChange={e => setupdatedName(e.target.value)} />
          <Button onClick={handleUpdateName}>
            <FileSignature className='mr-2' />
            Update
          </Button>
          <X className='w-10 h-10 cursor-pointer' onClick={() => seteditMode(false)} />
        </div>
      ) : (
        <div className='flex items-center'>
          <h2 className='py-2 text-4xl'>{name}</h2>
          <Pen className='w-5 h-5 mt-3 ml-3.5 text-primary cursor-pointer' onClick={() => seteditMode(prev => !prev)} />
        </div>
      )}
    </div>
  )
}
