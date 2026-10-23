import { ESSAYS, LINKS, NAME, TOOLS } from './shared'
import type { Content } from './types'

export const pt: Content = {
  locale: 'pt',
  htmlLang: 'pt-BR',
  path: '/pt/',
  meta: {
    title: `${NAME}, linguista computacional e engenheiro de PLN`,
    description:
      'Jonathan Torres é linguista computacional e engenheiro de PLN em São Paulo, doutor em Linguística pela USP. Pipelines de LLM, avaliação e ferramentas de revisão humana.',
  },
  nav: {
    about: 'Sobre',
    work: 'Trabalho',
    loom: 'O tear',
    writing: 'Escrita',
    contact: 'Contato',
    switchLabel: 'English',
    switchHref: '/',
    switchLang: 'en',
    skip: 'Pular para o conteúdo',
  },
  hero: {
    headline: 'A língua, desmontada e montada de novo.',
    intro:
      'Sou Jonathan Torres, linguista computacional e engenheiro de PLN em São Paulo. Doutor em Linguística pela USP, hoje na Clarice.ai.',
    hint: 'Passe o cursor sobre o tecido para tecer um trecho de novo. Clique para tecer tudo outra vez.',
    clothLabel:
      'Um tecido generativo de azulejos geométricos em vermelho, verde, dourado e preto, tecido a partir da frase abaixo.',
  },
  about: {
    heading: 'Sobre',
    paragraphs: [
      'Passei dez anos estudando como as pessoas querem dizer as coisas: semântica formal, pragmática e o jeito como crianças que aprendem português descobrem o que o "ou" implica. O código esteve junto o tempo todo. Fiz a graduação com ênfase em PLN e tratei os dados do doutorado em Python.',
      'Desde 2023 trabalho com pipelines de LLM de ponta a ponta: desenho de prompts, avaliação, monitoramento, deploy e as ferramentas de revisão humana em volta deles. Na Slyng fui o primeiro contratado e construí um pipeline de monitoramento de atendimento que cortou o custo de cada análise em 77%. Na Brick Abode construí um pipeline que escreve testes unitários para linguagens procedurais do PostgreSQL. Hoje sou linguista computacional e engenheiro de PLN na Clarice.ai.',
      'A maioria dos engenheiros não consegue dizer por que a saída de um modelo está errada em termos linguísticos, muito menos transformar isso numa avaliação. Eu consigo. A maioria dos linguistas para na teoria. Eu não paro, porque também sou engenheiro, e a análise vira produto rodando.',
      'Fora do expediente, cozinho, treino jiu-jitsu e sou supervisionado por uma gata preta que, ao contrário de mim, nunca bateu.',
    ],
    photoAlt: 'Jonathan Torres, olhando para a câmera, de barba curta.',
    languagesHeading: 'Línguas que falo',
    languages: [
      { name: 'Português', level: 4, note: 'nativo' },
      { name: 'English', level: 3, note: 'profissional' },
      { name: 'Español', level: 2, note: 'intermediário' },
      { name: 'Français', level: 1, note: 'básico' },
    ],
    toolsHeading: 'Ferramentas que uso',
    tools: TOOLS,
  },
  work: {
    heading: 'Trabalho',
    lead: 'Dez anos de linguística, depois engenharia.',
    laneLabels: { industry: 'Indústria', research: 'Pesquisa', teaching: 'Ensino' },
    present: 'atual',
    roles: [
      {
        org: 'Clarice.ai',
        title: 'Linguista computacional e engenheiro de PLN',
        start: '2026-08',
        end: null,
        lane: 'industry',
        location: 'São Paulo',
        bullets: ['Análise linguística e engenharia de PLN para um assistente de escrita em português.'],
      },
      {
        org: 'Slyng',
        title: 'Engenheiro de IA, primeiro contratado',
        start: '2024-05',
        end: '2026-08',
        lane: 'industry',
        location: 'São Paulo',
        bullets: [
          'Construí e mantive pipelines de LLM com o ciclo completo de LLMOps: engenharia de prompts, avaliação, monitoramento e deploy.',
          'Desenhei um pipeline que lê transcrições de atendimento ao cliente e escreve relatórios de avaliação completos sozinho.',
          'Construí um portal de revisão humana para os analistas aprovarem a saída da IA em poucos cliques, no lugar de um processo manual.',
          'Cortei o custo de cada análise em 77%, de R$ 9,86 para R$ 2,24.',
        ],
      },
      {
        org: 'Brick Abode',
        title: 'Engenheiro de software',
        start: '2023-12',
        end: '2024-06',
        lane: 'industry',
        location: 'Virgínia, EUA (remoto)',
        bullets: [
          'Construí um pipeline que usa um LLM para gerar testes unitários para linguagens procedurais do PostgreSQL, rodados com xUnit.',
          'O tempo para gerar e rodar um teste caiu mais de 75%; um teste aprovado custava US$ 0,22 nos preços de 2024.',
          'Testei funcionalidades do PL/.NET e acompanhei e reportei os custos do projeto.',
        ],
      },
      {
        org: 'e2f',
        title: 'Anotador de dados',
        start: '2023-10',
        end: '2023-11',
        lane: 'industry',
        brief: true,
      },
      {
        org: 'CAPES',
        title: 'Pesquisador de doutorado, Universidade de São Paulo',
        start: '2019-03',
        end: '2023-02',
        lane: 'research',
        location: 'São Paulo',
        bullets: [
          'Pesquisa em aquisição de linguagem, lógica, semântica e pragmática, sobre como crianças adquirem implicaturas escalares em português brasileiro.',
          'Transcrevi e revisei mais de 100 horas de áudio, que viraram um corpus anotado de fala espontânea longitudinal.',
          'Trabalhei com dados de três grandes corpora.',
        ],
      },
      {
        org: 'USP',
        title: 'Estagiário docente em linguística (PAE)',
        start: '2022-01',
        end: '2022-07',
        lane: 'teaching',
        brief: true,
      },
      {
        org: 'Appen',
        title: 'Avaliador de redes sociais',
        start: '2018-09',
        end: '2018-12',
        lane: 'industry',
        brief: true,
      },
      {
        org: 'CAPES',
        title: 'Pesquisador de mestrado, Universidade Federal de São Carlos',
        start: '2016-03',
        end: '2018-02',
        lane: 'research',
        location: 'São Carlos',
        bullets: ['Psicolinguística teórica, semântica e pragmática.'],
      },
      {
        org: 'UFSCar',
        title: 'Dei aulas de Introdução à Linguística para uma turma de 40',
        start: '2017-01',
        end: '2017-07',
        lane: 'teaching',
        brief: true,
      },
      {
        org: 'FAPESP',
        title: 'Iniciação científica em semântica formal',
        start: '2014-05',
        end: '2015-10',
        lane: 'research',
        brief: true,
      },
    ],
    earlierHeading: 'Antes disso',
    educationHeading: 'Formação',
    education: [
      { degree: 'Doutorado em linguística', school: 'Universidade de São Paulo', years: '2018–2023' },
      { degree: 'Mestrado em linguística', school: 'Universidade Federal de São Carlos', years: '2016–2018' },
      {
        degree: 'Bacharelado em linguística, ênfase em processamento de linguagem natural',
        school: 'Universidade Federal de São Carlos',
        years: '2012–2015',
      },
    ],
    projectsHeading: 'Projetos',
    projectsLead:
      'Cada projeto é marcado com o azulejo que o nome completo dele tece. Digite o nome no tear, mais abaixo, e o mesmo azulejo aparece.',
    projects: [
      {
        name: 'Avaliador automático de atendimentos',
        where: 'Slyng, 2024–2026',
        summary:
          'Um pipeline com agentes de IA que lê transcrições de atendimento ao cliente e escreve um relatório de avaliação completo, mais um portal em que os analistas aprovam ou corrigem o resultado em poucos cliques. O cliente saiu de menos de 1% dos contatos monitorados para cinco vezes a cobertura, com a mesma equipe e 77% menos custo por avaliação.',
        stack: 'Python, LangChain, LangSmith, PostgreSQL, AWS',
        link: { label: 'Case publicado pela Slyng', href: LINKS.slyngCase },
      },
      {
        name: 'Testes unitários escritos por um modelo',
        where: 'Brick Abode, 2023–2024',
        summary:
          'Gera testes xUnit para linguagens procedurais do PostgreSQL a partir do código da função. Mais de 75% mais rápido do que escrever à mão; um teste aprovado custava US$ 0,22.',
        stack: 'Python, .NET, PostgreSQL, PL/.NET',
      },
      {
        name: 'eLLixir',
        where: 'Pessoal, 2025',
        summary:
          'Um bot de Discord em Elixir que conversa com modelos locais via Ollama ou LM Studio. Escrito para aprender a linguagem: árvores de supervisão, pattern matching, Task.Supervisor para concorrência.',
        stack: 'Elixir, Nostrum, Ollama',
        link: { label: 'Código no GitHub', href: LINKS.ellixir },
      },
      {
        name: 'Gerador de texto para Discord',
        where: 'Pessoal, 2023',
        summary:
          'Coleta as mensagens de um canal e gera mensagens novas com cadeias de Markov sobre um modelo de n-gramas. PLN à moda antiga, sem rede neural nenhuma.',
        stack: 'Python, spaCy',
        link: { label: 'Código no GitHub', href: LINKS.textgen },
      },
      {
        name: 'Libraree',
        where: 'Pessoal, 2021',
        summary: 'Uma fila de leitura que vive inteira no seu navegador. Sem conta, sem servidor.',
        stack: 'JavaScript, localStorage',
        link: { label: 'Abrir o app', href: LINKS.libraree },
      },
      {
        name: 'Este site',
        where: '2026',
        summary:
          'Este site é um tokenizador que tece pano. Cada azulejo desta página sai de uma única função que transforma uma string em forma, cor e rotação. Experimente no tear, logo abaixo.',
        stack: 'React, TypeScript, Canvas',
        link: { label: 'Código no GitHub', href: LINKS.repo },
      },
    ],
  },
  loom: {
    heading: 'O tear',
    lead: 'Escreva uma frase e um tokenizador simples, baseado em regras, vai dividi-la em pedaços; cada um vira um azulejo. A forma e a rotação saem de um hash do texto; a cor, da classe da palavra.',
    inputLabel: 'Frase para tecer',
    defaultText: 'Toda língua é um tecido de padrões, e todo padrão é uma mensagem.',
    legend: {
      function: 'palavra funcional (artigos, preposições, pronomes, auxiliares)',
      content: 'palavra de conteúdo, vermelha ou verde conforme o hash',
      punct: 'pontuação',
      piece: 'o final de uma palavra longa que o tokenizador separou',
    },
    whole: 'A frase inteira, tecida num azulejo só. É assim que nasce o marcador ao lado de cada projeto.',
    note: 'Não existe nenhum modelo de linguagem por trás disto, só regras. O tokenizador separa por espaços e pontuação, corta sufixos de uma lista curta e reconhece palavras de classe fechada em português, inglês, espanhol e francês. Ele erra, o que é um retrato justo dos tokenizadores em geral.',
    count: (tokens, closed, pieces) =>
      `${tokens} tokens, ${closed} palavras funcionais, ${pieces} pedaços separados.`,
  },
  writing: {
    heading: 'Escrita',
    paperHeading: 'Artigo',
    paper: {
      authors: 'Torres, J., & Grolla, E.',
      year: 2024,
      title:
        'Scalar implicatures in the acquisition of Brazilian Portuguese: an Optimality-Theoretic analysis for the connective "or"',
      venue: 'Gragoatá, 29(64)',
      href: LINKS.paper,
      linkLabel: 'Ler na SciELO',
    },
    essaysHeading: 'Ensaios',
    essaysLead: 'Textos de divulgação, no Medium.',
    essays: ESSAYS,
  },
  contact: {
    heading: 'Contato',
    lead: 'Aberto a conversas sobre PLN, avaliação de LLMs e vagas em que um linguista que entrega faz diferença.',
    emailLabel: 'E-mail',
    links: [
      { label: 'LinkedIn', href: LINKS.linkedin },
      { label: 'GitHub', href: LINKS.github },
      { label: 'Medium', href: LINKS.medium },
      { label: 'Stack Overflow', href: LINKS.stackoverflow },
    ],
    resume: { label: 'Baixar meu currículo', href: LINKS.resume },
  },
  footer: {
    text: 'Jonathan Torres, São Paulo. Composto em Syne e Literata, tecido com React e um canvas.',
    source: 'Código-fonte',
  },
}
