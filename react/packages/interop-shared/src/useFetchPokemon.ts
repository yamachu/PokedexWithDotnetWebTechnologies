import { type Pokemon } from "./types/Contract";

type Props = {
  DataSourceGetter: () => string;
};

type ReturnValues<T> = {
  fetchPokemons: () => Promise<Pokemon[]>;
} & T;

export type FunctionType<T = {}> = (props: Props) => ReturnValues<T>;
