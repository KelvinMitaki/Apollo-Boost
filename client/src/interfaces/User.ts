import { Recipe } from "./Recipe";

export interface User {
  username: string;
  email: string;
  createdAt: string;
  _id: string;
  favorites: Recipe[];
}
