import type { BaseFunctionType } from "./types/Types";

type Props = {
  DataSourceGetter: () => string;
};

type ReturnValues = {
  migration: () => Promise<void>;
  fetchCapturedPokemons: () => Promise<number[]>;
  putCapturedPokemon: (id: number) => Promise<void>;
  deleteCapturedPokemon: (id: number) => Promise<void>;
};

export type FunctionType<P = {}, T = {}> = BaseFunctionType<
  Props & P,
  ReturnValues & T
>;
