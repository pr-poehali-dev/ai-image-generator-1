import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { GALLERY_IMAGES } from '@/lib/constants';

const Gallery = () => {
  const handleLike = (index: number) => {
    console.log('Liked image:', index);
  };

  const handleDownload = (src: string, alt: string) => {
    console.log('Download image:', src, alt);
  };

  return (
    <div className="mt-16">
      <h3 className="text-3xl font-bold text-white text-center mb-8">
        Галерея работ
      </h3>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {GALLERY_IMAGES.map((image, index) => (
          <Card
            key={index}
            className="bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden group hover:border-purple-400/50 transition-all"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className={image.categoryColor}>
                  {image.category}
                </Badge>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    onClick={() => handleLike(index)}
                  >
                    <Icon name="Heart" size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    onClick={() => handleDownload(image.src, image.alt)}
                  >
                    <Icon name="Download" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;