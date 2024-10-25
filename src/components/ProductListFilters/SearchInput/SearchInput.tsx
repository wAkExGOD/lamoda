import { Input } from "@/components/ui"
import { ProductFilters } from "@/types"
import { memo } from "react"

export type SearchInputProps = {
  onChange: (searchValue: ProductFilters["searchValue"]) => void
  searchValue: ProductFilters["searchValue"]
}

const SearchInputComponent: React.FC<SearchInputProps> = ({
  searchValue,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <Input
      value={searchValue}
      onChange={handleChange}
      placeholder="Search product"
    />
  )
}

export const SearchInput = memo(SearchInputComponent)
