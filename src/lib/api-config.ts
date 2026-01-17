const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}

export const API_BASE_URL = getBaseUrl()

export const apiPath = (path: string) => {
  return path.startsWith("http") ? path : `${API_BASE_URL}${path}`
}
