import { Context } from "../interfaces";
import jwt from "jsonwebtoken";

const auth = async (ctx: Context) => {
  try {
    const decoded = jwt.verify(
      ctx.req.headers.authorization!,
      process.env.SECRET!
    ) as { _id: string };
    const user = await ctx.User.findById(decoded._id);
    return user;
  } catch (error) {
    throw new Error("Not Authenticated");
  }
};

export { auth };
