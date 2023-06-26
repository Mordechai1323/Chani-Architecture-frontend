import React from 'react';

import Project from './project';

export default function ProjectsTable({ projects, setProjects, getProjects, notify }) {
  return (
    <table className='table-projects'>
      <thead className='thead-projects'>
        <tr>
          <th></th>
          <th>Project number</th>
          <th>Project name</th>
          <th>Completion date</th>
          <th>Project status</th>
          <th>Del</th>
          <th>Info</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <Project key={project._id} projects={projects} setProjects={setProjects} project={project} getProjects={getProjects} notify={notify} />
        ))}
      </tbody>
    </table>
  );
}
