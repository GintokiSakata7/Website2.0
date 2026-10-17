export type TeamAccent =
  | 'MONOCHROME'
  | 'LIME'
  | 'CYAN'
  | 'AMBER'
  | 'VIOLET';

export interface TeamMember {
  id: string;
  name: string;
  fullName: string;
  role: string;
  title?: string;
  specialties: string[];
  accent: TeamAccent;
  focus?: string;
  matrixPosition?: {
    x: number;
    y: number;
  };
  linkedin?: string;
  github?: string;
  photo?: string;
}

export const teamData: TeamMember[] = [
  {
    id: 'dhanush',
    name: 'Dhanush',
    fullName: 'Dhanush A',
    role: 'Co-Founder & CPO',
    specialties: ['Product Strategy', 'AI Applications', 'Full-Stack', 'Product Engineering'],
    accent: 'LIME',
    focus: 'Product direction, AI applications, full-stack engineering, and turning ideas into useful digital products.',
    matrixPosition: { x: 0.72, y: 0.08 },
    linkedin: 'https://www.linkedin.com/in/dhanush0254',
  },
  {
    id: 'rishi',
    name: 'Rishi',
    fullName: 'Rishivardhan Chepuri',
    role: 'Co-Founder & CTO',
    specialties: ['AI/ML', 'LLM Systems', 'AI Agents', 'Full-Stack', 'Architecture'],
    accent: 'LIME',
    focus: 'Technical direction, intelligent systems, software architecture, and full-stack AI/ML engineering.',
    matrixPosition: { x: -0.72, y: 0.08 },
    linkedin: 'https://www.linkedin.com/in/rishivardhan-chepuri-282167339',
  },
];

export default teamData;
