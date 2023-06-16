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
import AddProject from './components/admin/addProject';
import ProjectInfo from './components/admin/projectInfo';
import EditProject from './components/admin/editProject';
import Unauthorized from './components/unauthorized';
import ForgetPassword from './components/login/forgetPassword';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='projects' element={<Projects />} />
        <Route path='LogIn' element={<LoginPage />} />
        <Route path='forgetPassword' element={<ForgetPassword />} />
        <Route path='order' element={<Order />} />
        <Route path='contact' element={<Contact />} />
        <Route path='project/:projectID' element={<Project />} />
        <Route path='product/:productID' element={<Product />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        <Route path='*' element={<Page404 />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={'user'} />}>
            <Route path='account' element={<Account />} />
            <Route path='project-details/:projectID' element={<ClientProject />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={'admin'} />}>
            {/* TO DO check in ProjectsManagement secure */}
            <Route path='projectsManagement' element={<ProjectsManagement />} />
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
