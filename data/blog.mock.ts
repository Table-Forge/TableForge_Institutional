import { IBlogPost, IBlogComment } from "@/schemas/blog.schema";

export const initialBlogPosts: IBlogPost[] = [
  {
    id: 1,
    title: "O Ponto de Encontro do RPG: Como o TableForge Conecta o Digital e o Presencial",
    slug: "ponto-de-encontro-rpg-conexao-digital-presencial",
    summary: "Descubra como o TableForge nasceu para resolver a fragmentação da comunidade geek, unindo busca de mesas, lojas físicas, eventos e a Taverna em um só lugar.",
    content: "Quem joga RPG de mesa no Brasil conhece o desafio: organizar uma campanha geralmente significa navegar entre múltiplos grupos de mensagens, servidores temporários de chat caóticos, pastas compartilhadas em nuvem e conversas perdidas sobre quem vai levar os petiscos.\n\nMais do que isso: e quando um jogador se muda de cidade ou quer encontrar pessoas próximas para rolar dados presencialmente? É aí que a fragmentação se torna uma barreira real.\n\n### A Forja Está Sendo Acesa\nO TableForge não foi concebido apenas como uma ficha digital ou rolador de dados. Ele é a infraestrutura social que faltava para quem vive RPG e board games. Através de geolocalização inteligente no aplicativo móvel, você descobre jogadores em um raio personalizado, conhece lojas e espaços parceiros com mesas prontas para receber sua party, e encontra eventos oficiais organizados na sua região.\n\n### O Papel d'A Taverna\nPara além do aplicativo móvel, nosso portal e a comunidade permanente da Taverna funcionam como um grande centro de conhecimento duradouro. Guias como este, discussões sobre sistemas, troca de experiências e debates sobre condução de narrativas garantem que o conteúdo permaneça pesquisável e acessível a qualquer momento.",
    coverImageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000&auto=format&fit=crop&q=80",
    authorName: "Equipe TableForge",
    authorAvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    category: "Manifesto",
    tags: ["Ecossistema", "Comunidade", "TableForge", "Lançamento"],
    estimatedReadingTimeMinutes: 4,
    publishedAtUtc: "2026-09-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Guia de Sobrevivência do Mestre: 5 Pilares para Campanhas que não Morrem no Episódio 3",
    slug: "guia-sobrevivencia-mestre-campanhas-duradouras",
    summary: "Estatísticas mostram que grande parte das campanhas caseiras é abandonada no primeiro mês. Veja 5 práticas comprovadas para manter a mesa engajada até o final épico.",
    content: "O famoso 'hiato indefinido' é o pesadelo de todo grupo de RPG. Mas campanhas longas e inesquecíveis não acontecem por sorte: elas seguem uma estrutura de expectativas bem calibrada.\n\n1. **A Força da Sessão Zero:** Estabeleça os pilares éticos e temáticos antes de rolar o primeiro d20.\n2. **Ritmo de Sessão Consistente:** É melhor jogar religiosamente a cada 15 dias por 3 horas do que prometer maratonas semanais de 7 horas que cansam o grupo.\n3. **Holofote Compartilhado:** Garanta que cada sessão ofereça um momento de destaque narrativo ou mecânico para personagens diferentes.\n4. **Comunicação Ativa Pós-Sessão:** Usar o chat e anotações compartilhadas mantém o suspense vivo durante a semana.\n5. **Flexibilidade Narrativa:** O mestre prepara situações, não desfechos. Permita que as escolhas dos jogadores transformem o rumo do cenário.",
    coverImageUrl: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=1000&auto=format&fit=crop&q=80",
    authorName: "Valen, o Cronista",
    authorAvatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    category: "Dicas de Mestre",
    tags: ["Mestres", "Sessão Zero", "D&D", "Narrativa"],
    estimatedReadingTimeMinutes: 6,
    publishedAtUtc: "2026-09-04T15:30:00Z",
  },
  {
    id: 3,
    title: "Rotas da Forja: Conhecendo os Espaços Geek e Lojas Parceiras que Dão Vida ao RPG",
    slug: "rotas-da-forja-espacos-geek-lojas-parceiras",
    summary: "Iniciamos nossa série de visitas aos parceiros fundadores do TableForge! Conheça a estrutura de lojas locais que transformam mesas vazias em novas aventuras.",
    content: "Lojas e taberneiros modernos são o coração pulsante da nossa comunidade. Uma mesa física de RPG com miniaturas, mapas táticos e dados ressoando na madeira traz uma sensação que tela nenhuma consegue substituir por completo.\n\nNa primeira edição de 'Rotas da Forja', visitamos lojas pioneiras que já contam com mesas cadastradas na Beta do TableForge. Pelo app, jogadores podem visualizar horários livres, estrutura para jogos de tabuleiro ou cartas e solicitar reservas antecipadas de mesa.\n\nSe você é dono de um espaço geek ou organiza encontros, participe como Parceiro Fundador da nossa plataforma!",
    coverImageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=1000&auto=format&fit=crop&q=80",
    authorName: "Equipe TableForge",
    authorAvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    category: "Rotas da Forja",
    tags: ["Lojas", "Espaços Geek", "Parceiros", "Presencial"],
    estimatedReadingTimeMinutes: 5,
    publishedAtUtc: "2026-09-07T14:00:00Z",
  },
];

export const initialBlogComments: Record<number, IBlogComment[]> = {
  1: [
    {
      id: 1,
      postId: 1,
      authorName: "Rodrigo 'Bárbaro'",
      authorAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content: "Sensacional ver uma iniciativa brasileira integrando de verdade as lojas físicas com a busca de grupos. Já estou na fila da Beta!",
      createdAtUtc: "2026-09-01T12:30:00Z",
    },
    {
      id: 2,
      postId: 1,
      authorName: "Beatriz N.",
      authorAvatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      content: "A Taverna com discussões permanentes vai salvar a vida de quem perde posts em chats e grupos de mensagens instantâneas. Parabéns!",
      createdAtUtc: "2026-09-01T16:45:00Z",
    },
  ],
  2: [
    {
      id: 3,
      postId: 2,
      authorName: "Mestre Fernando",
      authorAvatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      content: "O ponto sobre o ritmo de 15 dias é cirúrgico. Menos pressão sobre o mestre e presença quase 100% garantida dos jogadores.",
      createdAtUtc: "2026-09-05T09:15:00Z",
    },
  ],
  3: [
    {
      id: 4,
      postId: 3,
      authorName: "Camila Geek Store",
      authorAvatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
      content: "Cadastramos nosso espaço e os jogadores já estão elogiando a facilidade de reservar a mesa pelo app!",
      createdAtUtc: "2026-09-08T11:20:00Z",
    },
  ],
};
