import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "@/_core/hooks/useAuth";
import ProcessImage from "./pages/ProcessImage";
import History from "./pages/History";
import Login from "./pages/Login"; // <--- Adicionamos o import do Login
import { Button } from "./components/ui/button";
import { LogOut, History as HistoryIcon, Upload } from "lucide-react";
import { APP_TITLE } from "./const";

function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">{APP_TITLE}</h1>
            {user && (
              <div className="flex gap-4">
                <Button asChild variant="ghost" size="sm">
                  <a href="/">
                    <Upload className="w-4 h-4 mr-2" />
                    Processar
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href="/history">
                    <HistoryIcon className="w-4 h-4 mr-2" />
                    Histórico
                  </a>
                </Button>
              </div>
            )}
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button onClick={() => logout()} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, loading } = useAuth(); 

  if (loading) return <div className="flex h-screen items-center justify-center">Carregando...</div>;

  // Se NÃO tiver usuário, mostra a tela de Login que criamos
  if (!user) {
    return <Login />; 
  }

  // Se tiver usuário, mostra a navegação e o conteúdo
  return (
    <>
      <Navigation />
      <Component />
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <ProtectedRoute component={ProcessImage} />} />
      <Route path="/history" component={() => <ProtectedRoute component={History} />} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;