import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      onSubmit({ name: projectName, description: projectDescription });
      setProjectName('');
      setProjectDescription('');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box bg-[#111827] border border-gray-500 text-white"> {/* Changed bg-[#1E293B] to bg-[#2A3447] */}
        <h3 className="font-bold text-lg">Create New Project</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Project Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter project name"
              className="input input-bordered w-full bg-[#111827] text-white border-gray-600"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300">Project Description</span>
            </label>
            <textarea
              placeholder="Enter project description"
              className="textarea textarea-bordered w-full bg-[#111827] text-white border-gray-600"
              value={projectDescription}
              rows={5}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn bg-gray-700 shadow-none border border-black  text-white border-none hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <Link to='/project_report_generate'>
                <button type="submit" className="btn shadow-none bg-[#2664EA] text-white border-none hover:bg-blue-700">
              Submit
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;