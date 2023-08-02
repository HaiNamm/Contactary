import { axios } from "@/lib/axios";
import { People } from "./people.type";

export const listPeople = (limit: number, page: number, query: any) =>
  axios.get<{ data: People[]; paging: { total: number } }>("/people", {
    params: {
      limit,
      page,
      ...query,
    },
  });
