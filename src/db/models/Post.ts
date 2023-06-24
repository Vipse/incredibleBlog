import mongoose from "mongoose";

export interface PostType {
  _id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
/* PostSchema will correspond to a collection in your MongoDB database. */
const PostSchema = new mongoose.Schema(
  {
    title: {
      /* The title of this post */

      type: String,
      required: [true, "Please provide a title for this post."],
      maxlength: [60, "Title cannot be more than 60 characters"],
    },
    body: {
      /* The body of this post */

      type: String,
      required: [true, "Please provide a body for this post."],
      maxlength: [100, "Body cannot be more than 100 characters"],
    },
    author: {
      /* The author name of this post */

      type: String,
      required: [true, "Please provide an author name for this post."],
      maxlength: [40, "Author name cannot be more than 40 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
