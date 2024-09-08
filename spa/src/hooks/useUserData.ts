import { getTransfers, getUserData } from "@/app/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type TransfersFilter = {
  type: 'payer' | 'payee' | undefined,
  startDate: Date | undefined,
  endDate: Date | undefined,
}

export function useUserData() {
  const queryClient = useQueryClient();

  const userDataQuery = useQuery({
    queryKey: ['userData'],
    queryFn: async () => { return await getUserData() },
  })

  const setQueryUserData = (userData: UserDataResponseDto) => {
    queryClient.setQueryData(['userData'], userData)
  }

  const { data: filters } = useQuery({
    queryKey: ['transfersFilter'],
    queryFn: () => {

      const filter: TransfersFilter = {
        type: "payer",
        startDate: undefined,
        endDate: new Date(),
      }
      return filter
    },
  })

  const transfersQuery = useQuery({
    queryKey: ['transfers', filters],
    queryFn: async () => {
      if (filters) {
        return await getTransfers(filters.type, filters.startDate, filters.endDate)
      }
      
      return await getTransfers()
    },
  })

  const setTransfersFilter = (filter: TransfersFilter) => {
    queryClient.setQueryData(['transfersFilter'], filter)
  }

  return { userDataQuery, setQueryUserData, transfersQuery, filters, setTransfersFilter }
}