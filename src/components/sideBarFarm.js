import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from 'cdbreact';

const SideBarFarm = () => {

  const fullText = "Search history search history ";

  const [showFullText, setShowFullText] = useState(false);

  const handleMenuItemClick = () => {
    setShowFullText(true);
  };

  const linkStyle = {
    color: 'inherit',  
    textDecoration: 'none', 
    cursor: 'pointer', 
  };

  return (
    <CDBSidebar textColor="black" backgroundColor="#d3d3d3" style={{ fontFamily: 'Poppins' }}>
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
      <a href="/" style={linkStyle}>
        intelliAgric
      </a>
      </CDBSidebarHeader>

      <CDBSidebarContent style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
        <CDBSidebarMenu className="sidebar-menu">
            {[...Array(12)].map((_, index) => (
              <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick} key={index}>
                {fullText}
              </CDBSidebarMenuItem>
            ))}
          </CDBSidebarMenu>
      </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{ padding: '20px 5px' }}
        >
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
};

export default SideBarFarm;