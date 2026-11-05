import type { ImageSourcePropType } from 'react-native';

export type Endereco = {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export type Atracao = {
  id: string;
  nome: string;
  categoria: string;
  imagem: ImageSourcePropType;
  endereco: Endereco;
  horarios: string;
  historia: string;
};

export type AtracaoComCidade = Atracao & {
  cidadeId: string;
  cidadeNome: string;
};

export type Cidade = {
  id: string;
  nome: string;
  slogan: string;
  imagem: ImageSourcePropType;
  atracoes: Atracao[];
};