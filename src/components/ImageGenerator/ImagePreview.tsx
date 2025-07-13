import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ImagePreviewProps {
  isGenerating: boolean;
  generatedImage: string | null;
  onDownload?: () => void;
  onShare?: () => void;
}

const ImagePreview = ({
  isGenerating,
  generatedImage,
  onDownload,
  onShare,
}: ImagePreviewProps) => {
  return (
    <Card className="bg-black/40 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Icon name="Image" size={24} className="text-purple-400" />
          <span>Результат</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square bg-white/5 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden">
          {isGenerating ? (
            <div className="text-center">
              <Icon
                name="Loader2"
                size={48}
                className="text-purple-400 animate-spin mx-auto mb-4"
              />
              <p className="text-gray-300">Создаю изображение...</p>
            </div>
          ) : generatedImage ? (
            <div className="relative w-full h-full group">
              <img
                src={generatedImage}
                alt="Сгенерированное изображение"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <Button size="sm" variant="secondary" onClick={onDownload}>
                  <Icon name="Download" size={16} className="mr-2" />
                  Скачать
                </Button>
                <Button size="sm" variant="secondary" onClick={onShare}>
                  <Icon name="Share" size={16} className="mr-2" />
                  Поделиться
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Icon
                name="ImagePlus"
                size={48}
                className="text-gray-500 mx-auto mb-4"
              />
              <p className="text-gray-400">Здесь появится ваше изображение</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;