import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from 'cdbreact';

const Sidebar = () => {

  const fullText = "Search history search history ";

  const [showFullText, setShowFullText] = useState(false);

  const handleMenuItemClick = () => {
    setShowFullText(true);
  };

  return (
    <CDBSidebar textColor="#fff" backgroundColor="#333">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>intelliAgric</CDBSidebarHeader>

      <CDBSidebarContent style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
        <CDBSidebarMenu>
          
          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

          <CDBSidebarMenuItem textFontSize="16px" onClick={handleMenuItemClick}>
            {showFullText ? fullText : fullText.split(' ').slice(0, 5).join(' ')}
          </CDBSidebarMenuItem>

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

export default Sidebar;

