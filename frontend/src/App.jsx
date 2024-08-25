import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BlogDetail from './components/BlogDetail';
import AuthPage from './Pages/AuthPage';
import styles from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Pages/HomePage';
import Modal from 'react-modal';
import BlogForm from './components/BlogForm';
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


function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <Router>
      <div className={styles.container}>
        <Header user={user} setUser={setUser} setIsOpen={setIsOpen} />
        <main className={styles.mainContent}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </main>
      </div>
      <Modal isOpen={isOpen} onRequestClose={closeModal} shouldCloseOnOverlayClick={false} style={customStyles} >
        <BlogForm closeModal={closeModal} />
      </Modal>
      <ToastContainer />
    </Router>
  );
}

export default App;
