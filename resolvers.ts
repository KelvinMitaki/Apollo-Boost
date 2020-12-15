import { Context } from "./interfaces";
import { RecipeAttrs } from "./models/Recipe";
import { UserAttrs } from "./models/User";
import bcrypt from "bcrypt";

export const resolvers = {
  Query: {
    user(parent: any, args: any, ctx: any) {
      return { username: "kevoh", email: "kevin@gmail.com" };
    },
    async getAllRecipes(prt: any, args: any, { Recipe }: Context) {
      const recipes = await Recipe.find({});
      return recipes;
    }
  },
  Mutation: {
    async addRecipe(
      prt: any,
      args: { data: RecipeAttrs },
      { Recipe }: Context
    ) {
      const recipe = Recipe.build(args.data);
      await recipe.save();
      return recipe;
    },
    async addUser(prt: any, args: { data: UserAttrs }, { User }: Context) {
      const userExist = await User.findOne({ email: args.data.email });
      if (userExist) {
        throw new Error("A user with that email already Exists");
      }
      args.data.password = await bcrypt.hash(args.data.password, 10);
      const user = User.build(args.data);
      await user.save();
      return user;
    }
  }
};
