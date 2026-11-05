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
  {
    id: 'santos',
    nome: 'Santos',
    slogan: 'Porto, orla e história',
    imagem: require('../assets/cidades/santos.jpg'),
    atracoes: [
      {
        id: 'santos-aquario',
        nome: 'Aquário Municipal de Santos',
        categoria: 'Cultura e Natureza',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Bartolomeu de Gusmão', 'S/N', 'Ponta da Praia', 'Santos'),
        horarios: 'Terça a domingo, 9h às 17h (confirmar antes da visita)',
        historia:
          'Tradicional aquário da orla santista, dedicado à biodiversidade marinha e à educação ambiental.',
      },
      {
        id: 'santos-museu-cafe',
        nome: 'Museu do Café',
        categoria: 'História e Patrimônio',
        imagem: PLACEHOLDER,
        endereco: endereco('Rua 15 de Novembro', '95', 'Centro', 'Santos'),
        horarios: 'Terça a domingo, 10h às 17h (confirmar)',
        historia:
          'Instalado no antigo prédio da Bolsa Oficial do Café, conta a trajetória do café que impulsionou o porto.',
      },
      {
        id: 'santos-gonzaga',
        nome: 'Praia do Gonzaga',
        categoria: 'Praia',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Ana Costa', 'S/N', 'Gonzaga', 'Santos'),
        horarios: 'Aberta 24 horas',
        historia:
          'Uma das praias mais movimentadas da cidade, famosa pelo calçadão e pela vida esportiva.',
      },
    ],
  },
  {
    id: 'sao-vicente',
    nome: 'São Vicente',
    slogan: 'Primeira vila do Brasil',
    imagem: require('../assets/cidades/sao-vicente.jpg'),
    atracoes: [
      {
        id: 'saovicente-porchat',
        nome: 'Ilha Porchat',
        categoria: 'Praia e Mirante',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Presidente Kennedy', 'S/N', 'Ilha Porchat', 'São Vicente'),
        horarios: 'Acesso livre, 24 horas',
        historia:
          'Península ligada ao continente, conhecida por praias calmas e mirantes com vista para o mar.',
      },
      {
        id: 'saovicente-centro-historico',
        nome: 'Centro Histórico de São Vicente',
        categoria: 'Patrimônio Histórico',
        imagem: PLACEHOLDER,
        endereco: endereco('Praça Barão do Rio Branco', 'S/N', 'Centro', 'São Vicente'),
        horarios: 'Acesso livre durante o dia',
        historia:
          'Fundada em 1532 por Martim Afonso de Sousa, a vila guarda casarios e marcos da colonização do litoral.',
      },
      {
        id: 'saovicente-gonzaguinha',
        nome: 'Praia do Gonzaguinha',
        categoria: 'Praia',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Presidente Wilson', 'S/N', 'Gonzaguinha', 'São Vicente'),
        horarios: 'Aberta 24 horas',
        historia:
          'Praia urbana de ondas moderadas, frequentada por surfistas e famílias ao longo do ano.',
      },
    ],
  },
  {
    id: 'peruibe',
    nome: 'Peruíbe',
    slogan: 'Natureza e tranquilidade',
    imagem: require('../assets/cidades/peruibe.jpg'),
    atracoes: [
      {
        id: 'peruibe-guarau',
        nome: 'Praia do Guaraú',
        categoria: 'Natureza e Praia',
        imagem: PLACEHOLDER,
        endereco: endereco('Estrada do Guaraú', 'S/N', 'Guaraú', 'Peruíbe'),
        horarios: 'Aberta 24 horas (estacionamentos com horário comercial)',
        historia:
          'Praia extensa e preservada, com águas tranquilas e forte presença da vegetação de restinga.',
      },
      {
        id: 'peruibe-abarebebe',
        nome: 'Ruínas do Abarebebê',
        categoria: 'Patrimônio Histórico',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Beira-Mar', 'S/N', 'Abarebebê', 'Peruíbe'),
        horarios: 'Acesso livre',
        historia:
          'Remanescentes de antigas construções de pedra ligadas à ocupação colonial do litoral sul.',
      },
      {
        id: 'peruibe-jureia',
        nome: 'Reserva Ecológica da Juréia-Itatins',
        categoria: 'Ecoturismo',
        imagem: PLACEHOLDER,
        endereco: endereco('Rodovia Pe. Manoel da Nóbrega', 'S/N', 'Centro', 'Peruíbe'),
        horarios: 'Terça a domingo, 8h às 17h (consultar agendamento)',
        historia:
          'Uma das maiores áreas preservadas de Mata Atlântica do estado, com trilhas, rios e grande biodiversidade.',
      },
    ],
  },
  {
    id: 'praia-grande',
    nome: 'Praia Grande',
    slogan: 'Sol, mar e lazer',
    imagem: require('../assets/cidades/praia-grande.jpg'),
    atracoes: [
      {
        id: 'pgrande-orla',
        nome: 'Orla da Praia Grande',
        categoria: 'Orla e Lazer',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Presidente Kennedy', 'S/N', 'Vila Caiçara', 'Praia Grande'),
        horarios: 'Aberta 24 horas',
        historia:
          'Extensa faixa de areia com quiosques e espaços de lazer, muito procurada por famílias e esportistas.',
      },
      {
        id: 'pgrande-boqueirao',
        nome: 'Praia do Boqueirão',
        categoria: 'Praia',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Presidente Kennedy', 'S/N', 'Boqueirão', 'Praia Grande'),
        horarios: 'Aberta 24 horas',
        historia:
          'Trecho da orla com ondas adequadas para iniciantes e uma tradicional vida de bairro à beira-mar.',
      },
      {
        id: 'pgrande-ciclovia',
        nome: 'Ciclovia da Orla',
        categoria: 'Esporte e Lazer',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Presidente Kennedy', 'S/N', 'Tupi', 'Praia Grande'),
        horarios: 'Diariamente, o dia todo',
        historia:
          'Percurso plano e contínuo, ideal para caminhadas, corridas e passeios de bicicleta com vista para o mar.',
      },
    ],
  },
  {
    id: 'mongagua',
    nome: 'Mongaguá',
    slogan: 'Mar e Mata Atlântica',
    imagem: require('../assets/cidades/mongagua.jpg'),
    atracoes: [
      {
        id: 'mongagua-praia-central',
        nome: 'Praia Central de Mongaguá',
        categoria: 'Praia',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Presidente Kennedy', 'S/N', 'Centro', 'Mongaguá'),
        horarios: 'Aberta 24 horas',
        historia:
          'Praia tranquila de águas calmas, tradicionalmente frequentada por famílias e pescadores artesanais.',
      },
      {
        id: 'mongagua-itaguacu',
        nome: 'Praia de Itaguaçu',
        categoria: 'Natureza e Praia',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Beira-Mar', 'S/N', 'Itaguaçu', 'Mongaguá'),
        horarios: 'Aberta 24 horas',
        historia:
          'Trecho mais reservado da costa, cercado por vegetação nativa e ideal para um dia mais silencioso.',
      },
      {
        id: 'mongagua-trilhas',
        nome: 'Trilhas da Mata Atlântica',
        categoria: 'Ecoturismo',
        imagem: PLACEHOLDER,
        endereco: endereco('Estrada da Mata', 'S/N', 'Jardim Central', 'Mongaguá'),
        horarios: 'Diariamente, durante o dia (recomendado com guia)',
        historia:
          'Caminhadas por áreas remanescentes de Mata Atlântica, com boa observação de aves e fauna local.',
      },
    ],
  },
  {
    id: 'itanhaem',
    nome: 'Itanhaém',
    slogan: 'Berço histórico do litoral sul',
    imagem: require('../assets/cidades/itanhaem.jpg'),
    atracoes: [
      {
        id: 'itanhaem-matriz',
        nome: 'Igreja Matriz de Nossa Senhora da Conceição',
        categoria: 'Patrimônio Histórico',
        imagem: PLACEHOLDER,
        endereco: endereco('Praça Narciso de Andrade', 'S/N', 'Centro', 'Itanhaém'),
        horarios: 'Visitação diurna (confirmar horários de missa)',
        historia:
          'Uma das igrejas mais antigas do litoral paulista, marco da fundação da vila no período colonial.',
      },
      {
        id: 'itanhaem-sonho',
        nome: 'Praia do Sonho',
        categoria: 'Praia',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Beira-Mar', 'S/N', 'Sonho', 'Itanhaém'),
        horarios: 'Aberta 24 horas',
        historia:
          'Praia de mar calmo, com faixa de areia extensa e acesso a restaurantes de frutos do mar.',
      },
      {
        id: 'itanhaem-rio',
        nome: 'Passeio pelo Rio Itanhaém',
        categoria: 'Passeio e Pesca',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Marginal', 'S/N', 'Centro', 'Itanhaém'),
        horarios: 'Diariamente, conforme disponibilidade dos barqueiros',
        historia:
          'Passeios de barco pelo rio que corta a cidade, uma forma tradicional de conhecer a vida ribeirinha.',
      },
    ],
  },
  {
    id: 'guaruja',
    nome: 'Guarujá',
    slogan: 'A pérola do litoral',
    imagem: require('../assets/cidades/guaruja.jpg'),
    atracoes: [
      {
        id: 'guaruja-enseada',
        nome: 'Praia da Enseada',
        categoria: 'Praia e Gastronomia',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Dom Pedro I', 'S/N', 'Enseada', 'Guarujá'),
        horarios: 'Aberta 24 horas',
        historia:
          'Uma das praias mais conhecidas da ilha, com prédios de frente para o mar e forte vida gastronômica.',
      },
      {
        id: 'guaruja-forte-andradas',
        nome: 'Forte dos Andradas',
        categoria: 'Patrimônio Histórico',
        imagem: PLACEHOLDER,
        endereco: endereco('Rua do Forte', 'S/N', 'Morrinhos', 'Guarujá'),
        horarios: 'Visitação diurna (confirmar)',
        historia:
          'Fortificação histórica erguida para defender o acesso ao canal de Santos durante o período colonial.',
      },
      {
        id: 'guaruja-pitangueiras',
        nome: 'Praia das Pitangueiras',
        categoria: 'Praia',
        imagem: PLACEHOLDER,
        endereco: endereco('Av. Miguel Stéfano', 'S/N', 'Pitangueiras', 'Guarujá'),
        horarios: 'Aberta 24 horas',
        historia:
          'Praia central e movimentada, conhecida pelo agito de bares, restaurantes e comércio local.',
      },
    ],
  },
  {
    id: 'cubatao',
    nome: 'Cubatão',
    slogan: 'Serra, história e indústria',
    imagem: require('../assets/cidades/cubatao.jpg'),
    atracoes: [
      {
        id: 'cubatao-caminho-do-mar',
        nome: 'Caminho do Mar',
        categoria: 'Natureza e História',
        imagem: PLACEHOLDER,
        endereco: endereco('Estrada Caminho do Mar', 'S/N', 'Alto da Serra', 'Cubatão'),
        horarios: 'Diariamente, sujeito a restrições em dias de chuva',
        historia:
          'Antiga estrada que liga o planalto ao litoral, marco da engenharia brasileira e hoje área de preservação.',
      },
      {
        id: 'cubatao-usina-henry-borden',
        nome: 'Usina Henry Borden',
        categoria: 'Patrimônio Industrial',
        imagem: PLACEHOLDER,
        endereco: endereco('Rua Henry Borden', 'S/N', 'Centro', 'Cubatão'),
        horarios: 'Visitação mediante agendamento (confirmar)',
        historia:
          'Usina hidrelétrica histórica que impulsionou o desenvolvimento industrial da região da Baixada Santista.',
      },
      {
        id: 'cubatao-parque-serra',
        nome: 'Parque Estadual Serra do Mar',
        categoria: 'Ecoturismo',
        imagem: PLACEHOLDER,
        endereco: endereco('Estrada do Caminho do Mar', 'S/N', 'Alto da Serra', 'Cubatão'),
        horarios: 'Terça a domingo, 8h às 17h (confirmar)',
        historia:
          'Parte do maior remanescente contínuo de Mata Atlântica do país, com trilhas e cachoeiras.',
      },
    ],
  },
  {
    id: 'bertioga',
    nome: 'Bertioga',
    slogan: 'Entre o mar e a Mata Atlântica',
    imagem: require('../assets/cidades/bertioga.jpg'),
    atracoes: [
      {
        id: 'bertioga-forte-sao-joao',
        nome: 'Fortaleza de São João',
        categoria: 'Patrimônio Histórico',
        imagem: PLACEHOLDER,
        endereco: endereco('Rua Forte São João', 'S/N', 'Centro', 'Bertioga'),
        horarios: 'Terça a domingo, 9h às 17h (confirmar)',
        historia:
          'Construída no século XVI para proteger a entrada do canal de Bertioga, é uma das fortificações mais antigas do país.',
      },
      {
        id: 'bertioga-boraceia',
        nome: 'Praia de Boraceia',
        categoria: 'Praia',
        imagem: PLACEHOLDER,
        endereco: endereco('Estrada de Boraceia', 'S/N', 'Boraceia', 'Bertioga'),
        horarios: 'Aberta 24 horas',
        historia:
          'Praia de faixa extensa e pouco urbanizada, cercada pela Mata Atlântica e ideal para dias de tranquilidade.',
      },
      {
        id: 'bertioga-canal',
        nome: 'Passeio pelo Canal de Bertioga',
        categoria: 'Passeio de Barco',
        imagem: PLACEHOLDER,
        endereco: endereco('Canal de Bertioga', 'S/N', 'Centro', 'Bertioga'),
        horarios: 'Diariamente, conforme o movimento de embarcações',
        historia:
          'Passeios de barco pelo canal que separa a cidade de Guarujá, com vista para manguezais e ilhas.',
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