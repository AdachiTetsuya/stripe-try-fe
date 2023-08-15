import { apiClient } from "api/axios";
import { Chapter, ChapterAPI } from "utils/types/chapter";

export const getChapters = async (params = {}) => {
  const chapters: Array<Chapter> = [];
  await apiClient
    .get("chapters/", {
      params: params,
    })
    .then((response) => {
      response.data.map((chapter: ChapterAPI) => {
        chapters.push({
          id: chapter.id,
          title: chapter.title,
          isFree: chapter.is_free,
          price: chapter.price,
          productId: chapter.product_id,
          priceId: chapter.price_id,
          isLocked: chapter.is_locked,
        });
      });
    })
    .catch((err) => console.log(err));
  return chapters;
};

export const retrieveChapter = async (id: number | string) => {
  let chapter: Chapter | undefined;
  await apiClient
    .get(`chapters/${id}/`)
    .then((response) => {
      const data = response.data as ChapterAPI;
      chapter = {
        id: data.id,
        title: data.title,
        isFree: data.is_free,
        price: data.price,
        productId: data.product_id,
        priceId: data.price_id,
        isLocked: data.is_locked,
      };
    })
    .catch((err) => console.log(err));
  return chapter;
};
