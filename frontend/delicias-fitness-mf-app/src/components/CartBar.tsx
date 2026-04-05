import { createOrder } from "@/Api/Order";
import { useCart } from "./Context/CartContext";
import toast from "react-hot-toast";

import { useState } from "react";

export const CartBar = () => {
  const { cart, cartItemsCount, cartTotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const handleWhatsApp = async () => {
    const orderData = {
      customerName: name,
      phone: phone,
      address: address,
      total: cartTotal,
      note: note,
      status: "pending" as const,
      deliveryDate: new Date().toISOString(),
      items: cart.map((item) => ({
        foodId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await createOrder(orderData);
      if (response) {
        const mensagemItens = cart
          .map(
            (item) =>
              `- ${item.quantity}x ${item.name} — R$${item.price * item.quantity}`,
          )
          .join("\n");

        const mensagem = `Olá! Gostaria de fazer o seguinte pedido:

${mensagemItens}

Total: R$${cartTotal}`;
        const url = `https://wa.me/554891696167?text=${encodeURIComponent(mensagem)}`;
        toast.success("Pedido registrado! Abrindo o WhatsApp");
        clearCart(); //funcao para limpar
        window.open(url, "_blank");
      }
    } catch (error) {
      toast.error("Erro ao registrar pedido!");
    }
  };

  return (

    
    <div>
      <p>
        Itens: {cartItemsCount.toFixed()} | Total: R$${cartTotal.toFixed(2)}
      </p>

      <button
        disabled={!name || !address || cart.length === 0}
        onClick={handleWhatsApp}
        className="disabled:opacity-50 disabled:cursor-not-allowed bg-lime-400 p-2 rounded"
      >
        Finalizar no WhatsApp
      </button>
      <div>
        <input
          type="text"
          placeholder="Digita o seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Insira seu numero do WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Digita o seu endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="Ex: Tirar cebola... ou Interfone quebrado, me ligar..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
    </div>
    
  );
};
