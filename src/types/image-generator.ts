export interface ImageStyle {
  name: string;
  emoji: string;
  description: string;
}

export interface GenerateImageParams {
  prompt: string;
  style: string;
  resolution: string;
}

export interface GenerateImageResponse {
  imageUrl: string;
  success: boolean;
  error?: string;
}

export type StyleType = 'Реализм' | 'Аниме' | 'Арт' | 'Концепт-арт';