import { ESSAYS, LINKS, NAME, TOOLS } from './shared'
import type { Content } from './types'

export const en: Content = {
  locale: 'en',
  htmlLang: 'en',
  path: '/',
  meta: {
    title: `${NAME}, computational linguist and NLP engineer`,
    description:
      'Jonathan Torres is a computational linguist and NLP engineer in São Paulo, with a PhD in Linguistics from the University of São Paulo. LLM pipelines, evaluation and human-in-the-loop tooling.',
  },
  nav: {
    about: 'About',
    work: 'Work',
    loom: 'The loom',
    writing: 'Writing',
    contact: 'Contact',
    switchLabel: 'Português',
    switchHref: '/pt/',
    switchLang: 'pt-BR',
    skip: 'Skip to content',
  },
  hero: {
    headline: 'Language, taken apart and put back together.',
    intro:
      "I'm Jonathan Torres, a computational linguist and NLP engineer in São Paulo. PhD in Linguistics from the University of São Paulo, now at Clarice.ai.",
    hint: 'Move over the cloth to re-weave a patch. Click to weave it all again.',
    clothLabel:
      'A generative cloth of geometric tiles in red, green, gold and black, woven from the sentence below.',
  },
  about: {
    heading: 'About',
    paragraphs: [
      'I spent ten years studying how people mean things: formal semantics, pragmatics, and how children learning Brazilian Portuguese work out what "or" implies. Code was there the whole time. My bachelor\'s had a concentration in natural language processing, and I handled my PhD data in Python.',
      "Since 2023 I've worked on LLM pipelines end to end: prompt design, evaluation, monitoring, deployment, and the human-in-the-loop tooling around them. At Slyng I was the first hire and built a customer-service monitoring pipeline that cut the cost of each analysis by 77%. At Brick Abode I built a pipeline that writes unit tests for PostgreSQL procedural languages. Now I'm a computational linguist and NLP engineer at Clarice.ai.",
      "Most engineers can't say why a model's output is wrong in linguistic terms, let alone turn that into an evaluation. I can. Most linguists stop at the theory. I don't, because I'm an engineer as well, and the analysis ends up as a product that runs.",
      "Off the clock I cook, train Brazilian jiu-jitsu, and I'm supervised by a black cat who, unlike me, has never tapped.",
    ],
    photoAlt: 'Jonathan Torres, looking at the camera, with a short beard.',
    languagesHeading: 'Languages I speak',
    languages: [
      { name: 'Português', level: 4, note: 'native' },
      { name: 'English', level: 3, note: 'full professional' },
      { name: 'Español', level: 2, note: 'limited working' },
      { name: 'Français', level: 1, note: 'elementary' },
    ],
    toolsHeading: 'Tools I reach for',
    tools: TOOLS,
  },
  work: {
    heading: 'Work',
    lead: 'Ten years of linguistics, then engineering.',
    laneLabels: { industry: 'Industry', research: 'Research', teaching: 'Teaching' },
    present: 'present',
    roles: [
      {
        org: 'Clarice.ai',
        title: 'Computational linguist and NLP engineer',
        start: '2026-08',
        end: null,
        lane: 'industry',
        location: 'São Paulo',
        bullets: ['Linguistic analysis and NLP engineering for a Portuguese-language writing assistant.'],
      },
      {
        org: 'Slyng',
        title: 'AI engineer, first hire',
        start: '2024-05',
        end: '2026-08',
        lane: 'industry',
        location: 'São Paulo',
        bullets: [
          'Built and ran LLM pipelines with the full LLMOps loop: prompt engineering, evaluation, monitoring, deployment.',
          'Designed a pipeline that reads customer-support transcripts and writes complete evaluation reports on its own.',
          'Built a human-in-the-loop review portal so analysts could approve AI output in a few clicks, replacing a manual process.',
          'Cut the cost of each analysis by 77%, from R$ 9.86 to R$ 2.24.',
        ],
      },
      {
        org: 'Brick Abode',
        title: 'Software engineer',
        start: '2023-12',
        end: '2024-06',
        lane: 'industry',
        location: 'Virginia, US (remote)',
        bullets: [
          'Built a pipeline that uses an LLM to generate unit tests for PostgreSQL procedural languages, run through xUnit.',
          'Cut the time to generate and run a test by more than 75%; a passing test cost $0.22 on 2024 pricing.',
          'Tested features for PL/.NET and tracked and reported project costs.',
        ],
      },
      {
        org: 'e2f',
        title: 'Data annotator',
        start: '2023-10',
        end: '2023-11',
        lane: 'industry',
        brief: true,
      },
      {
        org: 'CAPES',
        title: 'Doctoral researcher, Universidade de São Paulo',
        start: '2019-03',
        end: '2023-02',
        lane: 'research',
        location: 'São Paulo',
        bullets: [
          'Research on language acquisition, logic, semantics and pragmatics, on how children acquire scalar implicatures in Brazilian Portuguese.',
          'Transcribed and proofread more than 100 hours of audio into an annotated corpus of spontaneous longitudinal speech.',
          'Worked with data from three large corpora.',
        ],
      },
      {
        org: 'USP',
        title: 'Teaching assistant in linguistics (PAE)',
        start: '2022-01',
        end: '2022-07',
        lane: 'teaching',
        brief: true,
      },
      {
        org: 'Appen',
        title: 'Social media evaluator',
        start: '2018-09',
        end: '2018-12',
        lane: 'industry',
        brief: true,
      },
      {
        org: 'CAPES',
        title: "Master's researcher, Universidade Federal de São Carlos",
        start: '2016-03',
        end: '2018-02',
        lane: 'research',
        location: 'São Carlos',
        bullets: ['Theoretical psycholinguistics, semantics and pragmatics.'],
      },
      {
        org: 'UFSCar',
        title: 'Taught Introduction to Linguistics to a class of 40',
        start: '2017-01',
        end: '2017-07',
        lane: 'teaching',
        brief: true,
      },
      {
        org: 'FAPESP',
        title: 'Undergraduate researcher in formal semantics',
        start: '2014-05',
        end: '2015-10',
        lane: 'research',
        brief: true,
      },
    ],
    earlierHeading: 'Earlier',
    educationHeading: 'Education',
    education: [
      { degree: 'PhD in Linguistics', school: 'Universidade de São Paulo', years: '2018–2023' },
      { degree: "Master's in Linguistics", school: 'Universidade Federal de São Carlos', years: '2016–2018' },
      {
        degree: "Bachelor's in Linguistics, concentration in natural language processing",
        school: 'Universidade Federal de São Carlos',
        years: '2012–2015',
      },
    ],
    projectsHeading: 'Projects',
    projectsLead:
      'Each project is marked with the tile its full name weaves. Type the name into the loom below and you get the same tile back.',
    projects: [
      {
        name: 'Automated support-call grader',
        where: 'Slyng, 2024–2026',
        summary:
          'A pipeline of AI agents that reads customer-support transcripts and writes a complete evaluation report, plus a review portal where analysts approve or fix the result in a few clicks. The client went from monitoring under 1% of contacts to five times the coverage with the same team, at 77% less per evaluation.',
        stack: 'Python, LangChain, LangSmith, PostgreSQL, AWS',
        link: { label: "Case study on Slyng's site (in Portuguese)", href: LINKS.slyngCase },
      },
      {
        name: 'Unit tests written by a model',
        where: 'Brick Abode, 2023–2024',
        summary:
          'Generates xUnit tests for PostgreSQL procedural languages from the function source. More than 75% faster than writing them by hand; a passing test cost $0.22.',
        stack: 'Python, .NET, PostgreSQL, PL/.NET',
      },
      {
        name: 'eLLixir',
        where: 'Personal, 2025',
        summary:
          'A Discord bot in Elixir that talks to local models through Ollama or LM Studio. Written to learn the language: supervision trees, pattern matching, Task.Supervisor for concurrency.',
        stack: 'Elixir, Nostrum, Ollama',
        link: { label: 'Source on GitHub', href: LINKS.ellixir },
      },
      {
        name: 'Discord text generator',
        where: 'Personal, 2023',
        summary:
          'Collects messages from a channel and generates new ones with Markov chains over an n-gram model. Old-school NLP, no neural network in sight.',
        stack: 'Python, spaCy',
        link: { label: 'Source on GitHub', href: LINKS.textgen },
      },
      {
        name: 'Libraree',
        where: 'Personal, 2021',
        summary: 'A reading backlog that lives entirely in your browser. No account, no server.',
        stack: 'JavaScript, localStorage',
        link: { label: 'Open the app', href: LINKS.libraree },
      },
      {
        name: 'This site',
        where: '2026',
        summary:
          'A tokenizer that weaves cloth. Every tile on this page comes from one function that turns a string into a shape, a colour and a rotation. Try it in the loom below.',
        stack: 'React, TypeScript, Canvas',
        link: { label: 'Source on GitHub', href: LINKS.repo },
      },
    ],
  },
  loom: {
    heading: 'The loom',
    lead: 'Type a sentence. A small rule-based tokenizer splits it into pieces, and each piece becomes a tile: shape and rotation from a hash of the piece, colour from its word class.',
    inputLabel: 'Sentence to weave',
    defaultText: 'Every language is a cloth of patterns, and every pattern is a message.',
    legend: {
      function: 'function word (articles, prepositions, pronouns, auxiliaries)',
      content: 'content word, red or green by hash',
      punct: 'punctuation',
      piece: 'the tail of a long word the tokenizer split off',
    },
    whole: 'The whole sentence, woven as one tile. This is how the marker next to each project is made.',
    note: 'There is no model behind this. It uses whitespace, punctuation, a suffix list and a list of closed-class words in Portuguese, English, Spanish and French. It gets things wrong, which is a fair picture of tokenizers in general.',
    count: (tokens, closed, pieces) =>
      `${tokens} tokens, ${closed} of them function words, ${pieces} split pieces.`,
  },
  writing: {
    heading: 'Writing',
    paperHeading: 'Paper',
    paper: {
      authors: 'Torres, J., & Grolla, E.',
      year: 2024,
      title:
        'Scalar implicatures in the acquisition of Brazilian Portuguese: an Optimality-Theoretic analysis for the connective "or"',
      venue: 'Gragoatá, 29(64)',
      href: LINKS.paper,
      linkLabel: 'Read on SciELO',
    },
    essaysHeading: 'Essays',
    essaysLead: 'Written in Portuguese, for a general audience, on Medium.',
    essays: ESSAYS,
  },
  contact: {
    heading: 'Contact',
    lead: 'Open to conversations about NLP, LLM evaluation, and roles where a linguist who ships is useful.',
    emailLabel: 'Email',
    links: [
      { label: 'LinkedIn', href: LINKS.linkedin },
      { label: 'GitHub', href: LINKS.github },
      { label: 'Medium', href: LINKS.medium },
      { label: 'Stack Overflow', href: LINKS.stackoverflow },
    ],
    resume: { label: 'Download my resume', href: LINKS.resume },
  },
  footer: {
    text: 'Jonathan Torres, São Paulo. Set in Syne and Literata, woven with React and a canvas.',
    source: 'Source code',
  },
}
