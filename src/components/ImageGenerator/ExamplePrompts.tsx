import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { EXAMPLE_PROMPTS } from '@/lib/constants';

interface ExamplePromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const ExamplePrompts = ({ onPromptSelect }: ExamplePromptsProps) => {
  return (
    <Card className="bg-black/40 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} className="text-yellow-400" />
          <span>Примеры промптов</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {EXAMPLE_PROMPTS.map((example, index) => (
          <div
            key={index}
            onClick={() => onPromptSelect(example)}
            className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:border-purple-400/50 transition-colors"
          >
            <p className="text-gray-300 text-sm">{example}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ExamplePrompts;