import { useState, createContext, useContext } from "react";

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  cartItemsCount: number
  cartTotal:  number

}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0
  
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const itemExisted = prev.find((item) => item.id === product.id)

      if (itemExisted) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const item = prev.find((item) => item.id === id)

      if (!item) return prev

      if (item.quantity === 1) {
        return prev.filter((item) => item.id !== id)
      }

      return prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    })
  }

  const clearCart = () => {
    setCart([])
  }

   const cartItemsCount = cart.reduce((total, item) => {
    const quantity = Number(item.quantity) 

    return total + quantity
   },0)

   const cartTotal = cart.reduce((total, item) => {
   
  const price = Number(item.price)
  const quantity = Number(item.quantity)
 console.log( "resultado: ",item)
  return total + (price * quantity)
  
}, 0 )

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartItemsCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}


export default CartContext