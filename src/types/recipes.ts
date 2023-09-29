type recipeIngridient = {
  id: number;
  unit_cid: number;
  quantity: number;
};

type recipeStep = {
  id: number;
  order: number;
  description: number;
  img_url: number;
};

export interface Recipe {
  id?: number;
  title: string;
  ingridients: recipeIngridient[];
  short_dsc: string;
  description: string;
  cooking_time: number;
  portion: number;
  img_url: string;
  likes: number;
}

export interface RecipeFavData {
  userId: number;
  recipeId: number;
}
