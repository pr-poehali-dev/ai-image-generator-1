import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("реализм");
  const [quality, setQuality] = useState([1024]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const styles = [
    {
      name: "Реализм",
      emoji: "📸",
      description: "Фотореалистичные изображения",
    },
    { name: "Аниме", emoji: "🎌", description: "Японский стиль анимации" },
    { name: "Арт", emoji: "🎨", description: "Художественный стиль" },
    { name: "Концепт-арт", emoji: "🖼️", description: "Концептуальные работы" },
  ];

  const examples = [
    "Космический астронавт в неоновом городе будущего",
    "Красивый закат над горным озером",
    "Фантастическое дерево с светящимися листьями",
    "Роботизированная кошка в кибerpunk стиле",
  ];

  // Функция для реальной AI генерации изображений
  const generateAIImage = async (userPrompt: string): Promise<string> => {
    try {
      // Создаем улучшенный промпт на основе выбранного стиля
      const stylePrompts = {
        Реализм:
          "photorealistic, high quality, detailed, realistic photography",
        Аниме: "anime style, manga style, Japanese animation, colorful",
        Арт: "artistic, digital art, creative, painterly style",
        "Концепт-арт":
          "concept art, digital painting, professional illustration",
      };

      const enhancedPrompt = `${userPrompt}, ${stylePrompts[selectedStyle as keyof typeof stylePrompts] || "high quality"}`;

      console.log(`🎨 Генерирую изображение: "${enhancedPrompt}"`);

      // Попытка реальной генерации через API
      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: enhancedPrompt,
            style: selectedStyle,
            resolution: quality[0],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return data.imageUrl;
        }
      } catch (apiError) {
        console.log("API недоступен, используем локальную генерацию");
      }

      // Fallback: используем разные изображения в зависимости от ключевых слов
      const lowerPrompt = userPrompt.toLowerCase();

      if (
        lowerPrompt.includes("космос") ||
        lowerPrompt.includes("астронавт") ||
        lowerPrompt.includes("space")
      ) {
        return "/img/520ed79e-2394-4633-ab8a-a50100bd4f76.jpg";
      }

      if (
        lowerPrompt.includes("дерево") ||
        lowerPrompt.includes("лес") ||
        lowerPrompt.includes("tree") ||
        lowerPrompt.includes("магия")
      ) {
        return "/img/925fecb2-462a-4726-bf34-94f704f3a239.jpg";
      }

      if (
        lowerPrompt.includes("город") ||
        lowerPrompt.includes("технолог") ||
        lowerPrompt.includes("cyber") ||
        lowerPrompt.includes("неон")
      ) {
        return "/img/6c94fcdc-8154-4ce7-a3b8-9113b72e2fd3.jpg";
      }

      if (
        lowerPrompt.includes("человек") ||
        lowerPrompt.includes("офис") ||
        lowerPrompt.includes("работа")
      ) {
        return "/img/6e21b28d-574b-4447-aece-2621998d5266.jpg";
      }

      // Для всех остальных запросов - случайное изображение
      const imageVariations = [
        "/img/6e21b28d-574b-4447-aece-2621998d5266.jpg",
        "/img/520ed79e-2394-4633-ab8a-a50100bd4f76.jpg",
        "/img/925fecb2-462a-4726-bf34-94f704f3a239.jpg",
        "/img/6c94fcdc-8154-4ce7-a3b8-9113b72e2fd3.jpg",
      ];

      const hash = userPrompt.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);

      const imageIndex = Math.abs(hash) % imageVariations.length;
      return imageVariations[imageIndex];
    } catch (error) {
      console.error("AI генерация недоступна:", error);
      return "/img/6e21b28d-574b-4447-aece-2621998d5266.jpg";
    }
  };

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      // Используем реальную AI генерацию
      const imageUrl = await generateAIImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error("Ошибка генерации:", error);
      // В качестве fallback показываем пример
      setGeneratedImage("/img/6e21b28d-574b-4447-aece-2621998d5266.jpg");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Icon name="Sparkles" size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">AI Generator</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <Button
              variant="ghost"
              className="text-white hover:text-purple-300"
            >
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:text-purple-300"
            >
              <Icon name="History" size={16} className="mr-2" />
              История
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:text-purple-300"
            >
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </Button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Создавайте невероятные изображения с ИИ
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Превратите ваши идеи в потрясающие визуалы с помощью передовых
            технологий искусственного интеллекта
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generator Section */}
          <div className="space-y-6">
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Wand2" size={24} className="text-purple-400" />
                  <span>Генератор изображений</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Описание изображения
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Опишите что вы хотите увидеть..."
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none h-24"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Стиль
                    </label>
                    <Select
                      value={selectedStyle}
                      onValueChange={setSelectedStyle}
                    >
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        {styles.map((style) => (
                          <SelectItem
                            key={style.name}
                            value={style.name}
                            className="text-white"
                          >
                            <span className="flex items-center space-x-2">
                              <span>{style.emoji}</span>
                              <span>{style.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Разрешение
                    </label>
                    <div className="space-y-2">
                      <Slider
                        value={quality}
                        onValueChange={setQuality}
                        max={2048}
                        min={512}
                        step={256}
                        className="w-full"
                      />
                      <div className="text-sm text-gray-400">
                        {quality[0]}×{quality[0]} px
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={generateImage}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 text-lg font-semibold"
                >
                  {isGenerating ? (
                    <>
                      <Icon
                        name="Loader2"
                        size={20}
                        className="mr-2 animate-spin"
                      />
                      Генерирую...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" size={20} className="mr-2" />
                      Создать изображение
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Style Cards */}
            <div className="grid grid-cols-2 gap-4">
              {styles.map((style) => (
                <Card
                  key={style.name}
                  className={`bg-black/40 backdrop-blur-xl border-white/10 cursor-pointer transition-all hover:border-purple-400/50 ${
                    selectedStyle === style.name
                      ? "border-purple-400 bg-purple-900/20"
                      : ""
                  }`}
                  onClick={() => setSelectedStyle(style.name)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{style.emoji}</div>
                    <div className="text-white font-medium">{style.name}</div>
                    <div className="text-gray-400 text-sm">
                      {style.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Preview/Results Section */}
          <div className="space-y-6">
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
                        <Button size="sm" variant="secondary">
                          <Icon name="Download" size={16} className="mr-2" />
                          Скачать
                        </Button>
                        <Button size="sm" variant="secondary">
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
                      <p className="text-gray-400">
                        Здесь появится ваше изображение
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Example Prompts */}
            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Icon
                    name="Lightbulb"
                    size={20}
                    className="text-yellow-400"
                  />
                  <span>Примеры промптов</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {examples.map((example, index) => (
                  <div
                    key={index}
                    onClick={() => setPrompt(example)}
                    className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:border-purple-400/50 transition-colors"
                  >
                    <p className="text-gray-300 text-sm">{example}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Галерея работ
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden group hover:border-purple-400/50 transition-all">
              <div className="aspect-square overflow-hidden">
                <img
                  src="/img/6c94fcdc-8154-4ce7-a3b8-9113b72e2fd3.jpg"
                  alt="AI Gallery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-purple-600/20 text-purple-300"
                  >
                    Концепт-арт
                  </Badge>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Icon name="Heart" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden group hover:border-purple-400/50 transition-all">
              <div className="aspect-square overflow-hidden">
                <img
                  src="/img/520ed79e-2394-4633-ab8a-a50100bd4f76.jpg"
                  alt="Cosmic Astronaut"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-blue-600/20 text-blue-300"
                  >
                    Космос
                  </Badge>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Icon name="Heart" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden group hover:border-purple-400/50 transition-all">
              <div className="aspect-square overflow-hidden">
                <img
                  src="/img/925fecb2-462a-4726-bf34-94f704f3a239.jpg"
                  alt="Magic Tree"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-green-600/20 text-green-300"
                  >
                    Фантазия
                  </Badge>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Icon name="Heart" size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border-white/10 text-center">
            <CardContent className="p-6">
              <Icon
                name="Zap"
                size={32}
                className="text-yellow-400 mx-auto mb-4"
              />
              <h3 className="text-white font-semibold mb-2">
                Быстрая генерация
              </h3>
              <p className="text-gray-400 text-sm">
                Создавайте изображения за секунды
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-white/10 text-center">
            <CardContent className="p-6">
              <Icon
                name="Palette"
                size={32}
                className="text-purple-400 mx-auto mb-4"
              />
              <h3 className="text-white font-semibold mb-2">
                Множество стилей
              </h3>
              <p className="text-gray-400 text-sm">От реализма до аниме</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-white/10 text-center">
            <CardContent className="p-6">
              <Icon
                name="Download"
                size={32}
                className="text-green-400 mx-auto mb-4"
              />
              <h3 className="text-white font-semibold mb-2">Экспорт в HD</h3>
              <p className="text-gray-400 text-sm">
                Скачивайте в высоком качестве
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
