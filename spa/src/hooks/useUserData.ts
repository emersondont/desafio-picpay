import { getTransfers, getUserData } from "@/app/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserData() {
  const queryClient = useQueryClient();

  const userDataQuery = useQuery({
    queryKey: ['userData'],
    queryFn: async () => { return await getUserData() },
  })

  const setQueryUserData = (userData: UserDataResponseDto) => {
    queryClient.setQueryData(['userData'], userData)
  }

  const transfersQuery = useQuery({
    queryKey: ['transfers'],
    queryFn: async () => { return await getTransfers() },
  })

  return { userDataQuery, setQueryUserData, transfersQuery }
}