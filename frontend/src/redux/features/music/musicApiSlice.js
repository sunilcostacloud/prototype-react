import { apiSlice } from "../../api/apiSlice";

export const musicApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMusic: builder.query({
            query: ({ search, genre, page }) => ({
                url: `/music/get-music?search=${search}&genre=${genre}&page=${page}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            providesTags: (result) => {
                return (result
                    ? [
                        { type: "Music", id: "LIST" },
                        ...result.music.map(({ _id }) => ({ type: "Music", id: _id })),
                    ]
                    : [{ type: "Music", id: "LIST" }])
            }
        }),
        getMusicById: builder.query({
            query: (id) => ({
                url: `/music/get-music/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            providesTags: (result, error, id) => {
                return [{ type: "User", id }];
            },
        }),
        addMusic: builder.mutation({
            query: data => {
                return ({
                    url: '/music/upload',
                    method: 'POST',
                    body: data
                })
            },
            invalidatesTags: [
                { type: 'Music', id: "LIST" }
            ]
        }),
        editMusic: builder.mutation({
            query: ({ tableRowId, formData }) => {
                return ({
                    url: `/music/edit-music/${tableRowId}`,
                    method: 'PUT',
                    body: formData
                })
            },
            invalidatesTags: [
                { type: 'Music', id: "LIST" }
            ]
        }),
        deleteMusic: builder.mutation({
            query: (id) => ({
                url: `/music/delete-music/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: "Music", id: "LIST" }]
        }),
    }),
});

export const { useGetMusicQuery, useAddMusicMutation, useDeleteMusicMutation, useGetMusicByIdQuery, useEditMusicMutation } = musicApiSlice;