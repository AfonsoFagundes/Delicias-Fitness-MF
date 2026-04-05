
import { useCart } from "./Context/CartContext"


interface Props {
  id: number
  name: string
  description?: string  
  price: number
  category: string
}



const ProductCard = ({id, name, description, price, category}: Props) => {

const { addToCart, removeFromCart, clearCart, cartItemsCount, cartTotal } = useCart()


console.log(cartItemsCount)
console.log(cartTotal)
  

  return (
    <div className="bg-background border border-border p-4 rounded-lg">
        <h4>{category}</h4>
      <h4>{name}</h4>
      <p>{description}</p>
      <p>{price}</p>
      <button onClick={() => addToCart({ id, name, price })} className="">
  Adicionar |
     </button>
       <button onClick={() => removeFromCart(id)}>
  Remover | 
     </button>
       <button onClick={() => clearCart()}>
  Limpar carrinho |
     </button>
    
    </div>
  )
}


export default ProductCard