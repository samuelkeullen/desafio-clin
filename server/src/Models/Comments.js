const { Schema } = require("mongoose");
const Mongoose = require("../Database/Connection");


const CommentsSchema = new Mongoose.Schema(
  {
    blog_id: { type: Schema.Types.ObjectId, ref: 'Blogs', required: true},
    author_id: { type: String, ref: 'Users', required: true },
    body: { type: String, required: true },
    likes: { type: Number, default: 0, required: true},
    date: { type: Date, default: Date.now }
  }
);

const Comments = Mongoose.model('Comments', CommentsSchema);

module.exports = Comments;