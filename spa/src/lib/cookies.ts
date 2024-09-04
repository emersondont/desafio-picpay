import { cookies } from 'next/headers'

const accessToken = 'access_token'

export const getAccessToken = () => {
  const cookieStore = cookies()
  return cookieStore.get(accessToken)
}

export const setAccessToken = (token: string) => {
  const cookieStore = cookies()
  cookieStore.set(accessToken, token)
}

export const deleteAccessToken = () => {
  const cookieStore = cookies()
  cookieStore.delete(accessToken)
}
