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
import ForgetPassword from './components/login/forgetPassword';
import Unauthorized from './components/unauthorized';

import Account from './components/user/account';
import ClientProject from './components/user/clientProject';

import RequireAuth from './components/admin/requireAuth';

import PersistLogin from './components/admin/persistLogin.';
import AddProject from './components/admin/addProject';
import ProjectInfo from './components/admin/projectInfo/projectInfo';
import EditProject from './components/admin/editProject';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='projects' element={<Projects />} />
        <Route path='project/:projectID' element={<Project />} />
        <Route path='order' element={<Order />} />
        <Route path='product/:productID' element={<Product />} />
        <Route path='contact' element={<Contact />} />
        <Route path='logIn' element={<LoginPage />} />
        <Route path='forgetPassword' element={<ForgetPassword />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<Page404 />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={'user'} />}>
            <Route path='account' element={<Account />} />
            <Route path='project-details/:projectID' element={<ClientProject />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={'admin'} />}>
            <Route path='projectsManagement/add' element={<AddProject />} />
            <Route path='projectsManagement/info/:projectID' element={<ProjectInfo />} />
            <Route path='projectsManagement/edit/:projectID' element={<EditProject />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
