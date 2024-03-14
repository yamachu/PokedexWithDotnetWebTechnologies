import { type Pokemon } from "./types/Contract";
import type { BaseFunctionType } from "./types/Types";

type Props = {
  DataSourceGetter: () => string;
};

type ReturnValues = {
  fetchPokemons: () => Promise<Pokemon[]>;
};

export type FunctionType<P = {}, T = {}> = BaseFunctionType<
  Props & P,
  ReturnValues & T
>;
