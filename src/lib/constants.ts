import { ImageStyle } from '@/types/image-generator';

export const IMAGE_STYLES: ImageStyle[] = [
  {
    name: 'Реализм',
    emoji: '📸',
    description: 'Фотореалистичные изображения',
  },
  {
    name: 'Аниме',
    emoji: '🎌',
    description: 'Японский стиль анимации',
  },
  {
    name: 'Арт',
    emoji: '🎨',
    description: 'Художественный стиль',
  },
  {
    name: 'Концепт-арт',
    emoji: '🖼️',
    description: 'Концептуальные работы',
  },
];

export const EXAMPLE_PROMPTS = [
  'Космический астронавт в неоновом городе будущего',
  'Красивый закат над горным озером',
  'Фантастическое дерево с светящимися листьями',
  'Роботизированная кошка в кибerpunk стиле',
];

export const STYLE_PROMPTS = {
  'Реализм': 'photorealistic, high quality, detailed, realistic photography',
  'Аниме': 'anime style, manga style, Japanese animation, colorful',
  'Арт': 'artistic, digital art, creative, beautiful composition',
  'Концепт-арт': 'concept art, digital painting, professional, detailed illustration',
};

export const GALLERY_IMAGES = [
  {
    src: '/img/6c94fcdc-8154-4ce7-a3b8-9113b72e2fd3.jpg',
    alt: 'AI Gallery',
    category: 'Концепт-арт',
    categoryColor: 'bg-purple-600/20 text-purple-300',
  },
  {
    src: '/img/520ed79e-2394-4633-ab8a-a50100bd4f76.jpg',
    alt: 'Cosmic Astronaut',
    category: 'Космос',
    categoryColor: 'bg-blue-600/20 text-blue-300',
  },
  {
    src: '/img/925fecb2-462a-4726-bf34-94f704f3a239.jpg',
    alt: 'Magic Tree',
    category: 'Фантазия',
    categoryColor: 'bg-green-600/20 text-green-300',
  },
];