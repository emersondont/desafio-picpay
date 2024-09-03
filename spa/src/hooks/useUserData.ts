import { getUserData } from "@/app/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserData() {
  const queryClient = useQueryClient();

  const userDataQuery = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const token = window.localStorage.getItem('token')
      if (!token) { return }
      return await getUserData(token)
    },
  })

  const setQueryUserData = (userData: UserDataResponseDto) => {
    queryClient.setQueryData(['userData'], userData)
  }

  return { userDataQuery, setQueryUserData }
}