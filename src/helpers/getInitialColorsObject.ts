import { COLORS } from "@/constants"
import { ColorsObject } from "@/types"

export const getInitialColorsObject = (): ColorsObject => {
  const colors: Partial<ColorsObject> = {}

  for (let i = 0; i < COLORS.length; i++) {
    colors[COLORS[i]] = false
  }

  return colors as ColorsObject
}
