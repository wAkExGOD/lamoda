import { useEffect } from "react"
import { ProductListFilters, ProductList } from "@/components"
import { ProductsProvider } from "./contexts/products"
import styles from "./App.module.css"

export const App = () => {
  useEffect(() => {
    // Setting shadcn/ui theme:
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add("dark")
  }, [])

  return (
    <ProductsProvider>
      <div className="flex flex-col p-6 gap-8 w-full mx-auto">
        <h1 className="text-3xl font-bold text-center">Lamoda</h1>

        <div className={styles.wrapper}>
          <ProductListFilters
            searchClassName={styles.search}
            filtersClassName={styles.filters}
          />

          <div className={styles.items}>
            <ProductList />
          </div>
        </div>
      </div>
    </ProductsProvider>
  )
}
