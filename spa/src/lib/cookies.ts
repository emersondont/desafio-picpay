import { cookies } from 'next/headers'

const accessToken = 'access_token'
const userType = 'user_type'

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

export const getUserType = () => {
  const cookieStore = cookies()
  return cookieStore.get(userType)
}

export const setUserType = (type: string) => {
  const cookieStore = cookies()
  cookieStore.set(userType, type)
}

export const deleteUserType = () => {
  const cookieStore = cookies()
  cookieStore.delete(userType)
}
