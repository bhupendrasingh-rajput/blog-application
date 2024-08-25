import React, { useState, useEffect } from 'react';
import styles from '../styles/BlogForm.module.css';
import { createBlog, updateBlog } from '../apis/blogs';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BlogForm = ({ closeModal, blog }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title,
                content: blog.content,
                image: blog.image || ''
            });
        }
    }, [blog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (blog) {
                const updatedBlog = await updateBlog(blog._id, formData);
                navigate(`/blog/${updatedBlog?._id}`, { state: { blog: updatedBlog } })
                toast.success('Blog updated successfully!');
            } else {
                await createBlog(formData);
                navigate('/');
                toast.success('Blog created successfully!');
            }
            closeModal();
        } catch (error) {
            console.error('Error saving blog:', error);
            toast.error('Failed to save blog');
        }
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            content: '',
            image: ''
        });
        closeModal();
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.heading}>{blog ? 'Edit Blog' : 'Create New Blog'}</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="image">Image URL (optional)</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitButton}>
                        {blog ? 'Update Blog' : 'Create Blog'}
                    </button>
                    <button type="button" className={styles.resetButton} onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;
