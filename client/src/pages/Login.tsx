import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      
      // Salva que o usuário está logado
      localStorage.setItem("user", JSON.stringify(response.data));
      
      toast.success("Login realizado com sucesso!");
      // Força recarregamento para entrar no App
      window.location.href = "/"; 
    } catch (error) {
      toast.error("Email ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-lg mx-4 shadow-lg">
        <CardHeader className="text-center space-y-2">
          {/* AQUI ESTÁ A MUDANÇA NO TÍTULO */}
          <CardTitle className="text-2xl font-bold text-primary">
            Removedor de Fundo
          </CardTitle>
          <CardDescription className="text-base">
            Projeto Fullstack 2025
          </CardDescription>
          <p className="text-sm text-muted-foreground pt-2">
            by: jvguidorizi
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="admin@produp.com"
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="******"
                className="bg-white"
              />
            </div>
            <Button type="submit" className="w-full text-lg h-12 mt-2">
              Entrar no Sistema
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}