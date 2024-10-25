import { Button } from "@/components/ui"
import { SORTINGS } from "@/constants"
import { ProductFilters, Sorting } from "@/types"
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons"
import { memo } from "react"

export type SortFilterProps = {
  sorting: ProductFilters["sorting"]
  onChange: (label: Sorting) => void
}

const SORTING_LABELS = {
  [SORTINGS.firstPopular]: (
    <>
      <DoubleArrowDownIcon />
      Popularity
    </>
  ),
  [SORTINGS.firstExpensive]: (
    <>
      <DoubleArrowDownIcon />
      Price
    </>
  ),
  [SORTINGS.firstCheap]: (
    <>
      <DoubleArrowUpIcon />
      Price
    </>
  ),
} as const

const SortFilterComponent: React.FC<SortFilterProps> = ({
  sorting,
  onChange,
}) => {
  return (
    <div className="flex gap-2">
      {Object.keys(SORTING_LABELS).map((labelKey) => (
        <Button
          key={labelKey}
          onClick={() => onChange(labelKey as Sorting)}
          variant={sorting === labelKey ? "default" : "outline"}
          className="flex gap-2 pl-3.5"
        >
          {SORTING_LABELS[labelKey as Sorting]}
        </Button>
      ))}
    </div>
  )
}

export const SortFilter = memo(SortFilterComponent)
