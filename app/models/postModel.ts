import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  imageUrl: { type: String },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
