import { getTransfers, getUserData } from "@/app/actions";
import { TransfersFilter } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export function useUserData() {
  const queryClient = useQueryClient();

  const userDataQuery = useQuery({
    queryKey: ['userData'],
    queryFn: async () => { return await getUserData() },
    refetchOnMount: false,
  })

  const setQueryUserData = (userData: UserDataResponseDto) => {
    queryClient.setQueryData(['userData'], userData)
  }

  const { data: filters } = useQuery({
    queryKey: ['transfersFilter'],
    queryFn: () => {

      const filter: TransfersFilter = {
        type: undefined,
        startDate: undefined,
        endDate: undefined,
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
    refetchOnMount: false,
  })

  const unshiftTransfers = (transfer: Transfer) => {
    const {data: transfers} = transfersQuery
    const newTransfers = transfers ? [transfer, ...transfers] : [transfer]
    
    queryClient.setQueryData(['transfers', filters], newTransfers)
  }

  const setTransfersFilter = (filter: TransfersFilter) => {
    queryClient.setQueryData(['transfersFilter'], filter)
  }

  return { userDataQuery, setQueryUserData, transfersQuery, filters, setTransfersFilter, unshiftTransfers }
}