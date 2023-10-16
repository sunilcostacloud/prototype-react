import { apiSlice } from "../../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users/get-all-users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "User", id: "LIST" },
              ...result.map(({ _id }) => ({ type: "User", id: _id })),
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result, error, id) => {
        // console.log("getSingleUser", result, error, id)
        return [{ type: "User", id }];
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/users/update-user/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: (result, error, arg) => {
        console.log("updateUser", arg);
        return [{ type: "User", id: arg.id }];
      },
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
