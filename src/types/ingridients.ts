export interface Ingridient {
  id?: number;
  title: string;
  description: string;
}
export interface RecipeIngridient {
  id?: number;
  quantity: number;
  units_cid?: number | string;
}
