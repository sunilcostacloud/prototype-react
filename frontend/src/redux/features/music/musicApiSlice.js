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
                // console.log("checkResult", result)
                return (result
                    ? [
                        { type: "Music", id: "LIST" },
                        ...result.music.map(({ _id }) => ({ type: "Music", id: _id })),
                    ]
                    : [{ type: "Music", id: "LIST" }])
            }
        }),
        addMusic: builder.mutation({
            query: data => {
                console.log("checkAddMusic", data)
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
    }),
});

export const { useGetMusicQuery, useAddMusicMutation } = musicApiSlice;