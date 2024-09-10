import FilterLayout from "./filterLayout"
import { useState } from "react"
import { FilterLabel, FilterType } from "@/types"
import { useUserData } from "@/hooks/useUserData"

type FiltersProps = {

}

export default function Filters(props: FiltersProps) {
  const [selecteds, setSelecteds] = useState<{ type: FilterType, optionKey: string }[]>([{
    type: "all",
    optionKey: "all"
  }])
  const { filters, setTransfersFilter } = useUserData()

  const handleApplyFilterAll = () => {
    setTransfersFilter({
      type: undefined,
      startDate: undefined,
      endDate: undefined,
    })
  }

  const handleApplyFilterXdays = (days: number) => {
    setTransfersFilter({
      type: filters?.type,
      startDate: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    })
  }

  const handleApplyFilterParticipant = (type: 'payer' | 'payee') => {
    setTransfersFilter({
      type: type,
      startDate: filters?.startDate,
      endDate: filters?.endDate,
    })
  }

  const handleApplyFilter = (type: FilterType, optionKey: string, applyFilter: () => void) => {
    setSelecteds((oldSelecteds) => {

      if (type === "all") {
        return [{
          type: type,
          optionKey: optionKey
        }];
      }
      let newSelecteds = oldSelecteds.filter((filter) => filter.type !== "all");

      //se exister algum com o mesmo type, substitui o optionKey pelo novo, caso contrário, adiciona
      if (oldSelecteds.some((filter) => filter.type === type)) {
        newSelecteds = newSelecteds.map((filter) => {
          if (filter.type === type) {
            return {
              type,
              optionKey: optionKey
            }
          }
          return filter
        })
      }
      else {
        newSelecteds.push({
          type: type,
          optionKey: optionKey
        })
      }

      return newSelecteds;
    });

    applyFilter()
  }

  const filtersLabels: FilterLabel[] = [
    {
      label: 'Todas as Transações',
      type: 'all',
      applyThisFilter: () => handleApplyFilter("all", "all", handleApplyFilterAll),
    },
    {
      label: 'Período',
      type: 'period',
      options: [
        {
          key: '7days', label: '7 dias', applyThisFilter: () =>
            handleApplyFilter("period", "7days", () => handleApplyFilterXdays(7))
        },
        {
          key: '15days', label: '15 dias', applyThisFilter: () =>
            handleApplyFilter("period", "15days", () => handleApplyFilterXdays(15))
        },
        {
          key: '30days', label: '30 dias', applyThisFilter: () =>
            handleApplyFilter("period", "30days", () => handleApplyFilterXdays(30))
        },
      ]
    },
    {
      label: 'Tipo',
      type: 'participant',
      options: [
        {
          key: 'payee', label: 'Transação recebida', applyThisFilter: () =>
            handleApplyFilter("participant", "payee", () => handleApplyFilterParticipant("payee"))
        },
        {
          key: 'payer', label: 'Transação enviada', applyThisFilter: () =>
            handleApplyFilter("participant", "payer", () => handleApplyFilterParticipant("payer"))
        },
      ]
    }
  ]

  return (
    <div className="flex gap-3 overflow-x-auto">
      {
        filtersLabels.map(filter => (
          <FilterLayout
            key={filter.type}
            filter={filter}
            selecteds={selecteds}
          />
        ))
      }
    </div>
  )
}