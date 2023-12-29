'use client'

import ProfileImage from '@/components/pages/dashboard/profile/profile-image'
import Name from '@/components/pages/dashboard/profile/profile-name'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/features/usersApi'
import { IUser } from '@/types/user'
import { getToken } from '@/utils/auth/getToken'
import withAuth from '@/utils/auth/withAuth'

function ProfilePage() {
  const { isLoading, data } = useGetProfileQuery(getToken())
  const [updateProfile] = useUpdateProfileMutation()
  const profile: IUser = data?.data
  return (
    <section className='p-5 flex flex-col items-center justify-center'>
      <ProfileImage isLoading={isLoading} updateProfile={updateProfile} userData={profile} />
      <Name isLoading={isLoading} name={profile?.fullName} updateProfile={updateProfile} />
      {isLoading ? <Skeleton className='my-3 w-80 h-6' /> : <p className='text-muted-foreground'>{profile?.email}</p>}
      {profile?.role === 'admin' ? <p className='pt-2'>Role: Admin</p> : null}
    </section>
  )
}

export default withAuth(ProfilePage)
