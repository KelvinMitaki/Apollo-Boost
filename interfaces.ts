import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Recipe } from "./models/Recipe";
import { User } from "./models/User";

export interface Context extends ExpressContext {
  User: typeof User;
  Recipe: typeof Recipe;
}
