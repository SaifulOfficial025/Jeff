import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://10.10.13.60:8000',

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

    //block dendor
      blockVendor: builder.mutation({
      query: (id)=>({
        url: `/api/super-admin/vendors/${id}/block/`,
        method: "POST",
      }),
      invalidatesTags: ["vendors"]

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


 } = baseApi


