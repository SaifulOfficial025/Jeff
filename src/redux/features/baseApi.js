
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Send project to employee
// This endpoint should be inside the endpoints object below

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://twin-friday-wallpapers-releases.trycloudflare.com',

          prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
     }),
     

    tagTypes: ["users", "employee", "vendors"],
    endpoints: (builder) => ({

    // Get all projects
    getAllProjects: builder.query({
      query: () => '/api/projects/',
    }),

    // Get project details by ID
    getProjectDetails: builder.query({
      query: (projectId) => `/api/projects/${projectId}/`,
    }),

    // Get chat rooms
    getChatRooms: builder.query({
      query: () => '/api/chat/chat-rooms/',
    }),

    // Get chat room details
    getChatRoomDetails: builder.query({
      query: (chatRoomId) => `/api/chat/chat-rooms/${chatRoomId}/`,
    }),

    // Get messages for a chat room
    getChatMessages: builder.query({
      query: (chatRoomId) => `/api/chat/chat-rooms/${chatRoomId}/messages/`,
    }),

    // Vendor dashboard table data
    getVendorDashboard: builder.query({
      query: () => '/api/projects/vendor_dashboard/',
    }),

    // Upload vendor file
    uploadVendorFile: builder.mutation({
      query: ({ projectId, files }) => {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        return {
          url: `/api/projects/${projectId}/upload_vendor_file/`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    // Vendor stats
    getVendorStats: builder.query({
      query: () => '/api/projects/counts_vendor/',
    }),
      // Get user profile
      getProfile: builder.query({
        query: () => '/api/users/profile/',
      }),

      // Update user profile
      updateProfile: builder.mutation({
        query: (profileData) => ({
          url: '/api/users/update-profile/',
          method: 'PUT',
          body: profileData,
        }),
      }),

      // Update vendor profile
      updateVendorProfile: builder.mutation({
        query: (profileData) => ({
          url: '/api/users/update-vendor-profile/',
          method: 'PUT',
          body: profileData,
        }),
      }),

      // Send project to employee
      sendToEmployee: builder.mutation({
        query: (projectId) => ({
          url: `/api/projects/${projectId}/send_to_employee/`,
          method: 'POST',
        }),
      }),

      // Get latest project
      getLatestProject: builder.query({
        query: () => '/api/projects/latest_project/',
      }),

      //create user
      createUser: builder.mutation({
        query: ({ role, ...userData }) => ({
          url: `/api/users/signup/?role=${role}`,
          method: "POST",
          body: userData,
          providesTags: ['users'],
        }),
        }),

        
     //login user
    userLogin: builder.mutation({
        query: ({role, ...loggedInData})=>({
            url: `/api/users/login/?role=${role}`,
            method: "POST",
            body: loggedInData,
            providesTags: ["users"]
        })
    }),

    //admin login

    adminLogin: builder.mutation({
        query: ({...adminLoggedInData})=>({
            url: `/api/super-admin/admin-login/`,
            method: "POST",
            body: adminLoggedInData,
           
        })
    }),

    //perticular logged user
    


    //dashboard

  getStatisticData: builder.query({
    query: ()=> "/api/super-admin/statistics/"
  }),

  getUserGrowth: builder.query({
    query: ()=> "/api/super-admin/user-growth/"
  }),

  getDashboardUsers: builder.query({
    query: ()=> "/api/super-admin/users/",
    providesTags: ["users"]
  }),

  getDashboardEmployee: builder.query({
    query: ()=> "/api/super-admin/employees/",
    providesTags: ["employee"]
  }),

  getDashboardVendor: builder.query({
    query: ()=> "/api/super-admin/vendors/",
    providesTags: ["vendors"]
  }),

  //recent users
  getRecentUsers: builder.query({
    query: ()=> "/api/super-admin/recent-joins/"
  }),

  //delete employee
  deleteEmployee: builder.mutation({
    query: (id)=>({
        url:`/api/super-admin/employees/${id}/delete/`,
        method: "DELETE"
    }),
    invalidatesTags: ["employee"]
  }),

  //delete users
  deleteUser: builder.mutation({
    query: (id)=>({
        url:`/api/super-admin/users/${id}/delete/`,
        method: "DELETE"
    }),
    invalidatesTags: ["users"]
  }),

//delete vendor
 deleteVendor: builder.mutation({
        query: (id)=>({
            url:`/api/super-admin/vendors/${id}/delete/`,
            method: "DELETE"
        }),
        invalidatesTags: ["vendors"]
    }),


    //block/unblock user
    blockUser: builder.mutation({
      query: (id)=>({
        url: `/api/super-admin/users/${id}/block/`,
        method: "POST",
      }),
      invalidatesTags: ["users"]

    }),

       //block/unblock user
    blockEmployee: builder.mutation({
      query: (id)=>({
        url: `/api/super-admin/employees/${id}/block/`,
        method: "POST",
      }),
      invalidatesTags: ["employee"]

    }),

    //block vendor
      blockVendor: builder.mutation({
      query: (id)=>({
        url: `/api/super-admin/vendors/${id}/block/`,
        method: "POST",
      }),
      invalidatesTags: ["vendors"]

    }),

    // Create project
    createProject: builder.mutation({
      query: (projectData) => ({
        url: '/api/projects/',
        method: 'POST',
        body: projectData,
      }),
    }),

    // Payment
    createPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/api/payments/payment/',
        method: 'POST',
        body: paymentData,
      }),
    }),

    // Process AI Analysis
    processAiAnalysis: builder.mutation({
      query: (projectId) => ({
        url: `/api/projects/${projectId}/process_ai_analysis/`,
        method: 'POST',
      }),
    }),

    // Check AI Analysis Status
    checkAiAnalysisStatus: builder.query({
      query: ({ projectId, taskId }) => `/api/projects/${projectId}/ai_analysis_status/?task_id=${taskId}`,
    }),





    }),
});


export const { 

    //authentication
    useCreateUserMutation,
    useUserLoginMutation,

    //admin login
    useAdminLoginMutation,

    //admin
    useGetStatisticDataQuery,
    useGetUserGrowthQuery,
    useGetDashboardUsersQuery,
    useGetDashboardEmployeeQuery,
    useGetDashboardVendorQuery,
    useGetRecentUsersQuery,

  

    //delete employee
    useDeleteEmployeeMutation,

    //delete users
    useDeleteUserMutation,

    //delete vendor
    useDeleteVendorMutation,

    //block users
    useBlockUserMutation,

    //block employee
    useBlockEmployeeMutation,

    //block vendor
    useBlockVendorMutation,

    //get all projects
    useGetAllProjectsQuery,

    //get latest project
    useGetLatestProjectQuery,
    // vendor stats
    useGetVendorStatsQuery,
    // vendor dashboard
    useGetVendorDashboardQuery,
    useUploadVendorFileMutation,

    //send to employee
    useSendToEmployeeMutation,

    //payment
    useCreatePaymentMutation,

    //process AI analysis
    useProcessAiAnalysisMutation,

    //check AI analysis status
    useCheckAiAnalysisStatusQuery,

    //create project
    useCreateProjectMutation,

    // user profile
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateVendorProfileMutation,
    useGetProjectDetailsQuery,
    
    // chat
    useGetChatRoomsQuery,
    useGetChatRoomDetailsQuery,
    useGetChatMessagesQuery,
} = baseApi


