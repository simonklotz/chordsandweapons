export type QueryParams = Record<
  string,
  string | number | boolean | readonly (string | number | boolean)[]
>;
