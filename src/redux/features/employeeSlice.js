import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl =  'https://phrase-looksmart-restored-canyon.trycloudflare.com ';

export const fetchEmployeeStats = createAsyncThunk(
  'employee/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${baseUrl}/api/projects/counts_employee/`, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchEmployeeDashboard = createAsyncThunk(
  'employee/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${baseUrl}/api/projects/employee_dashboard/`, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const uploadEmployeeFile = createAsyncThunk(
  'employee/uploadFile',
  async ({ id, files }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      const response = await axios.post(`${baseUrl}/api/projects/${id}/upload_employee_file/`, formData, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchVendorList = createAsyncThunk(
  'employee/fetchVendorList',
  async (projectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${baseUrl}/api/projects/vendor_list/`, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const sendToVendor = createAsyncThunk(
  'employee/sendToVendor',
  async ({ projectId, vendorId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(`${baseUrl}/api/projects/${projectId}/send_to_vendor/`, { vendor_id: vendorId }, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const assignToSelf = createAsyncThunk(
  'employee/assignToSelf',
  async (projectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(`${baseUrl}/api/projects/${projectId}/assign_to_self/`, {}, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchEmployeeProfile = createAsyncThunk(
  'employee/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${baseUrl}/api/users/profile/`, { headers });
      console.log('Profile API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Profile API Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateEmployeeProfile = createAsyncThunk(
  'employee/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.put(`${baseUrl}/api/users/update-employee-profile/`, profileData, { headers });
      console.log('Update Profile API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Update Profile API Error:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  stats: {
    new_request: 0,
    total_request: 0,
    request_complete: 0,
    incomplete_request: 0,
  },
  dashboardData: [],
  vendors: [],
  profile: null,
  loading: false,
  uploading: false,
  vendorLoading: false,
  profileLoading: false,
  updating: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchEmployeeStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEmployeeDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchEmployeeDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadEmployeeFile.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadEmployeeFile.fulfilled, (state) => {
        state.uploading = false;
      })
      .addCase(uploadEmployeeFile.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })
      .addCase(fetchVendorList.pending, (state) => {
        state.vendorLoading = true;
        state.error = null;
      })
      .addCase(fetchVendorList.fulfilled, (state, action) => {
        state.vendorLoading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendorList.rejected, (state, action) => {
        state.vendorLoading = false;
        state.error = action.payload;
      })
      .addCase(sendToVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendToVendor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendToVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(assignToSelf.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignToSelf.fulfilled, (state, action) => {
        state.loading = false;
        // Update the specific project status in dashboardData
        const projectIndex = state.dashboardData.findIndex(item => item.project_id === action.meta.arg);
        if (projectIndex !== -1) {
          state.dashboardData[projectIndex].status = action.payload.status;
        }
      })
      .addCase(assignToSelf.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEmployeeProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchEmployeeProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload;
      })
      .addCase(updateEmployeeProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateEmployeeProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload;
      })
      .addCase(updateEmployeeProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
