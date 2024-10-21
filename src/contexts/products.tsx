import { MAX_PRODUCT_PRICE, MIN_PRODUCT_PRICE, SORTINGS } from "@/constants"
import {
  generateProducts,
  getInitialColorsObject,
  isSubstring,
} from "@/helpers"
import { Color, ColorsObject, Product, ProductFilters } from "@/types"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

export type Notification = {
  text: string
  status?: "success" | "error"
  autoClose?: number
}

export type ProductsContextType = {
  filteredProducts: Product[]
  filters: ProductFilters
  updateFilters: (filters: ProductFilters) => void
}

const ProductsContext = createContext<ProductsContextType | null>(null)

const initialProducts = generateProducts(50)

const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

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

  const updateFilters = (filters: ProductFilters) => {
    setSearchValue(filters.searchValue)
    setColors(filters.colors as ColorsObject)
    setMinPrice(filters.minPrice)
    setMaxPrice(filters.maxPrice)
    setSorting(filters.sorting)
  }

  useEffect(() => {
    let filteredProducts = [...initialProducts]

    if (searchValue) {
      console.log({ searchValue })
      filteredProducts = filteredProducts.filter((product) => {
        const { name, description } = product

        return (
          isSubstring(name, searchValue) ||
          isSubstring(description, searchValue)
        )
      })
    }

    if (colors) {
      if (
        Object.keys(colors).some((color) => colors[color as Color] === true)
      ) {
        filteredProducts = filteredProducts.filter(
          (product) => colors[product.color as Color] === true
        )
      }
    }

    if (minPrice || maxPrice) {
      filteredProducts = filteredProducts.filter((product) => {
        const isValidAtMinimum = minPrice ? product.price >= minPrice : true
        const isValidAtMaximum = maxPrice ? product.price <= maxPrice : true

        return isValidAtMinimum && isValidAtMaximum
      })
    }

    if (sorting) {
      let sortFunction: (a: Product, b: Product) => number

      switch (sorting) {
        case SORTINGS.firstCheap:
          sortFunction = (a, b) => a.price - b.price
          break
        case SORTINGS.firstExpensive:
          sortFunction = (a, b) => b.price - a.price
          break
        case SORTINGS.firstPopular:
          sortFunction = (a, b) => b.rating - a.rating
          break
      }

      filteredProducts.sort((a, b) => sortFunction(a, b))
    }

    setFilteredProducts(filteredProducts)
  }, [searchValue, colors, minPrice, maxPrice, sorting])

  return (
    <ProductsContext.Provider
      value={{
        filters: {
          searchValue,
          colors,
          minPrice,
          maxPrice,
          sorting,
        },
        filteredProducts,
        updateFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

const useProducts = () => useContext(ProductsContext) as ProductsContextType

// eslint-disable-next-line react-refresh/only-export-components
export { ProductsProvider, useProducts }
