type recipeIngridient = {
  id: number;
  unit_cid: number;
  quantity: number;
};

export interface Recipe {
  id?: number;
  title: string;
  ingridients: recipeIngridient[];
  short_dsc: string;
  description: string;
  img_url: string;
}
