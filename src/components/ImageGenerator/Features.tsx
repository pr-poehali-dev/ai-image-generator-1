import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Features = () => {
  const features = [
    {
      icon: 'Zap',
      title: 'Быстрая генерация',
      description: 'Создавайте изображения за секунды',
      color: 'text-yellow-400',
    },
    {
      icon: 'Palette',
      title: 'Множество стилей',
      description: 'От реализма до аниме',
      color: 'text-purple-400',
    },
    {
      icon: 'Download',
      title: 'Экспорт в HD',
      description: 'Скачивайте в высоком качестве',
      color: 'text-green-400',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card
          key={index}
          className="bg-black/40 backdrop-blur-xl border-white/10 text-center"
        >
          <CardContent className="p-6">
            <Icon
              name={feature.icon as any}
              size={32}
              className={`${feature.color} mx-auto mb-4`}
            />
            <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Features;