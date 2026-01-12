// data/wifContent.ts

export interface WIFItem {
  title: string;
  year: string;
  img: string;
}

export const PAST_EVENTS: WIFItem[] = [
  {
    title: 'Open Source Summit',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=800',
  },
  {
    title: 'Code with WIF',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800',
  },
  {
    title: 'Git Mastery Lab',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800',
  },
  {
    title: 'FOSS Awareness',
    year: '2022',
    img: 'https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?q=80&w=800',
  },
];

export const WEBINARS: WIFItem[] = [
  {
    title: 'GSoC Guide 2024',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800',
  },
  {
    title: 'UI/UX in FOSS',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800',
  },
  {
    title: 'Cloud Native 101',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800',
  },
];

export const BLOGS: WIFItem[] = [
  {
    title: 'The Power of PRs',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800',
  },
  {
    title: 'Success Stories',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800',
  },
  {
    title: 'Mentorship Matters',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800',
  },
];
