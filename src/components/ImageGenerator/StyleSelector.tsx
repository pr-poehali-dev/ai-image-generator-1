import { Card, CardContent } from '@/components/ui/card';
import { IMAGE_STYLES } from '@/lib/constants';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

const StyleSelector = ({ selectedStyle, onStyleSelect }: StyleSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {IMAGE_STYLES.map((style) => (
        <Card
          key={style.name}
          className={`bg-black/40 backdrop-blur-xl border-white/10 cursor-pointer transition-all hover:border-purple-400/50 ${
            selectedStyle === style.name
              ? 'border-purple-400 bg-purple-900/20'
              : ''
          }`}
          onClick={() => onStyleSelect(style.name)}
        >
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">{style.emoji}</div>
            <div className="text-white font-medium">{style.name}</div>
            <div className="text-gray-400 text-sm">{style.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StyleSelector;