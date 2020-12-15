import { Context } from "./interfaces";
import { RecipeAttrs } from "./models/Recipe";
import { UserAttrs } from "./models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    async signupUser(prt: any, args: { data: UserAttrs }, { User }: Context) {
      const userExist = await User.findOne({
        $or: [{ email: args.data.email }, { username: args.data.username }]
      });
      if (userExist) {
        throw new Error("User already Exists");
      }
      args.data.password = await bcrypt.hash(args.data.password, 10);
      const user = User.build(args.data);
      await user.save();
      return jwt.sign(user, process.env.SECRET!, { expiresIn: "1hr" });
    }
  }
};
