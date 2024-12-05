import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Mocked user for testing
const MOCK_USER = {
  id: '1',
  email: 'email@email.com',
  password: 'S3cur3P@ssw0rd!'  // In a real app, this would be hashed
}

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
          // Mock authentication
          if (credentials.email === MOCK_USER.email && credentials.password === MOCK_USER.password) {
            return {
              id: MOCK_USER.id,
              email: MOCK_USER.email,
              token: 'mock_jwt_token'
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
