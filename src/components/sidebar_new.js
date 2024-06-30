import '../styles/navBar.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSidebarData } from '../context/sidebarDataContext';
import { useFarm } from '../context/farmContext';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const SideBarNew = () => {
  const sidebarData = useSidebarData();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  const { farmData } = useFarm() || {};
  const showSidebar = () => setSidebar(!sidebar);
  const isFarmPage = location.pathname === '/farmhome';
  const isIoTPage = location.pathname === '/farmhome/iot';

  const handleSideBar = (title) => {
    // Display popup with selected message
    Swal.fire({
      title: 'Saved History',
      text: title || 'No message found',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  };

  const handleDelete = async (idToken, messageId) => {
    try {
      const docRef = doc(db, `history${idToken}`, messageId);
      await deleteDoc(docRef);
      Swal.fire({
        title: 'Deleted!',
        text: 'Message has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (e) {
      console.error('Error deleting document: ', e);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete message.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      {!(isFarmPage || isIoTPage) && (
        <>
          <button className="menu-bars" onClick={showSidebar} style={{ background: 'black', border: 'none', color: 'white', margin: 0, padding: '30px', zIndex: 1100 }}>
            {sidebar ? <AiIcons.AiOutlineClose /> : <FaIcons.FaBars />}
          </button>
        </>
      )}

      <div className="nav-container">
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'></li>
            {sidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to="#" onClick={() => handleSideBar(item.title)}>
                  <span>{truncateText(item.title, 3)}</span>
                </Link>
                <button onClick={() => handleDelete(idToken, item.id)} style={{ marginLeft: '10px', background: 'red', color: 'white', border: 'none', padding: '5px' }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="message-display">
          {selectedMessage && (
            <div className="message-content">
              <h2>Selected Message</h2>
              <p>{selectedMessage}</p>
            </div>
          )}
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default SideBarNew;
