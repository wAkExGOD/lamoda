import { Product } from "@/types"
import { ProductItem } from "../ProductItem/ProductItem"

type ProductListProps = {
  products: Product[]
}

export const ProductList: React.FC<ProductListProps> = (props) => {
  const { products } = props

  if (!products.length) {
    return (
      <p className="text-center text-secondary">
        No products found matching these filters
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductItem key={product.id} data={product} />
      ))}
    </div>
  )
}
