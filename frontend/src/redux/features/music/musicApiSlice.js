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
        }),
        providesTags: (result) =>
            result
                ? [
                    { type: "Music", id: "LIST" },
                    ...result.map(({ _id }) => ({ type: "Music", id: _id })),
                ]
                : [{ type: "Music", id: "LIST" }],
    }),
});

export const { useGetMusicQuery } = musicApiSlice;