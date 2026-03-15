import { filter, OperatorFunction } from 'rxjs';

export const filterValidQueries = (): OperatorFunction<
  string | undefined,
  string
> => filter((query) => query !== undefined);
