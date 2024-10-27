import React from 'react';
import { Outlet } from 'react-router-dom';
import BlogDetail from './BlogDetail';

function BlogDetailWrapper() {
  return (
    <>
      <BlogDetail /> 
      <Outlet />
    </>
  );
}

export default BlogDetailWrapper;
