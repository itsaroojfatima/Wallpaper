import { PEXELS_API_KEY, PEXELS_BASE_URL } from "@/constants/config";
import { PexelsSearchResponse } from "@/types/wallpaper";

const headers = {
  Authorization: PEXELS_API_KEY,
};

export const fetchWallpapers = async (
  pageNum: number,
  perPage = 20,
): Promise<PexelsSearchResponse> => {
  const response = await fetch(
    `${PEXELS_BASE_URL}/search?query=wallpaper&per_page=${perPage}&page=${pageNum}`,
    { headers },
  );
  return response.json();
};

export const fetchCategoryWallpapers = async (
  query: string,
  perPage = 20,
): Promise<PexelsSearchResponse> => {
  const response = await fetch(
    `${PEXELS_BASE_URL}/search?query=${encodeURIComponent(query)}&per_page=${perPage}`,
    { headers },
  );
  return response.json();
};

export const fetchNewWallpapers = async (
  perPage = 20,
): Promise<PexelsSearchResponse> => {
  const response = await fetch(
    `${PEXELS_BASE_URL}/search?query=aesthetic%20minimal&per_page=${perPage}`,
    { headers },
  );
  return response.json();
};

export const fetchTrendingWallpapers = async (
  perPage = 20,
): Promise<PexelsSearchResponse> => {
  const response = await fetch(
    `${PEXELS_BASE_URL}/search?query=trending%20popular&per_page=${perPage}`,
    { headers },
  );
  return response.json();
};
