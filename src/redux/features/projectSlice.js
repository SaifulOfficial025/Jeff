import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  currentProject: null,
  uploadedFiles: [],
  projectName: '',
  projectDescription: '',
  isLoading: false,
  error: null,
};

import { baseApi } from './baseApi';

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setUploadedFiles: (state, action) => {
      // Ensure the payload is serializable
      const serializedFiles = action.payload.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        data: file.data,
        lastModified: file.lastModified,
        id: file.id || `${file.name}-${file.lastModified}-${Date.now()}`
      }));
      
      state.uploadedFiles = serializedFiles;
      
      // Store in localStorage with error handling
      try {
        localStorage.setItem('uploadedFiles', JSON.stringify(serializedFiles));
      } catch (error) {
        console.error('Error saving files to localStorage:', error);
      }
    },
    setProjectName: (state, action) => {
      state.projectName = action.payload;
      // Store in localStorage
      localStorage.setItem('projectName', action.payload);
    },
    setProjectDescription: (state, action) => {
      state.projectDescription = action.payload;
      // Store in localStorage
      localStorage.setItem('projectDescription', action.payload);
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
      // Store in localStorage
      localStorage.setItem('currentProject', JSON.stringify(action.payload));
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
      // Store in localStorage
      localStorage.setItem('projects', JSON.stringify(state.projects));
    },
    clearProjectData: (state) => {
      state.projectName = '';
      state.projectDescription = '';
      state.uploadedFiles = [];
      // Clear from localStorage
      localStorage.removeItem('projectName');
      localStorage.removeItem('projectDescription');
      localStorage.removeItem('uploadedFiles');
    },
    loadFromLocalStorage: (state) => {
      // Load data from localStorage on initialization
      try {
        const storedFiles = localStorage.getItem('uploadedFiles');
        const storedProjectName = localStorage.getItem('projectName');
        const storedProjectDescription = localStorage.getItem('projectDescription');
        const storedCurrentProject = localStorage.getItem('currentProject');
        const storedProjects = localStorage.getItem('projects');
        
        if (storedFiles) {
          const parsedFiles = JSON.parse(storedFiles);
          // Ensure each file has required serializable properties
          state.uploadedFiles = parsedFiles.map(file => ({
            name: file.name || '',
            type: file.type || '',
            size: file.size || 0,
            data: file.data || '',
            lastModified: file.lastModified || Date.now(),
            id: file.id || `${file.name}-${file.lastModified}-${Date.now()}`
          }));
        }
        if (storedProjectName) {
          state.projectName = storedProjectName;
        }
        if (storedProjectDescription) {
          state.projectDescription = storedProjectDescription;
        }
        if (storedCurrentProject) {
          state.currentProject = JSON.parse(storedCurrentProject);
        }
        if (storedProjects) {
          state.projects = JSON.parse(storedProjects);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        // Reset to initial state if loading fails
        state.uploadedFiles = [];
        state.projectName = '';
        state.projectDescription = '';
        state.currentProject = null;
        state.projects = [];
      }
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      baseApi.endpoints.getLatestProject.matchFulfilled,
      (state, { payload }) => {
        state.currentProject = payload;
        state.projectName = payload.project_name;
        state.projectDescription = payload.scope;
      }
    );
  },
});

export const {
  setUploadedFiles,
  setProjectName,
  setProjectDescription,
  setCurrentProject,
  addProject,
  clearProjectData,
  loadFromLocalStorage,
} = projectSlice.actions;

export default projectSlice.reducer;
