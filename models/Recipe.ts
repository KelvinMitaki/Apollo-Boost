import mongoose from "mongoose";

export interface RecipeAttrs {
  name: string;
  category: string;
  description: string;
  instructions: string;
  likes: number;
  user: mongoose.Types.ObjectId;
}

interface RecipeDoc extends mongoose.Document {
  name: string;
  category: string;
  description: string;
  instructions: string;
  likes: number;
  user: mongoose.Types.ObjectId;
}

interface RecipeModel extends mongoose.Model<RecipeDoc> {
  build: (attrs: RecipeAttrs) => RecipeDoc;
}

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  { timestamps: true }
);

RecipeSchema.statics.build = (attrs: RecipeAttrs): RecipeDoc => {
  return new Recipe(attrs);
};

const Recipe = mongoose.model<RecipeDoc, RecipeModel>("Recipe", RecipeSchema);

export { Recipe };
