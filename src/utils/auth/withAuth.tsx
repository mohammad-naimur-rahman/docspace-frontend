/* eslint-disable react/display-name */
// Import the dependencies
import { getCookie } from 'cookies-next'
import { redirect, usePathname } from 'next/navigation'

// Define the HOC function
const withAuth = (WrappedComponent: any) => {
  // Return the wrapper component
  return (props: any) => {
    // Get the token and pathname
    const token = getCookie('accessToken')
    const pathname = usePathname()

    // If the token is not present, redirect to the login page
    if (!token) {
      return redirect(`/login?prevPath=${pathname}`)
    }

    // Otherwise, render the wrapped component with the props
    return <WrappedComponent {...props} />
  }
}

// Export the HOC function
export default withAuth
