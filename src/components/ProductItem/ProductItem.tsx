import { Product } from "@/types"
import { memo } from "react"

type ProductItemProps = {
  data: Product
}

const PROPERTY_LABELS = {
  color: "Color",
  price: "Price",
  rating: "Rating",
}

type Property = keyof typeof PROPERTY_LABELS

export const ProductItem = memo(function ProductItem({
  data: { name, description, color, price, rating, imageUrl },
}: ProductItemProps) {
  const properties: Record<Property, string | number> = {
    price,
    color,
    rating,
  }

  return (
    <div className="flex gap-4 border rounded-2xl p-4">
      <div className="max-w-[40%]">
        <img src={imageUrl} alt={`${name} image`} className="rounded-xl" />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p>{description}</p>
        <ul>
          {Object.keys(properties).map((propKey) => (
            <li key={propKey} className="flex gap-1.5">
              <span>{PROPERTY_LABELS[propKey as Property]}:</span>
              <span className="text-slate-500">
                {properties[propKey as Property]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})
