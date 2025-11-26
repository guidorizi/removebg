import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const REMOVEBG_API_KEY = "7UQhDS3FnRtD6BqxD6XS2zds"; // Confira se sua chave está aqui

export default function ProcessImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Função auxiliar para converter Arquivo em Base64
  const fileToBase64 = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem válido");
      return;
    }
    // Reduzi o limite para 4MB para não pesar o banco na demonstração
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máx: 4MB");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setProcessedUrl(null);
  };

  const processImage = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);

    try {
      // 1. Converter Original para Base64 (para salvar no banco)
      const originalBase64 = await fileToBase64(selectedFile);

      // 2. Chamar Remove.bg
      const removeBgFormData = new FormData();
      removeBgFormData.append("image_file", selectedFile);
      removeBgFormData.append("size", "auto");

      const removeBgResponse = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        removeBgFormData,
        {
          headers: {
            "X-Api-Key": REMOVEBG_API_KEY,
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      // 3. Processar resposta e converter para Base64
      const processedBlob = removeBgResponse.data;
      const processedUrlObject = URL.createObjectURL(processedBlob);
      const processedBase64 = await fileToBase64(processedBlob);
      
      setProcessedUrl(processedUrlObject);

      // 4. Salvar no Banco (Agora salvando a imagem REAL!)
      try {
        await axios.post("/api/images", {
            originalUrl: originalBase64,  // Imagem real codificada
            processedUrl: processedBase64, // Imagem real codificada
            originalKey: "local_" + Date.now(),
            processedKey: "proc_" + Date.now()
        });
        toast.success("Imagem processada e salva no histórico!");
      } catch (backendError) {
        console.error("Erro ao salvar:", backendError);
        toast.warning("Processado, mas erro ao salvar no banco.");
      }

    } catch (error: any) {
      console.error("Erro geral:", error);
      toast.error("Erro ao processar imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProcessedUrl(null);
  };

  // ... (Mantenha o return visual igual ao anterior, vou resumir aqui para focar na lógica)
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Remover Fundo</h1>
        
        <div className="grid gap-6">
            {!selectedFile && (
            <Card className="border-dashed border-2 h-64 flex justify-center items-center cursor-pointer hover:bg-muted/50 relative">
                 <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileSelect} />
                 <div className="text-center text-muted-foreground">
                    <Upload className="w-12 h-12 mx-auto mb-4" />
                    <p>Clique ou arraste uma imagem aqui</p>
                 </div>
            </Card>
            )}

            {selectedFile && (
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Original</CardTitle></CardHeader>
                    <CardContent>
                        {previewUrl && <img src={previewUrl} className="w-full rounded" />}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Resultado</CardTitle></CardHeader>
                    <CardContent>
                        {isProcessing ? (
                            <div className="h-40 flex items-center justify-center"><Loader2 className="animate-spin" /></div>
                        ) : processedUrl ? (
                            <div className="space-y-4">
                                <img src={processedUrl} className="w-full rounded bg-[url('https://media.istockphoto.com/id/1314486567/vector/checkered-geometric-vector-background-with-black-and-gray-tile-transparency-grid-empty.jpg?s=612x612&w=0&k=20&c=NfVn42eT63O_zO4X9T5lD-CgqQv5uXk9Qx0Z5q3l2g=')] bg-contain" />
                                <Button asChild className="w-full"><a href={processedUrl} download="sem-fundo.png"><Download className="mr-2 h-4 w-4"/> Baixar</a></Button>
                            </div>
                        ) : (
                            <div className="h-40 flex items-center justify-center text-muted-foreground">Aguardando...</div>
                        )}
                    </CardContent>
                </Card>
            </div>
            )}

            {selectedFile && !processedUrl && !isProcessing && (
                <Button onClick={processImage} size="lg" className="w-full md:w-auto md:mx-auto">Processar Imagem</Button>
            )}
             {selectedFile && (processedUrl || !isProcessing) && (
                 <Button variant="outline" onClick={handleReset} className="w-full md:w-auto md:mx-auto mt-4"><Trash2 className="mr-2 h-4 w-4"/>Nova Imagem</Button>
            )}
        </div>
      </div>
    </div>
  );
}