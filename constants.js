
import { Category } from './types.js';

export const GAMES_DATA = [
  {
    id: 'neon-serpent',
    title: 'Neon Serpent',
    description: 'High-speed Anime-style snake action. Consume data nodes and reach maximum length. SUGOI!',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&h=300&auto=format&fit=crop',
    iframeUrl: '#', // Not used for this native component
    category: Category.ARCADE,
    tags: ['Original', 'Anime', 'Skill'],
    isHot: true
  },
  {
    id: 'basket-hoop',
    title: 'Basket Hoop',
    description: 'Test your aim and score as many hoops as possible in this addictive basketball challenge.',
    thumbnail: 'https://picsum.photos/seed/basket/400/300',
    iframeUrl: 'https://d11jzht7mj96rr.cloudfront.net/games/2024/construct/311/basket-hoop/index-gg.html',
    category: Category.SPORTS,
    tags: ['Basketball', 'Sports', 'Skill'],
    isHot: false
  }
];
