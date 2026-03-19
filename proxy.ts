import createMiddleware from 'next-intl/middleware'
import { routing } from '@/translator/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}