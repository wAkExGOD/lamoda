import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button, Checkbox, Input, Label } from "../ui"
import { useDebounce } from "@/helpers"
import { ColorsObject, ProductFilters } from "@/App"
import {
  COLORS,
  MAX_PRODUCT_PRICE,
  MIN_PRODUCT_PRICE,
  SORTING_LABELS,
  SORTINGS,
} from "@/constants"
import { Color, Sorting } from "@/types"

type ProductListFiltersProps = {
  searchClassName: string
  filtersClassName: string
  onFiltersChange: (filters: ProductFilters) => void
}

const getInitialColorsObject = (): ColorsObject => {
  const colors: Partial<ColorsObject> = {}

  for (let i = 0; i < COLORS.length; i++) {
    colors[COLORS[i]] = false
  }

  return colors as ColorsObject
}

export const ProductListFilters: React.FC<ProductListFiltersProps> = (
  props
) => {
  const { searchClassName, filtersClassName, onFiltersChange } = props

  const [searchValue, setSearchValue] =
    useState<ProductFilters["searchValue"]>("")
  const [colors, setColors] = useState<Required<ProductFilters>["colors"]>(
    getInitialColorsObject()
  )
  const [minPrice, setMinPrice] =
    useState<ProductFilters["minPrice"]>(MIN_PRODUCT_PRICE)
  const [maxPrice, setMaxPrice] =
    useState<ProductFilters["maxPrice"]>(MAX_PRODUCT_PRICE)
  const [sorting, setSorting] = useState<ProductFilters["sorting"]>(
    SORTINGS.firstPopular
  )

  const debouncedSearch = useDebounce(searchValue)
  const debouncedSorting = useDebounce(sorting)
  const debouncedMinPrice = useDebounce(minPrice)
  const debouncedMaxPrice = useDebounce(maxPrice)

  const handleChangeColor = (color: Color) => {
    setColors((prevColors) => ({ ...prevColors, [color]: !prevColors[color] }))
  }

  useEffect(() => {
    onFiltersChange({
      searchValue: debouncedSearch,
      sorting: debouncedSorting,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,
      colors,
    })
  }, [
    onFiltersChange,
    debouncedSearch,
    debouncedSorting,
    debouncedMinPrice,
    debouncedMaxPrice,
    colors,
  ])

  return (
    <>
      <div className={cn(searchClassName, "flex flex-col gap-4")}>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search product"
        />
        <div className="flex gap-2">
          {Object.keys(SORTING_LABELS).map((labelKey) => (
            <Button
              key={labelKey}
              onClick={() => setSorting(labelKey as Sorting)}
              variant={sorting === labelKey ? "default" : "outline"}
            >
              {SORTING_LABELS[labelKey as Sorting]}
            </Button>
          ))}
        </div>
      </div>
      <div className={cn(filtersClassName, "flex flex-col gap-4")}>
        <div className="grid w-full items-center gap-3 p-3 rounded-md border">
          <Label>Color</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-1">
            {COLORS.map((color) => (
              <div
                key={color}
                className="flex items-center space-x-2"
                onClick={() => handleChangeColor(color as Color)}
              >
                <Checkbox
                  id={color}
                  checked={colors[color as Color]}
                  className="w-6 h-6"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="grid w-full items-center gap-3 p-3 rounded-md border">
          <Label>Price</Label>
          <div className="flex flex-col gap-2">
            <Input
              value={minPrice}
              placeholder="From"
              onChange={(e) => setMinPrice(+e.target.value)}
            />
            <Input
              value={maxPrice}
              placeholder="To"
              onChange={(e) => setMaxPrice(+e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
