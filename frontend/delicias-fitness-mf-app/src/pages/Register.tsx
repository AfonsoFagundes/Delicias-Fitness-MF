import { useState } from "react"
import api from "@/Api/api"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); 

    try {
      await api.post("/auth/register", {
        email,
        password
      })

      toast.success("Conta criada com sucesso");
      navigate("/login")

    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Erro ao registrar"

      toast.error(message)

    } finally {
      setLoading(false);
    }
  }

  return (
    /* Container Principal: Fundo escuro com o mesmo efeito de brilho do Login */
    <div className="min-h-screen flex items-center justify-center bg-[#0a1a06] relative overflow-hidden p-6">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(46,125,30,0.25)_0%,transparent_70%)]" />

      {/* Card de Registro com efeito de vidro*/}
      <div className="relative z-10 w-full max-w-[340px] bg-white/5 border border-white/10 rounded-[20px] p-8 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-500">
        
        {/* Logo e Cabeçalho */}
        <div className="text-center mb-8">
          <div className="w-[52px] h-[52px] bg-[#2E7D1E] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-900/20 overflow-hidden">
            <img 
              src="/src/assets/favicon-delicias-fitness.svg" 
              alt="Logo Delicias Fitness M.F" 
              className="w-8 h-8 object-contain" 
            />
          </div>
          <h1 className="text-white text-lg font-medium tracking-tight">
            Criar nova conta
          </h1>
          <p className="text-white/50 text-[12px] mt-1">
            Delicias Fitness M.F
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Input de E-mail */}
          <div className="space-y-1.5">
            <label className="text-white/60 text-[12px] ml-1 block text-left">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#6DBE45] transition-all placeholder:text-white/20"
              required
            />
          </div>

          {/* Input de Senha */}
          <div className="space-y-1.5">
            <label className="text-white/60 text-[12px] ml-1 block text-left">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#6DBE45] transition-all placeholder:text-white/20"
              required
            />
          </div>

          {/* Botão de Submissão com Loading State */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-[#2E7D1E] hover:bg-[#3a9a25] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Registrando...
              </span>
            ) : (
              "Criar conta"
            )}
          </button>

          {/* Link para voltar ao Login */}
          <div className="text-center mt-4">
            <Link to="/login" className="text-white/30 text-[12px] hover:text-white/50 transition-colors">
              Já tem acesso? Faça login aqui
            </Link>
          </div>
        </form>

        {/* Badge de Status */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-[#2E7D1E]/10 border border-[#2E7D1E]/30 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 bg-[#6DBE45] rounded-full animate-pulse" />
            <span className="text-[#6DBE45] text-[10px] font-bold uppercase tracking-wider">
              Registro Ativo
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;