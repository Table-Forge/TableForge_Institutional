import { ITeamMember } from "@/schemas/team.schema";

export const initialTeamMembers: ITeamMember[] = [
  {
    id: 1,
    name: "Alexandre Ferrari",
    role: "Fundador & Arquiteto de Produto",
    bio: "Mestre de RPG há mais de 10 anos, apaixonado por worldbuilding e tecnologia. Criou o TableForge para transformar a busca fragmentada de mesas em uma experiência fluida para a comunidade.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    favoriteSystemOrGame: "D&D 5e e Tormenta20",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Lucas Menezes",
    role: "Líder de Engenharia Backend",
    bio: "Especialista em arquitetura escalável e sistemas distribuídos em .NET. Jogador ávido de board games pesados e entusiasta de sistemas de geolocalização em tempo real.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    favoriteSystemOrGame: "Terraforming Mars e Call of Cthulhu",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    id: 3,
    name: "Juliana Rocha",
    role: "Designer de Produto & UX",
    bio: "Focada em design systems modernos, acessibilidade e interfaces imersivas. Garante que cada tela do TableForge respire a estética Dark/HUD da Forja com usabilidade exemplar.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    favoriteSystemOrGame: "Ordem Paranormal e Wingspan",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://x.com",
  },
  {
    id: 4,
    name: "Gabriel Santos",
    role: "Desenvolvedor Frontend & Mobile",
    bio: "Fissurado por interfaces fluidas em React Native e Next.js. Mestre em organizar campanhas e apaixonado por conectar jogadores locais a espaços físicos.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    favoriteSystemOrGame: "Vampiro: A Máscara e Magic: The Gathering",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
];
