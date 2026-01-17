export const API_BASE_URL =
  (typeof window === "undefined" ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL) || ""

export const apiPath = (path: string) => `${API_BASE_URL}${path}`
