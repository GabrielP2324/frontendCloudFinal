import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${backendUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          })
          
          const data = await response.json()
          
          if (response.ok && data) {
            return {
              id: data.id,
              email: data.email,
              token: data.token
            }
          }
          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/email',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.accessToken = token.accessToken
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)
