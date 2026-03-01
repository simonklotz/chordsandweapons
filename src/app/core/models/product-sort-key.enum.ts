export enum ProductSortKey {
  BEST_SELLING = 'BEST_SELLING',
  CREATED_AT = 'CREATED_AT',
  ID = 'ID',
  PRICE = 'PRICE',
  PRODUCT_TYPE = 'PRODUCT_TYPE',
  // Sort by relevance to the search terms when the query parameter is specified on the connection.
  // Don't use this sort key when no search query is specified.
  RELEVANCE = 'RELEVANCE',
  TITLE = 'TITLE',
  UPDATED_AT = 'UPDATED_AT',
  VENDOR = 'VENDOR',
}
