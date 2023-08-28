export interface Recipe {
  id: number;
  title: string;
  ingredients: string[] | number[];
  short_dsc: string;
  description: string;
  img_url: string;
}
