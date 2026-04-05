
import type { Food } from "./Food"

export interface Category {
  id: number
  name: string
  foods?: Food[]
}