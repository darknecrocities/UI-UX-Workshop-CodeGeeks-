export interface SlideMeta {
  id: number;
  slug: string;
  title: string;
  section: 'FUNDAMENTALS' | 'ACTIVITY 01' | 'BREAK' | 'AI ENGINEERING' | 'ACTIVITY 02' | 'WRAP-UP';
  tagline: string;
}

export interface WorkshopBlock {
  time: string;
  title: string;
  slides: string;
  description: string;
}

export interface ProductItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}
