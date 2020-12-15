import { Context } from "../interfaces";
import jwt from "jsonwebtoken";

const auth = async (ctx: Context, useAuth: boolean = true) => {
  try {
    const decoded = jwt.verify(
      ctx.req.headers.authorization!,
      process.env.SECRET!
    ) as { _id: string };
    let user;
    if (useAuth) {
      user = await ctx.User.findById(decoded._id);
    } else {
      user = await ctx.User.findById(decoded._id).populate("favorites");
    }
    return user;
  } catch (error) {
    if (useAuth) {
      throw new Error("Not Authenticated");
    }
    return null;
  }
};

export { auth };
