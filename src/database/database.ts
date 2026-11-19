import { PLACEHOLDER } from '@/src/assets';
import { IMAGENS_ATRACOES } from '@/src/assets/atracoes';
import type { AtracaoComCidade, Cidade, Endereco } from '@/src/types';


const endereco = (
  rua: string,
  numero: string,
  bairro: string,
  cidade: string
): Endereco => ({ rua, numero, bairro, cidade, estado: 'SP' });

export const cidades: Cidade[] = [
  // Santos
  {
    id: 'santos',
    nome: 'Santos',
    slogan: 'Porto, orla e história',
    imagem: require('../assets/cidades/santos.png'),
    atracoes: [
      {
        id: 'santos-aquario',
        nome: 'Aquário Municipal de Santos',
        categoria: 'Cultura e Natureza',
        imagem: IMAGENS_ATRACOES['santos-aquario'],
        endereco: endereco('Av. Bartolomeu de Gusmão', 'S/N', 'Ponta da Praia', 'Santos'),
        horarios: 'Terça a domingo, 9h às 17h (confirmar antes da visita)',
        historia:
          'Tradicional aquário da orla santista, dedicado à biodiversidade marinha e à educação ambiental.',
      },
      {
        id: 'santos-museu-cafe',
        nome: 'Museu do Café',
        categoria: 'História e Patrimônio',
        imagem: IMAGENS_ATRACOES['santos-museu-cafe'],
        endereco: endereco('Rua 15 de Novembro', '95', 'Centro', 'Santos'),
        horarios: 'Terça a domingo, 10h às 17h (confirmar)',
        historia:
          'Instalado no antigo prédio da Bolsa Oficial do Café, conta a trajetória do café que impulsionou o porto.',
      },
      {
        id: 'santos-gonzaga',
        nome: 'Praia do Gonzaga',
        categoria: 'Praia',
        imagem: IMAGENS_ATRACOES['santos-gonzaga'],
        endereco: endereco('Av. Ana Costa', 'S/N', 'Gonzaga', 'Santos'),
        horarios: 'Aberta 24 horas',
        historia:
          'Uma das praias mais movimentadas da cidade, famosa pelo calçadão e pela vida esportiva.',
        coordenadas: { latitude: -23.969759, longitude: -46.336023, },
      },
    ],
  },

  // São Vicente
  {
    id: 'sao-vicente',
    nome: 'São Vicente',
    slogan: 'Primeira vila do Brasil',
    imagem: require('../assets/cidades/sao-vicente.png'),
    atracoes: [
      {
        id: 'saovicente-porchat',
        nome: 'Ilha Porchat',
        categoria: 'Praia e Mirante',
        imagem: IMAGENS_ATRACOES['saovicente-porchat'],
        endereco: endereco('Av. Presidente Kennedy', 'S/N', 'Ilha Porchat', 'São Vicente'),
        horarios: 'Acesso livre, 24 horas',
        historia:
          'Península ligada ao continente, conhecida por praias calmas e mirantes com vista para o mar.',
      },
      {
        id: 'saovicente-centro-historico',
        nome: 'Centro Histórico de São Vicente',
        categoria: 'Patrimônio Histórico',
        imagem: IMAGENS_ATRACOES['saovicente-centro-historico'],
        endereco: endereco('Praça Barão do Rio Branco', 'S/N', 'Centro', 'São Vicente'),
        horarios: 'Acesso livre durante o dia',
        historia:
          'Fundada em 1532 por Martim Afonso de Sousa, a vila guarda casarios e marcos da colonização do litoral.',
      },
      {
        id: 'saovicente-gonzaguinha',
        nome: 'Praia do Gonzaguinha',
        categoria: 'Praia',
        imagem: IMAGENS_ATRACOES['saovicente-gonzaguinha'],
        endereco: endereco('Av. Presidente Wilson', 'S/N', 'Gonzaguinha', 'São Vicente'),
        horarios: 'Aberta 24 horas',
        historia:
          'Praia urbana de ondas moderadas, frequentada por surfistas e famílias ao longo do ano.',
      },
    ],
  },

  // Peruíbe
  {
    id: 'peruibe',
    nome: 'Peruíbe',
    slogan: 'Natureza e tranquilidade',
    imagem: require('../assets/cidades/peruibe.png'),
    atracoes: [
      {
        id: 'peruibe-guarau',
        nome: 'Praia do Guaraú',
        categoria: 'Natureza e Praia',
        imagem: IMAGENS_ATRACOES['peruibe-guarau'],
        endereco: endereco('Estrada do Guaraú', 'S/N', 'Guaraú', 'Peruíbe'),
        horarios: 'Aberta 24 horas (estacionamentos com horário comercial)',
        historia:
          'Praia extensa e preservada, com águas tranquilas e forte presença da vegetação de restinga.',
      },
      {
        id: 'peruibe-abarebebe',
        nome: 'Ruínas do Abarebebê',
        categoria: 'Patrimônio Histórico',
        imagem: IMAGENS_ATRACOES['peruibe-abarebebe'],
        endereco: endereco('Av. Beira-Mar', 'S/N', 'Abarebebê', 'Peruíbe'),
        horarios: 'Acesso livre',
        historia:
          'Remanescentes de antigas construções de pedra ligadas à ocupação colonial do litoral sul.',
      },
      {
        id: 'peruibe-jureia',
        nome: 'Reserva Ecológica da Juréia-Itatins',
        categoria: 'Ecoturismo',
        imagem: IMAGENS_ATRACOES['peruibe-jureia'],
        endereco: endereco('Rodovia Pe. Manoel da Nóbrega', 'S/N', 'Centro', 'Peruíbe'),
        horarios: 'Terça a domingo, 8h às 17h (consultar agendamento)',
        historia:
          'Uma das maiores áreas preservadas de Mata Atlântica do estado, com trilhas, rios e grande biodiversidade.',
      },
    ],
  },

  // Praia Grande
  {
    id: 'praia-grande',
    nome: 'Praia Grande',
    slogan: 'Sol, mar e lazer',
    imagem: require('../assets/cidades/praia-grande.png'),
    atracoes: [
      {
        id: 'pgrande-disney',
        nome: 'Loja Oficial Disney (Litoral Plaza)',
        categoria: 'Compras e Lazer',
        imagem: IMAGENS_ATRACOES['pgrande-disney'],
        endereco: endereco('Av. Ayrton Senna da Silva', '1511', 'Xixová', 'Praia Grande'),
        horarios: 'Segunda a sábado das 10h às 22h; domingos e feriados das 12h às 21h',
        historia:
          'Localizada no Litoral Plaza Shopping, é a primeira loja licenciada da Disney na Baixada Santista, reunindo produtos oficiais de personagens clássicos, Marvel, Star Wars e Pixar em um espaço temático.',
      },
      {
        id: 'pgrande-portinho',
        nome: "Portinho - Área de Lazer Ézio Dall'Acqua",
        categoria: 'Cultura e Natureza',
        imagem: IMAGENS_ATRACOES['pgrande-portinho'],
        endereco: endereco('Rua Paulo Sérgio Garcia', 'S/N', 'Sítio do Campo', 'Praia Grande'),
        horarios: 'Todos os dias, das 7h às 18h',
        historia:
          'Localizado às margens do Mar Pequeno, o Portinho é uma ampla área de lazer ecológica em Praia Grande com quiosques, playgrounds, quadras esportivas, píer para pesca e aluguel de barcos, cercado por manguezais preservados.',
      },

      {
        id: 'pgrande-serra-mar',
        nome: 'Trilha da Cachoeira do Laranjal',
        categoria: 'Cultura e Natureza', // ajuste conforme as categorias definidas no seu tipo
        imagem: IMAGENS_ATRACOES['pgrande-serra-mar'],
        endereco: endereco('Estrada do Rio Branco', 'S/N', 'Sítio do Campo', 'Praia Grande'),
        horarios: 'Terça a domingo, das 8h às 17h (visitas mediante agendamento)',
        historia:
          'Maior corredor biológico da Mata Atlântica no Brasil, o parque preserva encostas, nascentes e trilhas ecológicas em Praia Grande, oferecendo contato direto com a biodiversidade nativa e mirantes naturais da região.',
      },
    ],
  },

  // Mongaguá
  {
    id: 'mongagua',
    nome: 'Mongaguá',
    slogan: 'Mar e Mata Atlântica',
    imagem: require('../assets/cidades/mongagua.png'),
    atracoes: [
      {
        id: 'mongagua-praia-central',
        nome: 'Praia Central de Mongaguá',
        categoria: 'Praia',
        imagem: IMAGENS_ATRACOES['mongagua-praia-central'],
        endereco: endereco('Av. Presidente Kennedy', 'S/N', 'Centro', 'Mongaguá'),
        horarios: 'Aberta 24 horas',
        historia:
          'Praia tranquila de águas calmas, tradicionalmente frequentada por famílias e pescadores artesanais.',
      },
      {
        id: 'mongagua-monumento-sao-pedro',
        nome: 'Monumento São Pedro',
        categoria: 'História e Patrimônio', // ajuste conforme as categorias definidas no seu projeto
        imagem: IMAGENS_ATRACOES['mongagua-monumento-sao-pedro'],
        endereco: endereco('Av. Governador Mário Covas Júnior', 'S/N', 'Centro', 'Mongaguá'),
        horarios: 'Acesso livre 24 horas',
        historia:
          'Localizado na orla de Mongaguá, o monumento homenageia São Pedro, padroeiro dos pescadores, simbolizando a forte tradição pesqueira, a fé da comunidade caiçara e a identidade cultural do município.',
      },
      {
        id: 'mongagua-trilhas',
        nome: 'Plataforma de Pesca de Mongaguá',
        categoria: 'Lazer e Pesca',
        imagem: IMAGENS_ATRACOES['mongagua-trilhas'],
        endereco: endereco('Av. Governador Mário Covas Júnior', 'S/N', 'Agenor de Campos', 'Mongaguá'),
        horarios: 'Todos os dias, 24 horas',
        historia:
          'Uma das maiores plataformas de pesca em concreto armado da América Latina, avançando 400 metros mar adentro e oferecendo vista panorâmica da orla.',
      },
    ],
  },

  // Itanhaém
  {
    id: 'itanhaem',
    nome: 'Itanhaém',
    slogan: 'Berço histórico do litoral sul',
    imagem: require('../assets/cidades/itanhaem.png'),
    atracoes: [
      {
        id: 'itanhaem-matriz',
        nome: 'Igreja Matriz de Nossa Senhora da Conceição',
        categoria: 'Patrimônio Histórico',
        imagem: IMAGENS_ATRACOES['itanhaem-matriz'],
        endereco: endereco('Praça Narciso de Andrade', 'S/N', 'Centro', 'Itanhaém'),
        horarios: 'Visitação diurna (confirmar horários de missa)',
        historia:
          'Uma das igrejas mais antigas do litoral paulista, marco da fundação da vila no período colonial.',
      },
      {
        id: 'itanhaem-sonho',
        nome: 'Praia do Sonho',
        categoria: 'Praia',
        imagem: IMAGENS_ATRACOES['itanhaem-sonho'],
        endereco: endereco('Av. Beira-Mar', 'S/N', 'Sonho', 'Itanhaém'),
        horarios: 'Aberta 24 horas',
        historia:
          'Praia de mar calmo, com faixa de areia extensa e acesso a restaurantes de frutos do mar.',
      },
      {
        id: 'itanhaem-rio',
        nome: 'Passeio pelo Rio Itanhaém',
        categoria: 'Passeio e Pesca',
        imagem: IMAGENS_ATRACOES['itanhaem-rio'],
        endereco: endereco('Av. Marginal', 'S/N', 'Centro', 'Itanhaém'),
        horarios: 'Diariamente, conforme disponibilidade dos barqueiros',
        historia:
          'Passeios de barco pelo rio que corta a cidade, uma forma tradicional de conhecer a vida ribeirinha.',
      },


    ],
  },

  // Guarujá
  {
    id: 'guaruja',
    nome: 'Guarujá',
    slogan: 'A pérola do litoral',
    imagem: require('../assets/cidades/guaruja.png'),
    atracoes: [
      {
        id: 'guaruja-enseada',
        nome: 'Praia da Enseada',
        categoria: 'Praia e Gastronomia',
        imagem: IMAGENS_ATRACOES['guaruja-enseada'],
        endereco: endereco('Av. Dom Pedro I', 'S/N', 'Enseada', 'Guarujá'),
        horarios: 'Aberta 24 horas',
        historia:
          'Uma das praias mais conhecidas da ilha, com prédios de frente para o mar e forte vida gastronômica.',
      },
      {
        id: 'guaruja-forte-andradas',
        nome: 'Forte dos Andradas',
        categoria: 'Patrimônio Histórico',
        imagem: IMAGENS_ATRACOES['guaruja-forte-andradas'],
        endereco: endereco('Rua do Forte', 'S/N', 'Morrinhos', 'Guarujá'),
        horarios: 'Visitação diurna (confirmar)',
        historia:
          'Fortificação histórica erguida para defender o acesso ao canal de Santos durante o período colonial.',
      },
      {
        id: 'guaruja-fortaleza-santo-amaro',
        nome: 'Fortaleza de Santo Amaro da Barra Grande',
        categoria: 'História e Patrimônio', // ajuste conforme as categorias definidas no seu projeto
        imagem: IMAGENS_ATRACOES['guaruja-fortaleza-santo-amaro'],
        endereco: endereco('Rua Messias Borges', '380', 'Santa Cruz dos Navegantes', 'Guarujá'),
        horarios: 'Terça a domingo, das 9h às 17h',
        historia:
          'Construída no século XVI durante o período da União Ibérica para defender o canal de acesso ao Porto de Santos, a fortaleza preserva muralhas de pedra, canhões históricos, capela e vista privilegiada para a baía.',
      },
    ],
  },

  // Cubatão
  {
    id: 'cubatao',
    nome: 'Cubatão',
    slogan: 'Serra, história e indústria',
    imagem: require('../assets/cidades/cubatao.png'),
    atracoes: [
      {
        id: 'cubatao-caminho-do-mar',
        nome: 'Caminho do Mar',
        categoria: 'Natureza e História',
        imagem: IMAGENS_ATRACOES['cubatao-caminho-do-mar'],
        endereco: endereco('Estrada Caminho do Mar', 'S/N', 'Alto da Serra', 'Cubatão'),
        horarios: 'Diariamente, sujeito a restrições em dias de chuva',
        historia:
          'Antiga estrada que liga o planalto ao litoral, marco da engenharia brasileira e hoje área de preservação.',
      },
      {
        id: 'cubatao-usina-henry-borden',
        nome: 'Usina Henry Borden',
        categoria: 'Patrimônio Industrial',
        imagem: IMAGENS_ATRACOES['cubatao-usina-henry-borden'],
        endereco: endereco('Rua Henry Borden', 'S/N', 'Centro', 'Cubatão'),
        horarios: 'Visitação mediante agendamento (confirmar)',
        historia:
          'Usina hidrelétrica histórica que impulsionou o desenvolvimento industrial da região da Baixada Santista.',
      },
      {
        id: 'cubatao-parque-serra',
        nome: 'Parque Estadual Serra do Mar',
        categoria: 'Ecoturismo',
        imagem: IMAGENS_ATRACOES['cubatao-parque-serra'],
        endereco: endereco('Estrada do Caminho do Mar', 'S/N', 'Alto da Serra', 'Cubatão'),
        horarios: 'Terça a domingo, 8h às 17h (confirmar)',
        historia:
          'Parte do maior remanescente contínuo de Mata Atlântica do país, com trilhas e cachoeiras.',
      },
    ],
  },

  // Bertioga
  {
    id: 'bertioga',
    nome: 'Bertioga',
    slogan: 'Entre o mar e a Mata Atlântica',
    imagem: require('../assets/cidades/bertioga.png'),
    atracoes: [
      {
        id: 'bertioga-forte-sao-joao',
        nome: 'Fortaleza de São João',
        categoria: 'Patrimônio Histórico',
        imagem: IMAGENS_ATRACOES['bertioga-forte-sao-joao'],
        endereco: endereco('Rua Forte São João', 'S/N', 'Centro', 'Bertioga'),
        horarios: 'Terça a domingo, 9h às 17h (confirmar)',
        historia:
          'Construída no século XVI para proteger a entrada do canal de Bertioga, é uma das fortificações mais antigas do país.',
      },
      {
        id: 'bertioga-boraceia',
        nome: 'Praia de Boraceia',
        categoria: 'Praia',
        imagem: IMAGENS_ATRACOES['bertioga-boraceia'],
        endereco: endereco('Estrada de Boraceia', 'S/N', 'Boraceia', 'Bertioga'),
        horarios: 'Aberta 24 horas',
        historia:
          'Praia de faixa extensa e pouco urbanizada, cercada pela Mata Atlântica e ideal para dias de tranquilidade.',
      },
      {
        id: 'bertioga-sesc',
        nome: 'Sesc Bertioga',
        categoria: 'Cultura e Lazer', // ajuste conforme as categorias definidas no seu projeto
        imagem: IMAGENS_ATRACOES['bertioga-sesc'],
        endereco: endereco('Rua Pastor Djalma da Silva Coimbra', '20', 'Jardim Rio da Praia', 'Bertioga'),
        horarios: 'Terça a domingo, das 8h às 18h (programação cultural conforme agenda)',
        historia:
          'Referência nacional em lazer, turismo social e educação ambiental no litoral paulista, o Sesc Bertioga conta com ampla área verde preservada, trilhas ecológicas, espaços culturais, esportivos e programação aberta ao público.',
      },
    ],
  },
];

// ---------- Helpers ----------

// Junta a foto real (se existir no mapa) ou usa o placeholder
export const todasAtracoes: AtracaoComCidade[] = cidades.flatMap((cidade) =>
  cidade.atracoes.map((atracao) => ({
    ...atracao,
    imagem: IMAGENS_ATRACOES[atracao.id] ?? PLACEHOLDER,
    cidadeId: cidade.id,
    cidadeNome: cidade.nome,
  }))
);

const normalizar = (texto: string = ''): string =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export const getCidadeById = (id: string): Cidade | undefined =>
  cidades.find((c) => c.id === id);

export const getAtracaoById = (id: string): AtracaoComCidade | undefined =>
  todasAtracoes.find((a) => a.id === id);

export const buscarCidades = (termo: string): Cidade[] => {
  const t = normalizar(termo);
  if (!t) return cidades;
  return cidades.filter(
    (c) => normalizar(c.nome).includes(t) || normalizar(c.slogan).includes(t)
  );
};

export const buscarAtracoes = (termo: string): AtracaoComCidade[] => {
  const t = normalizar(termo);
  if (!t) return [];
  return todasAtracoes.filter(
    (a) =>
      normalizar(a.nome).includes(t) ||
      normalizar(a.categoria).includes(t) ||
      normalizar(a.cidadeNome).includes(t)
  );
};