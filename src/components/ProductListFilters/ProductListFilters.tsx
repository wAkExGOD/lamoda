import { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button, Checkbox, Input, Label } from "../ui"
import { useDebounce } from "@/helpers"
import { COLORS, SORTINGS } from "@/constants"
import { Color, ProductFilters, Sorting } from "@/types"
import { useProducts } from "@/contexts"
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons"
import { SortFilter } from "./SortFilter/SortFilter"
import { SearchInput } from "./SearchInput/SearchInput"
import { ColorsFilter } from "./ColorsFilter/ColorsFilter"
import { PriceFilter } from "./PriceFilter/PriceFilter"

type ProductListFiltersProps = {
  searchClassName: string
  filtersClassName: string
}

export const ProductListFilters: React.FC<ProductListFiltersProps> = (
  props
) => {
  const { searchClassName, filtersClassName } = props
  const { setFilterValues, filteredProducts, filterValues } = useProducts()

  const [searchValue, setSearchValue] = useState(filterValues.searchValue)
  const [colors, setColors] = useState(filterValues.colors)
  const [minPrice, setMinPrice] = useState(filterValues.minPrice)
  const [maxPrice, setMaxPrice] = useState(filterValues.maxPrice)
  const [sorting, setSorting] = useState(filterValues.sorting)

  const debouncedSearch = useDebounce(searchValue)
  const debouncedMinPrice = useDebounce(minPrice)
  const debouncedMaxPrice = useDebounce(maxPrice)

  const handleChangeMinPrice = useCallback(
    (price: ProductFilters["minPrice"]) => {
      setMinPrice(price)
    },
    []
  )

  const handleChangeMaxPrice = useCallback(
    (price: ProductFilters["maxPrice"]) => {
      setMaxPrice(price)
    },
    []
  )

  const handleChangeColor = useCallback((color: Color) => {
    setColors((prevColors) => ({ ...prevColors, [color]: !prevColors[color] }))
  }, [])

  const handleChangeSearchValue = useCallback(
    (searchValue: ProductFilters["searchValue"]) => setSearchValue(searchValue),
    []
  )

  const handleChangeSorting = useCallback(
    (label: Sorting) => setSorting(label),
    []
  )

  useEffect(() => {
    setFilterValues({
      searchValue: debouncedSearch,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,
      sorting,
      colors,
    })
  }, [
    setFilterValues,
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    sorting,
    colors,
  ])

  return (
    <>
      <div className={cn(searchClassName, "flex flex-col gap-4 xl:flex-row")}>
        <SearchInput
          onChange={handleChangeSearchValue}
          searchValue={searchValue}
        />
        <SortFilter onChange={handleChangeSorting} sorting={sorting} />
      </div>
      <div className={cn(filtersClassName, "flex flex-col gap-4")}>
        <ColorsFilter onChange={handleChangeColor} colors={colors} />
        <PriceFilter
          onMinPriceChange={handleChangeMinPrice}
          onMaxPriceChange={handleChangeMaxPrice}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
        <p className="text-secondary">
          {filteredProducts.length} products found
        </p>
      </div>
    </>
  )
}
