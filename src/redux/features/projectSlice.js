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
      state.uploadedFiles = action.payload;
      // Store in localStorage
      localStorage.setItem('uploadedFiles', JSON.stringify(action.payload));
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
      const storedFiles = localStorage.getItem('uploadedFiles');
      const storedProjectName = localStorage.getItem('projectName');
      const storedProjectDescription = localStorage.getItem('projectDescription');
      const storedCurrentProject = localStorage.getItem('currentProject');
      const storedProjects = localStorage.getItem('projects');
      if (storedFiles) {
        state.uploadedFiles = JSON.parse(storedFiles);
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
