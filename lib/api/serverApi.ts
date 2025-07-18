import { cookies } from "next/headers"
import { nextServer } from "./api"
import { ServerBoolResponse, User } from "@/lib/api/clientApi"

export const checkServerSession = async () => {
  const cookieData = await cookies()
  const response = await nextServer<ServerBoolResponse>(`/auth/session`, {
    headers: { Cookie: cookieData.toString() },
  })
  return response
}

export const getServerMe = async (): Promise<User> => {
  const cookieData = await cookies()
  const { data } = await nextServer.get(`/users/me`, {
    headers: { Cookie: cookieData.toString() },
  })
  return data
}