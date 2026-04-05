import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { CartBar } from "../components/CartBar"
import { getCategories } from "../Api/CategoryApi"

interface Food {
  id: number
  name: string
  price: number
  description?: string
}

interface Category {
  id: number
  name: string
  foods: Food[]
}

function Home() {

  const [categories, setCategories] = useState<Category[]>([])
  const [selectCategory, setSelectCategory] = useState("Todos")

  useEffect(() => {
  getCategories()
    .then((data) => {
      setCategories(data)
    })
    .catch((error) => {
      throw error
    })
}, [])

  const selectedCategory =
    selectCategory === "Todos"
      ? categories
      : categories.filter((c) => c.name === selectCategory)

  return (
    <div>

      <CartBar />

      <button onClick={() => setSelectCategory("Todos")}>
        Todos
      </button>

      {categories.map((cat) => (
        <button key={cat.id} onClick={() => setSelectCategory(cat.name)}>
          {cat.name}
        </button>
      ))}

      {selectedCategory.map((cat) => (
        <div key={cat.id}>
          {cat.foods.map((food) => (
            <ProductCard
              key={food.id}
              id={food.id}
              category={cat.name}
              name={food.name}
              price={food.price}
              description={food.description}
            />
          ))}
        </div>
      ))}

    </div>
  )
}

export default Home