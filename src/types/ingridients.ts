export interface Ingridient {
  id?: number;
  name: string;
  description: string;
  img_url?: string;
}
export interface RecipeIngridient {
  id?: number;
  quantity: number;
  units_cid?: number | string;
}
