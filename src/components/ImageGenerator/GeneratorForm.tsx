import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { IMAGE_STYLES } from '@/lib/constants';

interface GeneratorFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  quality: number[];
  setQuality: (quality: number[]) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const GeneratorForm = ({
  prompt,
  setPrompt,
  selectedStyle,
  setSelectedStyle,
  quality,
  setQuality,
  onGenerate,
  isGenerating,
}: GeneratorFormProps) => {
  return (
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
            <label className="block text-sm font-medium mb-2">Стиль</label>
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {IMAGE_STYLES.map((style) => (
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
            <label className="block text-sm font-medium mb-2">Разрешение</label>
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
          onClick={onGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 text-lg font-semibold"
        >
          {isGenerating ? (
            <>
              <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
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
  );
};

export default GeneratorForm;