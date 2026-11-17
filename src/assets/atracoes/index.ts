import type { ImageSourcePropType } from 'react-native';

// Chave = id da atração (igual ao do database.ts)
export const IMAGENS_ATRACOES: Record<string, ImageSourcePropType> = {
  // Santos
  'santos-aquario': require('./santos/aquario.jpg'),
  'santos-museu-cafe': require('./santos/museuCafe.png'),
  'santos-gonzaga': require('./santos/praia-do-gonzaga.jpg'),

  // São Vicente
  'saovicente-porchat': require('./saoVicente/porchat.jpg'),
  'saovicente-centro-historico': require('./saoVicente/centroHistorico.jpeg'),
  'saovicente-gonzaguinha': require('./saoVicente/praia-do-gonzaguinha.jpg'),

  // Praia Grande
  'pgrande-disney': require('./praiaGrande/disney.jpeg'),
  'pgrande-portinho': require('./praiaGrande/portinho.jpg'),
  'pgrande-serra-mar': require('./praiaGrande/serraMar.webp'),

  // Peruíbe
  'peruibe-guarau': require('./peruibe/praiaGuarau.jpg'),
  'peruibe-abarebebe': require('./peruibe/RuinasAbarebebe.jpg'),
  'peruibe-jureia': require('./peruibe/jureia.jpg'),


  // Mongaguá
  'mongagua-praia-central': require('./mongagua/praia-mongagua.jpg'),
  'mongagua-monumento-sao-pedro': require('./mongagua/monumento sao pedro.jpg'),
  'mongagua-trilhas': require('./mongagua/pier.jpg'),

  // Itanhaém
  'itanhaem-matriz': require('./itanhaem/igrejaMatriz.jpeg'),
  'itanhaem-sonho': require('./itanhaem/praiaSonhos.jpg'),
  'itanhaem-rio': require('./itanhaem/rioItanhaem.jpg'),

  // Guarujá
  'guaruja-enseada': require('./guaruja/praiaEnseada.webp'),
  'guaruja-forte-andradas': require('./guaruja/ForteAndradas.webp'),
  'guaruja-fortaleza-santo-amaro': require('./guaruja/museuFortalezaSantoAmaro.webp'), // mantenha o nome e extensão exatos do arquivo na sua pasta

  // Cubatão
  'cubatao-caminho-do-mar': require('./cubatao/parqueCaminhoMar.jpg'),
  'cubatao-usina-henry-borden': require('./cubatao/usina.jpg'),
  'cubatao-parque-serra': require('./cubatao/parqueEstadual.jpg'),

  // Bertioga
  'bertioga-forte-sao-joao': require('./bertioga/forte SaoPedro.jpg'),
  'bertioga-boraceia': require('./bertioga/praiaBoraceia.webp'),
  'bertioga-sesc': require('./bertioga/Sesc-Bertioga.png'),
};