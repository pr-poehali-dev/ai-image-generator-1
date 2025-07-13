import Header from "@/components/ImageGenerator/Header";
import GeneratorForm from "@/components/ImageGenerator/GeneratorForm";
import StyleSelector from "@/components/ImageGenerator/StyleSelector";
import ImagePreview from "@/components/ImageGenerator/ImagePreview";
import ExamplePrompts from "@/components/ImageGenerator/ExamplePrompts";
import Gallery from "@/components/ImageGenerator/Gallery";
import Features from "@/components/ImageGenerator/Features";
import { useImageGenerator } from "@/hooks/useImageGenerator";

const Index = () => {
  const {
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
  } = useImageGenerator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

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
            <GeneratorForm
              prompt={prompt}
              setPrompt={setPrompt}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              quality={quality}
              setQuality={setQuality}
              onGenerate={generateImage}
              isGenerating={isGenerating}
            />

            <StyleSelector
              selectedStyle={selectedStyle}
              onStyleSelect={setSelectedStyle}
            />
          </div>

          {/* Preview/Results Section */}
          <div className="space-y-6">
            <ImagePreview
              isGenerating={isGenerating}
              generatedImage={generatedImage}
              onDownload={handleDownload}
              onShare={handleShare}
            />

            <ExamplePrompts onPromptSelect={setPrompt} />
          </div>
        </div>

        <Gallery />
        <Features />
      </div>
    </div>
  );
};

export default Index;
