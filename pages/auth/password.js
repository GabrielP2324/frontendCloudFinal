import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function PasswordPage() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('loginEmail')
    if (!storedEmail) {
      router.push('/auth/email')
    }
    setEmail(storedEmail)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result.ok) {
      sessionStorage.removeItem('loginEmail')
      router.push('/dashboard')
    } else {
      // Handle error
      alert('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {email}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
