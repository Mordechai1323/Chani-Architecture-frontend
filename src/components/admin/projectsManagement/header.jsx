import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='top-container'>
      <h1>Projects Management</h1>
      <Link title='Add project' to='/projectsManagement/add'>
        <i className='fa-solid fa-plus'></i>
      </Link>
    </div>
  );
}
