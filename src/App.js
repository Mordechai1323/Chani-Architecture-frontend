import './style/style.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout';
import Home from './components/home';
import Projects from './components/projects';
import LoginPage from './components/login/loginPage';
import Contact from './components/contact';
import Order from './components/order';
import Page404 from './components/page404';
import Project from './components/project';
import Product from './components/product';

import Account from './components/user/account';
import ProjectsManagement from './components/admin/projectsManagement';

import RequireAuth from './components/admin/requireAuth';
import PersistLogin from './components/admin/persistLogin.';
import ClientProject from './components/user/clientProject';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/LogIn' element={<LoginPage />} />
        <Route path='/order' element={<Order />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/project/:projectID' element={<Project />} />
        <Route path='/product/:productID' element={<Product />} />
        <Route path='/*' element={<Page404 />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={'user'} />}>
            <Route path='/account' element={<Account />} />
            <Route path='/project-details/:projectID' element={<ClientProject />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={'admin'} />}>
            {/* TO DO check in ProjectsManagement secure */}
            <Route path='projectsManagement' element={<ProjectsManagement />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
