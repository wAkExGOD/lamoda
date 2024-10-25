import { Input, Label } from "@/components/ui"
import { ProductFilters } from "@/types"
import { memo } from "react"

export type PriceFilterProps = {
  onMinPriceChange: (price: ProductFilters["minPrice"]) => void
  onMaxPriceChange: (price: ProductFilters["maxPrice"]) => void
  minPrice: ProductFilters["minPrice"]
  maxPrice: ProductFilters["maxPrice"]
}

const PriceFilterComponent: React.FC<PriceFilterProps> = ({
  onMinPriceChange,
  onMaxPriceChange,
  minPrice,
  maxPrice,
}) => {
  const handleChangePrice = (type: "min" | "max") => {
    return (e: React.FormEvent<HTMLInputElement>) => {
      const number = +e.currentTarget.value

      if (!Number.isFinite(number)) {
        return
      }

      if (type === "min") {
        onMinPriceChange(number)
      } else {
        onMaxPriceChange(number)
      }
    }
  }

  return (
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
  )
}

export const PriceFilter = memo(PriceFilterComponent)
