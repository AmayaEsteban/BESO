import { Schema, model, models } from "mongoose";
import { Product } from "@/models/Product";

const WishedProductSchema = new Schema({
  userEmail: { type: String, require: true },
  product: { type: Schema.Types.ObjectId, ref: Product },
});

export const WishedProduct =
  models?.WishedProduct || model("WishedProduct", WishedProductSchema);
