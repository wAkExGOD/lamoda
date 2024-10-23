import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button, Checkbox, Input, Label } from "../ui"
import { useDebounce } from "@/helpers"
import { COLORS, SORTINGS } from "@/constants"
import { Color, Sorting } from "@/types"
import { useProducts } from "@/contexts"
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons"

type ProductListFiltersProps = {
  searchClassName: string
  filtersClassName: string
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

export const ProductListFilters: React.FC<ProductListFiltersProps> = (
  props
) => {
  const { searchClassName, filtersClassName } = props
  const { updateFilters, filteredProducts, filters } = useProducts()

  const [searchValue, setSearchValue] = useState(filters.searchValue)
  const [colors, setColors] = useState(filters.colors)
  const [minPrice, setMinPrice] = useState(filters.minPrice)
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice)
  const [sorting, setSorting] = useState(filters.sorting)

  const debouncedSearch = useDebounce(searchValue)
  const debouncedMinPrice = useDebounce(minPrice)
  const debouncedMaxPrice = useDebounce(maxPrice)

  const handleChangePrice = (type: "min" | "max") => {
    return (e: React.FormEvent<HTMLInputElement>) => {
      const number = +e.currentTarget.value

      if (!Number.isFinite(number)) {
        return
      }

      if (type === "min") {
        setMinPrice(number)
      } else {
        setMaxPrice(number)
      }
    }
  }
  
  const handleChangeColor = (color: Color) => {
    setColors((prevColors) => ({ ...prevColors, [color]: !prevColors[color] }))
  }

  useEffect(() => {
    updateFilters({
      searchValue: debouncedSearch,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,
      sorting,
      colors,
    })
  }, [
    updateFilters,
    debouncedSearch,
    debouncedMinPrice,
    debouncedMaxPrice,
    sorting,
    colors,
  ])

  return (
    <>
      <div className={cn(searchClassName, "flex flex-col gap-4 xl:flex-row")}>
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
              className="flex gap-2 pl-3.5"
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
                <label className="text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  {color}
                </label>
                <i
                  className="w-3 h-3 ml-auto rounded-sm opacity-40"
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="grid w-full items-center gap-3 p-3 rounded-md border">
          <Label>Price</Label>
          <div className="flex flex-col gap-2">
            <Label className="text-xs opacity-75" htmlFor="minPrice">
              From
            </Label>
            <Input
              value={minPrice}
              id="minPrice"
              placeholder="From"
              onChange={handleChangePrice("min")}
            />
            <Label className="text-xs opacity-75" htmlFor="maxPrice">
              To
            </Label>
            <Input
              value={maxPrice}
              id="maxPrice"
              placeholder="To"
              onChange={handleChangePrice("max")}
            />
          </div>
        </div>
        <p className="text-secondary">
          {filteredProducts.length} products found
        </p>
      </div>
    </>
  )
}
