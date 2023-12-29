'use client'

import defaultAvatar from '@/assets/default-avatar.png'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { IUpdateIdData, IUser } from '@/types/user'
import { getToken } from '@/utils/auth/getToken'
import { imageUploader } from '@/utils/form/image-uploader'
import { Camera } from 'lucide-react'
import { ChangeEvent, useRef } from 'react'
import { toast } from 'sonner'

interface Props {
  isLoading: boolean
  userData: IUser
  updateProfile: (payload: IUpdateIdData<IUser>) => void
}

export default function ProfileImage({ isLoading, userData, updateProfile }: Props) {
  const uploadButtonRef = useRef(null)
  const handleUpdateProfilePicture = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault()
    try {
      const imageInfo = await imageUploader(e)
      updateProfile({
        payload: {
          profilePicture: imageInfo,
        },
        token: getToken(),
      })
    } catch (err) {
      toast.error('Image upload failed!')
    }
  }

  if (isLoading) {
    return <Skeleton className='w-36 h-36 rounded-full overflow-hidden mb-5 mt-10' />
  }

  return (
    <div className='w-36 h-36 rounded-full overflow-hidden mb-5 mt-10'>
      <span className='relative w-full h-full inline-block group border rounded-full'>
        {userData?.profilePicture ? (
          <Img
            src={userData.profilePicture}
            alt={userData.fullName}
            className='w-full h-full aspect-square object-cover'
            activePlaceholder={false}
            sizes='150px'
          />
        ) : (
          <Img src={defaultAvatar} alt={userData?.fullName} />
        )}
        <button
          type='button'
          className='absolute bottom-0 left-0 w-full -mb-1 pb-3 pt-2 flex items-center justify-center bg-primary text-slate-100 gap-1.5 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity'
          onClick={() => {
            if (uploadButtonRef.current) {
              ;(uploadButtonRef.current as HTMLInputElement).click()
            }
          }}>
          <p className='text-sm'>{userData?.profilePicture ? 'Update' : 'Upload'}</p>
          <Camera className='w-4 h-4' />
        </button>
        <input
          type='file'
          accept='image/*'
          className='hidden'
          ref={uploadButtonRef}
          onChange={handleUpdateProfilePicture}
        />
      </span>
    </div>
  )
}
