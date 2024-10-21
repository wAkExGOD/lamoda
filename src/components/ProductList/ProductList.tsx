import { useProducts } from "@/contexts"
import { ProductItem } from "../ProductItem/ProductItem"

export const ProductList = () => {
  const { filteredProducts } = useProducts()

  if (!filteredProducts.length) {
    return (
      <p className="text-center text-red-400">
        No products found matching these filters
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} data={product} />
      ))}
    </div>
  )
}
