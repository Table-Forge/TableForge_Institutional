# TableForge Institutional Portal

Portal web oficial do **TableForge**, consolidando a presença institucional da marca, o blog de conteúdo educativo e o fórum comunitário permanente (**A Taverna**).

---

## Visão Geral

O projeto foi concebido como a evolução natural de uma landing page pontual para o portal completo do ecossistema TableForge, conectando a comunidade digital às experiências presenciais de RPG de mesa, board games e trading card games (TCG).

O portal reúne:
- **Áreas segmentadas**: Jornadas dedicadas para Jogadores, Mestres, Lojas Físicas e Organizadores de Eventos.
- **A Taverna (Fórum Permanente)**: Ativo estratégico de aquisição orgânica e retenção, com discussões indexáveis e categorias temáticas.
- **Blog (Máquina de Conteúdo)**: Guias de mestre, relatos da série *Rotas da Forja* e sinergia direta com os debates da Taverna.
- **Parceiro Fundador (B2B)**: Captação e credenciamento de lojas físicas e espaços geek com reservas de mesas.

---

## Stack Tecnológica

- **Next.js 16.2.1** (App Router com Turbopack)
- **React 19.2.4**
- **TypeScript 5**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **React Hook Form + Zod** (`@hookform/resolvers`)
- **Lucide React**
- **Design System Dark/HUD** oficial do TableForge

---

## Módulos do Sistema

### 1. Institucional & Segmentos
- `/` — **Home do Portal**: Hero central (*"Forje sua mesa. Encontre sua comunidade."*), pilares da plataforma, seções para os 4 públicos, feed da Taverna e prévias do Blog.
- `/sobre` — **Manifesto da Forja**: História da criação do TableForge, a dor da fragmentação no RPG e os 4 alicerces da comunidade.
- `/equipe` — **Quem Forja o TableForge**: Apresentação dos fundadores e desenvolvedores com bios, sistemas favoritos e links sociais.

### 2. Parcerias & B2B
- `/para-lojas` — **Programa Parceiro Fundador**: Apresentação das vantagens para lojas geek (visibilidade no mapa, reservas pelo app e kit presencial) com formulário interativo de candidatura.

### 3. Blog & Conteúdo Educativo
- `/blog` — **Catálogo de Artigos**: Barra de busca textual em tempo real, filtros por categoria temática e card em destaque.
- `/blog/[slug]` — **Leitura do Post**: Artigo completo com tempo estimado, tags, banner cruzado convidando para a Taverna e área interativa de comentários.

### 4. A Taverna (Fórum Permanente)
- `/taverna` — **Hub Comunitário**: Catálogo das 7 categorias temáticas (*Salão Principal*, *Procuro Mesa*, *Mestres & Narradores*, *Sistemas*, *Criação & Worldbuilding*, *Eventos & Espaços*, *Table Forge*), contadores e modal de criação de discussões.
- `/taverna/[category]` — **Feed por Categoria**: Listagem filtrada com ordenação por *Mais Recentes*, *Mais Respondidos* e *Mais Votados*.
- `/taverna/topico/[slug]` — **Thread Completa**: Discussão com post original, badges de reconhecimento comunitário (`FerreiroFundador`, `MestreDaForja`, `ParceiroFundador`), upvotes interativos, respostas encadeadas e formulário de réplica.

---

## Design System

O projeto opera exclusivamente no tema **Dark/HUD**:

| Token | Hex / Valor | Aplicação |
|---|---|---|
| `background` | `#000000` | Fundo principal da aplicação |
| `primary` | `#3a3a3a` | Superfícies de cards, painéis e inputs |
| `secondary` / `tertiary` | `#ff2400` | Acentos de fogo, destaque e ações principais |
| `white` | `#faf3e0` | Tom creme suave/pergaminho para tipografia |
| `grays` | `#F1F1F1` a `#1E1E1E` | Escala de cinzas para bordas e textos secundários |

Badges comunitárias temáticas:
- **Ferreiro Fundador**: Acento ouro antigo (apoiadores pioneiros da comunidade).
- **Mestre da Forja**: Acento púrpura místico (narradores experientes).
- **Parceiro Fundador**: Acento carmesim forja (lojas e espaços credenciados).
- **Criador da Forja**: Acento ciano (produtores de conteúdo parceiros).
- **Moderador**: Acento fogo vermelho vivo.

---

## SEO & Dados Estruturados (JSON-LD)

- **Discussões d'A Taverna**: Injeção dinâmica do schema `DiscussionForumPosting` (com autor, contagem de respostas e upvotes).
- **Artigos do Blog**: Injeção dinâmica do schema `BlogPosting` (com título, capa, autor e data UTC).
- **Metadados Dinâmicos**: Função `generateMetadata` configurada para indexação fluida no Google.

---

## Estrutura de Pastas

```txt
TableForge_Institutional/
├── app/
│   ├── globals.css                # Tema e tokens Tailwind v4
│   ├── layout.tsx                 # Root layout com Header e Footer
│   ├── page.tsx                   # Home do Portal
│   ├── sobre/page.tsx             # Sobre / Manifesto
│   ├── equipe/page.tsx            # Equipe
│   ├── para-lojas/page.tsx        # B2B Lojas & Espaços
│   ├── blog/                      # Módulo do Blog
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── taverna/                   # Módulo A Taverna
│       ├── page.tsx
│       ├── [category]/page.tsx
│       └── topico/[slug]/page.tsx
├── components/
│   ├── ui/                        # Primitivas visuais (Button, Badge, Card, etc.)
│   ├── layout/                    # Header e Footer responsivos
│   ├── blog/                      # Componentes do Blog
│   └── taverna/                   # Componentes d'A Taverna
├── data/                          # Mocks realistas locais
├── docs/
│   └── conventions/               # Convenções permanentes do projeto
├── public/                        # Assets estáticos e favicons
└── schemas/                       # Schemas Zod e contratos de dados
```

---

## Como Rodar Localmente

### Pré-requisitos
- Node.js 18+ (recomendado 20+)
- npm ou yarn

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Lint
```bash
npm run lint
# ou
npx eslint
```

### Build de Produção
```bash
npm run build
```

---

## Documentação e Convenções

As decisões e padrões arquiteturais do projeto estão versionados em:
- [Estrutura do Projeto](docs/conventions/project-structure.md)
- [Estilos e Tailwind v4](docs/conventions/styling.md)
- [Componentes](docs/conventions/components.md)
- [Rotas e SEO](docs/conventions/routing-and-seo.md)
- [Formulários e Dados](docs/conventions/forms-and-data.md)
