import { useCart } from "./Context/CartContext";

interface Props {
  id: number;
  name: string;
  price: number;
  description?: string;
  category: string;
}

const ProductCard = ({ id, name, price }: Props) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="flex items-center justify-between mt-auto pt-2">
      {quantity === 0 ? (
        <button
          onClick={() => addToCart({ id, name, price })}
          className="w-full bg-[#2E7D1E] hover:bg-[#3a9a25] text-white text-[12px] font-bold py-2.5 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>+</span> Adicionar
        </button>
      ) : (
        <div className="flex items-center justify-between w-full bg-gray-100 rounded-xl p-1 border border-gray-200">
          <button
            onClick={() => removeFromCart(id)}
            className="w-8 h-8 flex items-center justify-center bg-white text-[#2E7D1E] rounded-lg shadow-sm font-bold hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            {quantity === 1 ? (
              // Ícone de lixo ou apenas "-" quando for o último
              <span className="text-[10px]">LIMP</span> 
            ) : (
              "-"
            )}
          </button>

          <span className="text-sm font-bold text-gray-700 w-8 text-center">
            {quantity}
          </span>

          <button
            onClick={() => addToCart({ id, name, price })}
            className="w-8 h-8 flex items-center justify-center bg-[#2E7D1E] text-white rounded-lg shadow-sm font-bold hover:bg-[#3a9a25] transition-colors"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;