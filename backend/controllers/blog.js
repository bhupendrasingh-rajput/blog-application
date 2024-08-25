const Blog = require('../models/blog');

const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) { return res.status(404).json({ message: 'Bad Request!' }) }
        await Blog.create(req.body);
        res.json({ message: 'Blog Created!' })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
        console.log('Internal Server Error! \n', error)
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
        console.log('Internal Server Error! \n', error)
    }
}

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) { return res.status(404).json({ message: 'Bad Request!' }) };

        const blog = await Blog.findById(id);
        if (!blog) { return res.status(400).json({ message: 'Blog Not Found!' }) }

        res.json({ blog });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
        console.log('Internal Server Error! \n', error)
    }
}

const updateBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        if (!id) { return res.status(400).json({ message: 'Bad Request!' }); }

        let blog = await Blog.findById(id);
        if (!blog) { return res.status(404).json({ message: 'Blog Not Found!' }); }

        if (blog.author.toString() !== author) { return res.status(400).json({ message: 'Permission Denied!' }) }

        blog.title = title || blog.title;
        blog.content = content || blog.content;

        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
        console.error('Internal Server Error! \n', error);
    }
};

const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const { author } = req.body;

        if (!id) { return res.status(400).json({ message: 'Bad Request!' }) }

        const blog = await Blog.findById(id);

        if (!blog) { return res.status(404).json({ message: 'Blog Not Found!' }) }

        if (blog.author.toString() !== author) { return res.status(400).json({ message: 'Permission Denied!' }) }

        await Blog.findByIdAndDelete(id);
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
        console.error('Internal Server Error! \n', error);
    }
};
module.exports = { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById };