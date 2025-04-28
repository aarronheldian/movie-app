import { DataTrendingAll } from "./type";
import { SERVICE_MODULE } from "@/constants/service";
import callApi from "@/helpers/network";

export const MovieService = {
  getSearchMovie: {
    call: (params: { query: string, page: number}) => {
      return callApi.get<DataTrendingAll>(
        `/${SERVICE_MODULE.TMDB}/search/movie`, { params }
      );
    },
    key: "get-search-movie",
  },
};