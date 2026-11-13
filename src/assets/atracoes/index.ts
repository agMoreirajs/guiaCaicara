import type { ImageSourcePropType } from 'react-native';

// Chave = id da atração (igual ao do database.ts)
export const IMAGENS_ATRACOES: Record<string, ImageSourcePropType> = {
  // Santos
  'santos-aquario': require('./santos/bonde.png'),
  'santos-museu-cafe': require('./santos/museuCafe.png'),
  'santos-gonzaga': require('./santos/quebraMar.jpg'),

  // São Vicente
  'saovicente-porchat': require('./sao-vicente/parqueVila.png'),
  'saovicente-centro-historico': require('./sao-vicente/pierAmor.png'),
  'saovicente-gonzaguinha': require('./sao-vicente/telefericoCoca.png'),

  // Praia Grande
  'pgrande-orla': require('./praia-grande/disney.png'),
  'pgrande-boqueirao': require('./praia-grande/portinho.jpg'),
  'pgrande-ciclovia': require('./praia-grande/serraMar.jpg'),

  // Peruíbe
  'peruibe-guarau': require('./peruibe/estacaoEcologica.jpg'),
  'peruibe-abarebebe': require('./peruibe/praca.jpg'),
  'peruibe-jureia': require('./peruibe/ruinas.jpg'),

  // Mongaguá
  'mongagua-praia-central': require('./mongagua/monumento sao pedro.jpg'),
  'mongagua-itaguacu': require('./mongagua/pier.jpg'),
  'mongagua-trilhas': require('./mongagua/praia-mongagua.jpg'),

  // Itanhaém
  'itanhaem-matriz': require('./itanhaem/igrejaSant\'ana.jpg'),
  'itanhaem-sonho': require('./itanhaem/passarelaAnchieta.jpg'),
  'itanhaem-rio': require('./itanhaem/praiaSonhos.jpg'),

  // Guarujá
  'guaruja-enseada': require('./guaruja/ForteAndradas.jpg'),
  'guaruja-forte-andradas': require('./guaruja/MiranteMorroGalhetas.jpg'),
  'guaruja-pitangueiras': require('./guaruja/museuFortalezaSantoAmaro.jpg'),

  // Cubatão
  'cubatao-caminho-do-mar': require('./cubatao/CachoeiraVéudaNoiva.jpg'),
  'cubatao-usina-henry-borden': require('./cubatao/parqueCaminhoMar.jpg'),
  'cubatao-parque-serra': require('./cubatao/PierdoCasqueiro.jpg'),

  // Bertioga
  'bertioga-forte-sao-joao': require('./bertioga/forte SaoPedro.jpg'),
  'bertioga-boraceia': require('./bertioga/Parque-dos-Tupiniquins.jpg'),
  'bertioga-canal': require('./bertioga/Ruinas-da-Igreja-de-Santo-Antônio-de-Guaiê.jpg'),
};