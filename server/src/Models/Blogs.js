const Mongoose = require("../Database/Connection")
const BlogSchema = new Mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    author: {type: String, required: true},
    likes: { type: Number, default: 0, required: true},
    comments: { type: Number, default: 0, required: true},
    date: { type: Date, default: Date.now },
    author_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'Users' }
}
);

const Blogs = Mongoose.model('Blogs', BlogSchema)

module.exports = Blogs;