import { useUserData } from "@/hooks/useUserData"
import FilterLayout from "./filterLayout"
import { useState } from "react"
import { FilterLabel, FilterType } from "@/types"

type FiltersProps = {

}

const filtersLabels: FilterLabel[] = [
  {
    label: 'Todas as Transações',
    value: 'all'
  },
  {
    label: 'Período',
    value: 'period',
    options: [
      { value: '7days', label: '7 dias' },
      { value: '15days', label: '15 dias' },
      { value: '30days', label: '30 dias' },
      { value: '90days', label: '90 dias' },
    ]
  },
  {
    label: 'Tipo',
    value: 'type',
    options: [
      { value: 'payee', label: 'Recebimento' },
      { value: 'debit', label: 'Débito' },
    ]
  }

]

export default function Filters(props: FiltersProps) {
  const { filters, setTransfersFilter } = useUserData()
  const [selected, setSelected] = useState<FilterType>("all")

  return (
    <div className="flex gap-3">
      {
        filtersLabels.map(filter => (
          <FilterLayout
            key={filter.value}
            value={filter.value}
            setSelect={setSelected}
            options={filter.options}
            selected={filter.value === selected}
          >
            {filter.label}
          </FilterLayout>
        ))
      }
    </div>
  )
}