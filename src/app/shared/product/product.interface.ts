export interface Product {
  id?: string;
  imageUrl: string;
  title: string;
  artist: string;
  description: string;
  price: number;

  audioPreview: string[];
  // inventoryStatus?: string;
}
