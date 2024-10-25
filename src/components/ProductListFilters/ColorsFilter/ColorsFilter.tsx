import { Checkbox, Label } from "@/components/ui"
import { COLORS } from "@/constants"
import { Color, ColorsObject } from "@/types"
import { memo } from "react"

export type ColorsFilterProps = {
  onChange: (color: Color) => void
  colors: ColorsObject
}

const ColorsFilterComponent: React.FC<ColorsFilterProps> = ({
  onChange,
  colors,
}) => {
  return (
    <div className="grid w-full items-center gap-3 p-3 rounded-md border">
      <Label>Color</Label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-1">
        {COLORS.map((color) => (
          <div
            key={color}
            className="flex items-center space-x-2"
            onClick={() => onChange(color)}
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
  )
}

export const ColorsFilter = memo(ColorsFilterComponent)
