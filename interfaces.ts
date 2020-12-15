import { Recipe } from "./models/Recipe";
import { User } from "./models/User";

export interface Context {
  User: typeof User;
  Recipe: typeof Recipe;
}
