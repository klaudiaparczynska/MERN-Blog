const mongoose = require('mongoose')

const BlogPostSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true
    },
    image: {
        type: 'string',
        required: true
    },
    category: {
        type: 'string',
        default: 'others'
    },
    created_at: {
        type: 'string',
        default: new Date().toLocaleDateString('en-Us', )
    }
})
const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost