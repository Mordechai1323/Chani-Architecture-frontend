import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout';
import Home from './components/home/Home';
import OurProjects from './components/OurProjects/OurProjects';
import LoginPage from './components/login/loginPage';
import Contact from './components/contact/Contact';
import Order from './components/order/Order';
import Page404 from './components/page404';
import ProjectPage from './components/OurProjects/ProjectPage';
import ProductPage from './components/order/productPage';
import ForgotPassword from './components/login/forgotPassword/ForgotPassword';
import Unauthorized from './components/unauthorized';

import Account from './components/user/account';
import ClientProject from './components/user/clientProject';

import RequireAuth from './components/admin/requireAuth';

import PersistLogin from './components/admin/persistLogin.';
import AddProject from './components/admin//projectsManagement/addProject';
import ProjectInfo from './components/admin/projectInfo/projectInfo';
import EditProject from './components/admin/projectsManagement/editProject';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='projects' element={<OurProjects />} />
        <Route path='project/:projectID' element={<ProjectPage />} />
        <Route path='order' element={<Order />} />
        <Route path='product/:productID' element={<ProductPage />} />
        <Route path='contact' element={<Contact />} />
        <Route path='logIn' element={<LoginPage />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
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
