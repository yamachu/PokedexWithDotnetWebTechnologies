type Props = {
  DataSourceGetter: () => string;
};

type ReturnValues<T> = {
  migration: () => Promise<void>;
  fetchCapturedPokemons: () => Promise<number[]>;
  putCapturedPokemon: (id: number) => Promise<void>;
  deleteCapturedPokemon: (id: number) => Promise<void>;
} & T;

export type FunctionType<T = {}> = (props: Props) => ReturnValues<T>;
