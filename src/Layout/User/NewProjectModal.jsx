import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useCreateProjectMutation } from '../../redux/features/baseApi';
import { 
  setProjectName, 
  setProjectDescription, 
  setCurrentProject, 
  addProject,
  clearProjectData 
} from '../../redux/features/projectSlice';

const NewProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [localProjectName, setLocalProjectName] = useState('');
  const [localProjectDescription, setLocalProjectDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploadedFiles } = useSelector((state) => state.project);
  const [createProject] = useCreateProjectMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!localProjectName.trim()) {
      toast.error('Project name is required!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Redux and localStorage immediately
      console.log('Saving project name:', localProjectName);
      console.log('Saving project description:', localProjectDescription);
      
      dispatch(setProjectName(localProjectName));
      dispatch(setProjectDescription(localProjectDescription));

      // Verify it was saved
      console.log('localStorage projectName:', localStorage.getItem('projectName'));
      console.log('localStorage projectDescription:', localStorage.getItem('projectDescription'));

      // Prepare FormData for API call
      const formData = new FormData();
      formData.append('name', localProjectName);
      formData.append('scope', ''); // Default blank as per requirement
      formData.append('project_description', localProjectDescription);

      // Add uploaded files to FormData
      uploadedFiles.forEach((file) => {
        // Convert base64 back to File object for API
        const byteCharacters = atob(file.data.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: file.type });
        const fileObj = new File([blob], file.name, { type: file.type });
        
        formData.append('user_files', fileObj);
      });

      // Try to call API
      try {
        const result = await createProject(formData).unwrap();
        
        // Save the API response to Redux and localStorage
        dispatch(setCurrentProject(result));
        dispatch(addProject(result));
        
        toast.success('Project created successfully!');
      } catch (apiError) {
        console.error('API call failed:', apiError);
        // Even if API fails, we still have the data saved locally
        toast.success('Project data saved locally! (API connection issue)');
      }
      
      // Reset form
      setLocalProjectName('');
      setLocalProjectDescription('');
      
      // Close modal
      onClose();
      
      // Call parent onSubmit for backward compatibility
      onSubmit({ name: localProjectName, description: localProjectDescription });
      
      // Navigate to report generate page
      navigate('/project_report_generate');
      
    } catch (error) {
      console.error('Project creation failed:', error);
      toast.error('Failed to save project data. Please try again.');
    } finally {
      setIsSubmitting(false);
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
              value={localProjectName}
              onChange={(e) => setLocalProjectName(e.target.value)}
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
              value={localProjectDescription}
              rows={5}
              onChange={(e) => setLocalProjectDescription(e.target.value)}
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
            <button 
              type="submit" 
              className="btn shadow-none bg-[#2664EA] text-white border-none hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;