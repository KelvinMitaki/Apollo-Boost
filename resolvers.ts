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
    async getAllRecipes(prt: any, args: any, { Recipe, req }: Context) {
      const decoded = jwt.verify(
        req.headers.authorization!,
        process.env.SECRET!
      );
      console.log(decoded);
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
      const userDoc = user.toObject();
      //@ts-ignore
      delete userDoc.password;
      const token = jwt.sign(userDoc, process.env.SECRET!, {
        expiresIn: "1hr"
      });
      return { token };
    },
    async signinUser(
      prt: any,
      args: { email: string; password: string },
      { User }: Context
    ) {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const isMatch = await bcrypt.compare(args.password, user.password);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }
      const userDoc = user.toObject();
      //@ts-ignore
      delete userDoc.password;
      const token = jwt.sign(userDoc, process.env.SECRET!, {
        expiresIn: "1hr"
      });
      return {
        token
      };
    }
  }
};
