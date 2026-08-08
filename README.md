# Site institucional — Dra. Caroline de Lima Floriano (Odontologia)

Site institucional em React + TypeScript para o consultório da Dra. Caroline de Lima
Floriano (CRO-SP 158663), em Mairinque – SP. Projeto 100% estático (sem backend, sem
banco de dados), pronto para publicar na Vercel.

## Estrutura de pastas

```
src/
  components/   Componentes de UI reutilizáveis (Button, Icon, Modal, Accordion, etc.)
  sections/     Uma pasta por seção da página (Header, Hero, About, Treatments, ...)
  data/         Dados do consultório, separados da apresentação (contato, tratamentos, FAQ...)
  types/        Tipos TypeScript compartilhados
  utils/        Funções utilitárias (link do WhatsApp, validação de formulário)
  assets/       Imagens (as 4 fotos enviadas foram copiadas para assets/images)
  styles/       CSS global e variáveis de design (paleta de cores, tipografia, espaçamento)
public/         robots.txt, sitemap.xml, favicon
```

## Decisões de arquitetura

- **Vite + React + TypeScript**, sem framework adicional (Next.js, etc.), já que o site
  não precisa de backend, rotas server-side ou SSR — é um site de página única.
- **CSS Modules** por componente/seção, com variáveis globais em `src/styles/variables.css`
  para manter a identidade visual consistente sem duplicar valores.
- **Dados separados de apresentação**: qualquer texto ou informação que pode mudar
  (tratamentos, FAQ, horários, Instagram, dados de contato) vive em `src/data/*.ts`,
  nunca dentro dos componentes.
- **Sem bibliotecas externas desnecessárias**: os ícones são SVGs inline em um único
  componente (`Icon.tsx`), evitando dependências como bibliotecas de ícones de terceiros.
- **Acessibilidade nativa sempre que possível**: o FAQ usa `<details>/<summary>`, e o
  modal de política de privacidade usa o elemento nativo `<dialog>` — ambos já vêm com
  bom suporte a teclado e leitores de tela sem JavaScript extra.
- **Formulário de contato sem backend**: os campos são validados no navegador e, ao
  serem enviados, montam uma mensagem que abre o WhatsApp via `wa.me`, usando
  `encodeURIComponent` para evitar links quebrados.
- **Elemento visual assinatura**: um arco dourado fino (`SmileArc`) sob os títulos de
  seção e uma moldura com topo arqueado (`FramedPhoto`) para as fotografias, remetendo
  à curva de um sorriso sem recorrer a ícones infantis.

## Instalar e rodar localmente

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

O site estático abre em `http://localhost:5173`. Para executar também a função
`/api/reviews`, use o ambiente local da Vercel:

```bash
copy .env.local .env
npm run dev:vercel
```

O site e a API estarão disponíveis na URL informada pela CLI (normalmente
`http://localhost:3000`). O arquivo `.env` é ignorado pelo Git e deve conter,
no mínimo, `GOOGLE_PLACES_API_KEY` e `GOOGLE_PLACE_ID`. Nunca coloque esses
valores no código ou em variáveis `VITE_*`.

Para conferir erros de tipo antes de publicar:

```bash
npm run lint
```

Para gerar a build de produção localmente:

```bash
npm run build
npm run preview
```

## Publicar na Vercel

1. Suba este projeto para um repositório Git (GitHub, GitLab ou Bitbucket).
2. Em [vercel.com](https://vercel.com), clique em "New Project" e selecione o repositório.
3. A Vercel detecta automaticamente que é um projeto Vite — não é necessário configurar
   nada manualmente (build command: `npm run build`, output directory: `dist`).
4. Clique em "Deploy".

Alternativamente, pela CLI:

```bash
npm install -g vercel
vercel
```

Na Vercel, configure `GOOGLE_PLACES_API_KEY` e `GOOGLE_PLACE_ID` em
Project Settings > Environment Variables antes do deploy. As avaliações são
buscadas no Google pelo backend e cacheadas por 24 horas para evitar chamadas
desnecessárias e custos da Places API.

## ⚠️ Informações que precisam ser confirmadas pela Dra. Caroline antes de publicar

Tudo abaixo foi deixado como texto de exemplo, marcado no código com comentários
"CONFIRMAR", exatamente para não inventar nenhuma informação odontológica, legal ou
comercial. Onde alterar:

| Informação | Onde está no código | O que fazer |
|---|---|---|
| Fotografias | `src/assets/images/` e `src/data/images.ts` | As 4 fotos enviadas já foram incluídas. Substitua os arquivos e/ou os textos alternativos (`alt`) se trocar as imagens. |
| Horário de atendimento | `src/data/contactInfo.ts` (`openingHours`) | Preencha os horários reais (ex.: "08:00 às 18:00"). |
| Instagram | `src/data/contactInfo.ts` (`instagramHandle`) | Insira o usuário real (sem @). Enquanto estiver `undefined`, o link fica oculto no site. |
| Tratamentos oferecidos | `src/data/treatments.ts` | Revise a lista e remova/ajuste qualquer tratamento que não seja realmente oferecido. |
| Convênios | `src/data/faqs.ts` (pergunta "O consultório atende convênios?") | A resposta atual direciona ao WhatsApp de propósito. Só inclua nomes de convênios se forem confirmados. |
| Formas de pagamento | `src/data/faqs.ts` (pergunta "Quais formas de pagamento são aceitas?") | Mesma lógica acima — direciona ao WhatsApp até haver confirmação. |
| Formação, especializações e cursos | `src/data/professional.ts` | Atualmente marcados como "A confirmar com a profissional". Substitua pelos dados reais e verificados. |
| Depoimentos de pacientes | `src/data/testimonials.ts` | São exemplos genéricos (`isPlaceholder: true`). Substitua por depoimentos reais e autorizados. |
| Domínio final do site | `index.html`, `public/robots.txt`, `public/sitemap.xml` | Troque `https://www.draCarolineFloriano.com.br/` pelo domínio real após a compra/configuração. |
| Imagem de compartilhamento (Open Graph) | `index.html` (`og:image`) e `public/og-cover.jpg` | Adicione uma imagem de 1200x630px em `public/og-cover.jpg` (ainda não incluída). |
| Crédito de desenvolvimento | `src/sections/Footer/Footer.tsx` | Substitua "a confirmar" pelo crédito desejado, ou remova a linha. |

## Revisão como desenvolvedor sênior

**Pontos fortes:**
- Dados e apresentação bem separados; qualquer atualização de conteúdo (tratamentos,
  FAQ, contato) não exige mexer em componentes.
- Componentes pequenos e de responsabilidade única (nenhum arquivo passa de ~150 linhas).
- Tipagem explícita em todas as props e nos dados (`types/`), sem uso de `any`.
- Acessibilidade tratada como requisito, não como extra: HTML semântico
  (`<nav>`, `<section>`, `<article>`, `<blockquote>`, `<details>`), labels associados a
  campos, `aria-live`/`role="alert"` nos erros do formulário, foco visível,
  `prefers-reduced-motion` respeitado, e navegação por teclado funcional em todos os
  componentes interativos (menu mobile, acordeão do FAQ, modal).
- Performance: imagens com `width`/`height` definidos (evita layout shift), `loading="lazy"`
  em todas as imagens abaixo da dobra, apenas a imagem do Hero é carregada com prioridade,
  nenhuma dependência de UI pesada, sem vídeos autoplay, sem animações custosas.
- SEO: title, meta description, canonical, Open Graph, Twitter card, JSON-LD (`Dentist`)
  com apenas dados confirmados, sitemap.xml e robots.txt.
- Segurança: nenhuma chave, senha ou token no código; `dangerouslySetInnerHTML` não é
  usado em nenhum componente; aviso explícito no formulário para não enviar dados de
  saúde sensíveis; links externos usam `rel="noopener noreferrer"`.
- Ética publicitária: nenhuma promessa de resultado, nenhuma expressão proibida
  ("resultado garantido", "sorriso perfeito", "o melhor tratamento"), nome e CRO da
  profissional visíveis no cabeçalho, seção Sobre e rodapé, sem fotos de antes/depois,
  sem comparação com outros profissionais.

**Problema encontrado e corrigido durante a revisão:**
- O componente `Button` tinha um bug em que um `className` externo (usado, por exemplo,
  para o botão "Agendar consulta" do cabeçalho) sobrescrevia completamente as classes de
  estilo do botão, em vez de somar a elas. Isso foi corrigido para mesclar as classes
  corretamente (`src/components/Button.tsx`).

**Limitações conhecidas, deixadas de propósito:**
- O projeto não foi executado com `npm install`/`npm run build` neste ambiente (sem
  acesso à internet para baixar pacotes). Recomenda-se rodar `npm install && npm run lint`
  localmente antes do primeiro deploy, para confirmar que não há erros de tipo.
- O `og:image` aponta para `/og-cover.jpg`, que ainda não existe — é necessário criar
  essa imagem antes de publicar, ou remover a tag caso não seja prioridade.
- Textos de tratamentos, formação/especializações e depoimentos são propositalmente
  genéricos ou marcados como "a confirmar", conforme instruído — não devem ir ao ar sem
  revisão da Dra. Caroline.
