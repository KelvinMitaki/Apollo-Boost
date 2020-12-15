import { Context } from "./interfaces";
import { RecipeAttrs } from "./models/Recipe";
import { UserAttrs } from "./models/User";
import bcrypt from "bcrypt";

export const resolvers = {
  Query: {
    user(parent: any, args: any, ctx: any) {
      return { username: "kevoh", email: "kevin@gmail.com" };
    }
  },
  Mutation: {
    async addRecipe(prt: any, args: RecipeAttrs, { Recipe }: Context) {
      const recipe = Recipe.build(args);
      await recipe.save();
      return recipe;
    },
    async addUser(prt: any, args: UserAttrs, { User }: Context) {
      args.password = await bcrypt.hash(args.password, 10);
      const user = User.build(args);
      await user.save();
      return user;
    }
  }
};
