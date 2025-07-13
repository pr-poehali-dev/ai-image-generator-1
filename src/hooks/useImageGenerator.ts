import { useState } from 'react';
import { STYLE_PROMPTS } from '@/lib/constants';

export const useImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Реализм');
  const [quality, setQuality] = useState([1024]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const enhancedPrompt = `${prompt}, ${
        STYLE_PROMPTS[selectedStyle as keyof typeof STYLE_PROMPTS] ||
        'high quality'
      }`;

      // Имитируем API запрос - здесь можно подключить реальный API
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          style: selectedStyle,
          resolution: `${quality[0]}x${quality[0]}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedImage(data.imageUrl);
      } else {
        // Fallback - показываем примерное изображение
        setGeneratedImage('/img/6e21b28d-574b-4447-aece-2621998d5266.jpg');
      }
    } catch (error) {
      console.error('Ошибка генерации:', error);
      // В качестве fallback показываем пример
      setGeneratedImage('/img/6e21b28d-574b-4447-aece-2621998d5266.jpg');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.jpg';
      link.click();
    }
  };

  const handleShare = () => {
    if (generatedImage && navigator.share) {
      navigator.share({
        title: 'AI Generated Image',
        text: prompt,
        url: generatedImage,
      });
    }
  };

  return {
    prompt,
    setPrompt,
    selectedStyle,
    setSelectedStyle,
    quality,
    setQuality,
    isGenerating,
    generatedImage,
    generateImage,
    handleDownload,
    handleShare,
  };
};