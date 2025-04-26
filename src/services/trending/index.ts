import { DataTrendingAll } from "./type";
import { SERVICE_MODULE } from "@/constants/service";
import callApi from "@/helpers/network";

export const TrendingService = {
  getTrendingAll: {
    call: () => {
      return callApi.get<DataTrendingAll>(
        `/${SERVICE_MODULE.TMDB}/trending/all/day`
      );
    },
    key: "get-trending-all",
  },
};
