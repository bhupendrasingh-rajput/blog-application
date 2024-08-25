import React, { useState } from 'react';
import styles from '../styles/BlogDetail.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteBlog } from '../apis/blogs';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import BlogForm from './BlogForm';
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
};

const BlogDetail = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const location = useLocation();
  const blog = location.state.blog;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleEdit = (blog) => {
    setIsOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      let yes = confirm('Are You sure about deleting this Blog?')
      if (yes) {
        await deleteBlog(id);
        toast.warn('Blog Deleted!')
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.blogDetail}>
      <div className={styles.header}>
        <h1 className={styles.title}>{blog?.title}</h1>
        <div className={styles.meta}>
          <span>Published on {new Date(blog?.createdAt).toLocaleString()}</span>
          {blog?.author === user?._id &&
            <div className={styles.actions}>
              <button onClick={() => handleEdit(blog)}>Edit</button>
              <button onClick={() => handleDelete(blog?._id)}> Delete</button>
            </div>
          }
        </div>
      </div>
      {blog?.image ? <img src={blog?.image} alt="blog-image" className={styles.imagePlaceholder} /> : <div className={styles.imagePlaceholder}>Image Not Available for This Blog</div>}
      <div className={styles.contents}>
        <h2>Content</h2>
        <p>{blog?.content}</p>
      </div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} shouldCloseOnOverlayClick={false} style={customStyles} >
        <BlogForm closeModal={closeModal} blog={blog}/>
      </Modal>
    </div >
  );
};

export default BlogDetail;
