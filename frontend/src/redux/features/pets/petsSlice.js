import { petsApiSlice } from "../../api/petsApiSlice";

export const petsSlice = petsApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBreeds: builder.query({
      query: (limit) => `/breeds?limit=${limit}`,
    }),
  }),
});

export const { useFetchBreedsQuery } = petsSlice;
