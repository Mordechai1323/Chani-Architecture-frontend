import React from 'react';

export default function DeleteProject({ onDelete }) {
  return (
    <td
      title='Delete this '
      className='fa-solid fa-trash'
      onClick={() => window.confirm('Delete project?') && onDelete()}
    ></td>
  );
}
