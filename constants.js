
import { Category } from './types.js';

export const GAMES_DATA = [
  {
    id: 'cyber-snake',
    title: 'Cyber Snake',
    description: 'High-speed cyberpunk serpent simulation. Breach the Neo-Tokyo mainframe by consuming corrupted data nodes.',
    thumbnail: 'https://i.ibb.co/GfWFcTvF/cyber.jpg',
    iframeUrl: '#', // Not used for this native component
    category: Category.ARCADE,
    tags: ['Original', 'Cyberpunk', 'Skill'],
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
