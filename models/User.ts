import mongoose from "mongoose";

export interface UserAttrs {
  username: string;
  email: string;
  password: string;
  favorites?: mongoose.Types.ObjectId[];
}
interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  favorites?: mongoose.Types.ObjectId[];
}

interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc;
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Recipe"
      }
    ]
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      }
    },
    timestamps: true
  }
);

UserSchema.statics.build = (attrs: UserAttrs): UserDoc => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
