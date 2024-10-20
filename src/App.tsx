import { useEffect, useState } from "react"
import { Separator } from "@/components/ui"
import { ProductListFilters, ProductList } from "@/components"
import styles from "./App.module.css"
import { Color, Product, Sorting } from "./types"
import { SORTINGS } from "./constants"
import { getFilteredProducts } from "./helpers"

export type ColorsObject = {
  [key in Color]: boolean
}

export type ProductFilters = {
  searchValue?: string
  colors?: ColorsObject
  minPrice?: number
  maxPrice?: number
  sorting?: Sorting
}

export const App = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const [searchValue, setSearchValue] =
    useState<ProductFilters["searchValue"]>("")
  const [colors, setColors] = useState<ProductFilters["colors"]>()
  const [minPrice, setMinPrice] = useState<ProductFilters["minPrice"]>()
  const [maxPrice, setMaxPrice] = useState<ProductFilters["maxPrice"]>()
  const [sorting, setSorting] = useState<ProductFilters["sorting"]>(
    SORTINGS.firstPopular
  )

  const handleFiltersChange = (filters: ProductFilters) => {
    setSearchValue(filters.searchValue)
    setColors(filters.colors)
    setMinPrice(filters.minPrice)
    setMaxPrice(filters.maxPrice)
    setSorting(filters.sorting)
  }

  useEffect(() => {
    const filteredProducts = getFilteredProducts({
      searchValue,
      colors,
      minPrice,
      maxPrice,
      sorting,
    })

    setFilteredProducts(filteredProducts)
  }, [searchValue, colors, minPrice, maxPrice, sorting])

  useEffect(() => {
    // Setting shadcn/ui theme:
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add("dark")
  }, [])

  return (
    <div className="flex flex-col p-6 gap-8 w-full mx-auto">
      <h1 className="text-3xl font-bold text-center">Lamoda</h1>

      <Separator />

      <div className={styles.wrapper}>
        <ProductListFilters
          searchClassName={styles.search}
          filtersClassName={styles.filters}
          onFiltersChange={handleFiltersChange}
        />

        <div className={styles.items}>
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
