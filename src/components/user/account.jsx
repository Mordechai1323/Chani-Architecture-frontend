import React from 'react';
import useAuth from '../../hooks/useAuth';
import ClientProjects from './clientProjects';
import ProjectsManagement from '../admin/projectsManagement/projectsManagement';

export default function Account() {
  const { auth } = useAuth();
  return <>{auth.role === 'user' ? <ClientProjects /> : <ProjectsManagement />}</>;
}
