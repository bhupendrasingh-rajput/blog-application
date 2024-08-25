import React, { useEffect, useState } from 'react';
import styles from '../styles/HomePage.module.css';
import { fetchBlogs } from '../apis/blogs';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    const fetchAllBlogs = async () => {
        try {
            const blogsData = await fetchBlogs();
            setBlogs(blogsData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = (blog) => {
        navigate(`/blog/${blog?._id}`, { state: { blog } })
    }

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    return (
        <div className={styles.container}>
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div key={blog?._id} className={styles.blogCard} onClick={() => { handleClick(blog) }}>
                        <img src={blog?.image} alt={blog?.title} className={styles.blogImage} />
                        <div className={styles.contentContainer}>
                            <h2 className={styles.blogTitle}>{blog?.title}</h2>
                            <p className={styles.blogContent}>{blog?.content}</p>
                            <p className={styles.blogDate}>{new Date(blog?.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))
            ) : (
                <h2>No Blogs Available</h2>
            )}
        </div>
    );
};

export default HomePage;
