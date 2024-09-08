import { appApi, TAGS } from "@/@core/infra/api/app";

const { USER } = TAGS;

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  image: string;
};

export const usersApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    checkUsernameAvailability: build.query<{ isAvailable: boolean }, string>({
      query: (username) => ({
        url: `/users/check-username?username=${username}`,
        method: "GET",
      }),
    }),
    getUserProfile: build.query<User, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: (result) => [{ type: USER }],
    }),
    updateUserProfile: build.mutation<User, Partial<User>>({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: USER }],
    }),
  }),
});

export const {
  useCheckUsernameAvailabilityQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = usersApi;
