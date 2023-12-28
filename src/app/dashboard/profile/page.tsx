import withAuth from '@/utils/auth/withAuth'

function ProfilePage() {
  return (
    <section>
      <h1>Profile</h1>
    </section>
  )
}

export default withAuth(ProfilePage)
