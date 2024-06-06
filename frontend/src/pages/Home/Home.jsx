import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import axiosInstance from '../../utils/axiosInstance';

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null
  });

  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  // Get User Info
  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get('/get-user');
      if (res.data && res.data.user) {
        setUserInfo(res.data.user);
      }
    } catch (error) {
      if (error.res.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, [])

  return (
    <>
    <Navbar userInfo={userInfo} />
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4 mt-8">
        <NoteCard 
          title="Meeting on 7th April" 
          date="3rd Apr 2024" 
          content="This is an important meeting." 
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
      </div>
    </div>
    
    <button 
      className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" 
      onClick={() => {
        setOpenAddEditModal({ isShown: true, type: 'add', data: null })
      }}>
      <MdAdd className="text-[32px] text-white" />
    </button>

    <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={() => {}}
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.2)"
        }
      }}
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
    >
      <AddEditNotes 
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={() => {
          setOpenAddEditModal({
            isShown: false,
            type: 'add',
            data: null
          })
        }}
      />
    </Modal>
    </>
  )
}

export default Home
