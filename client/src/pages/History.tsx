import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";

// Definindo o tipo dos dados que vêm do banco
interface ProcessedImage {
  id: number;
  originalUrl: string;
  processedUrl: string;
  createdAt: string;
}

export default function History() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // Chama a sua nova API REST
      const response = await axios.get("/api/images");
      setImages(response.data);
    } catch (err) {
      console.error("Erro ao buscar histórico:", err);
      setError("Não foi possível carregar o histórico.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-red-500">
        <p>{error}</p>
        <Button onClick={fetchHistory} variant="outline" className="mt-4">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Histórico de Processamento</h1>

        {images.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            Nenhuma imagem processada ainda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <Card key={img.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted/30 p-2 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-2 w-full h-full">
                    <img 
                      src={img.originalUrl.startsWith("http") ? img.originalUrl : "/placeholder.png"} 
                      alt="Original" 
                      className="object-cover w-full h-full rounded bg-white shadow-sm"
                    />
                    <img 
                      src={img.processedUrl} 
                      alt="Processada" 
                      className="object-contain w-full h-full rounded bg-[url('https://media.istockphoto.com/id/1314486567/vector/checkered-geometric-vector-background-with-black-and-gray-tile-transparency-grid-empty.jpg?s=612x612&w=0&k=20&c=NfVn42eT63O_zO4X9T5lD-CgqQv5uXk9Qx0Z5q3l2g=')] bg-repeat"
                    />
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {img.createdAt 
                      ? format(new Date(img.createdAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })
                      : "Data desconhecida"}
                  </div>
                  
                  <Button asChild className="w-full">
                    <a href={img.processedUrl} download={`imagem-sem-fundo-${img.id}.png`}>
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Resultado
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}