
import { Category } from './types.js';

export const GAMES_DATA = [
  {
    id: '1',
    title: '2048',
    description: 'The classic addictive number merging game. Reach the 2048 tile!',
    thumbnail: 'https://picsum.photos/seed/2048/400/300',
    iframeUrl: 'https://play2048.co/',
    category: Category.PUZZLE,
    tags: ['Numbers', 'Classic'],
    isHot: true
  },
  {
    id: '2',
    title: 'Hextris',
    description: 'An addictive fast-paced puzzle game inspired by Tetris.',
    thumbnail: 'https://picsum.photos/seed/hextris/400/300',
    iframeUrl: 'https://hextris.io/',
    category: Category.ARCADE,
    tags: ['Fast', 'Shapes']
  },
  {
    id: '3',
    title: 'Doodle Jump Clone',
    description: 'Jump through the platforms and reach for the stars.',
    thumbnail: 'https://picsum.photos/seed/doodle/400/300',
    iframeUrl: 'https://doodlejump.io/',
    category: Category.ARCADE,
    tags: ['Retro', 'Skill'],
    isHot: true
  },
  {
    id: '4',
    title: 'Sinuous',
    description: 'Avoid the red dots and survive as long as you can.',
    thumbnail: 'https://picsum.photos/seed/sinuous/400/300',
    iframeUrl: 'https://sinuousgame.com/',
    category: Category.ACTION,
    tags: ['Survival', 'Reflex']
  },
  {
    id: '5',
    title: 'Classic Snake',
    description: 'Grow your snake by eating food, but don\'t hit the walls!',
    thumbnail: 'https://picsum.photos/seed/snake/400/300',
    iframeUrl: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.ARCADE,
    tags: ['Classic', 'Retro']
  },
  {
    id: '6',
    title: 'Breakout',
    description: 'Destroy all the bricks using your paddle and ball.',
    thumbnail: 'https://picsum.photos/seed/break/400/300',
    iframeUrl: 'https://en.wikipedia.org/wiki/Main_Page',
    category: Category.ARCADE,
    tags: ['Skill']
  },
  {
    id: '7',
    title: 'Space Invaders',
    description: 'Protect the earth from invading aliens.',
    thumbnail: 'https://picsum.photos/seed/space/400/300',
    iframeUrl: 'https://archive.org/embed/arcade_spacedr2',
    category: Category.ACTION,
    tags: ['Retro', 'Sci-Fi']
  },
  {
    id: '8',
    title: 'Tower Block',
    description: 'Build the tallest tower possible by stacking blocks.',
    thumbnail: 'https://picsum.photos/seed/tower/400/300',
    iframeUrl: 'https://html5.gamedistribution.com/69450702d334460596ef3f8b05151596/',
    category: Category.STRATEGY,
    tags: ['Stacking', 'Casual']
  },
  {
    id: '9',
    title: 'Drift Hunter',
    description: 'Perform epic drifts and earn points to upgrade your car.',
    thumbnail: 'https://picsum.photos/seed/drift/400/300',
    iframeUrl: 'https://html5.gamedistribution.com/710e6205e4924c5396603d656846f485/',
    category: Category.DRIVING,
    tags: ['Racing', 'Drift'],
    isHot: true
  },
  {
    id: '10',
    title: 'Chess Pro',
    description: 'Challenge the computer or a friend in the game of kings.',
    thumbnail: 'https://picsum.photos/seed/chess/400/300',
    iframeUrl: 'https://html5.gamedistribution.com/f272a91979b94098967909b9e6f36367/',
    category: Category.STRATEGY,
    tags: ['Brain', 'Board']
  },
  {
    id: '11',
    title: 'Pool 8 Ball',
    description: 'Sink all your balls and the 8-ball to win the match.',
    thumbnail: 'https://picsum.photos/seed/pool/400/300',
    iframeUrl: 'https://html5.gamedistribution.com/c635d9703f26488d901a140f7d057a1e/',
    category: Category.SPORTS,
    tags: ['Physics', 'Skill']
  }
];
