import { Context } from "../interfaces";
import jwt from "jsonwebtoken";

const auth = async (ctx: Context, useAuth: boolean = true) => {
  try {
    if (ctx.req.headers.authorization) {
      const token = ctx.req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET!) as { _id: string };
      let user;
      if (useAuth) {
        user = await ctx.User.findById(decoded._id);
      } else {
        user = await ctx.User.findById(decoded._id).populate("favorites");
      }
      return user;
    }
    throw new Error("Not Authenticated");
  } catch (error) {
    if (useAuth) {
      throw new Error("Not Authenticated");
    }
    return null;
  }
};

export { auth };
