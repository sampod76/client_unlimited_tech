import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";

const URL = "/buyer-users";

export const buyersEndPoint = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllBuyers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        // console.log(response);
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.buyer],
    }),

    // get single academic department
    getSingleBuyers: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => ({ data: response }),
      providesTags: [tagTypes.buyer],
    }),
    // create a new academic department
    addBuyers: build.mutation({
      query: (data) => ({
        url: URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.buyer],
    }),
    // update ac department
    updateBuyers: build.mutation({
      query: ({ data, id }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        body: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.buyer],
    }),

    // delete ac department
    deleteBuyers: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.buyer],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddBuyersMutation,
  useUpdateBuyersMutation,
  useDeleteBuyersMutation,
  useGetAllBuyersQuery,
  useGetSingleBuyersQuery,
} = buyersEndPoint;
