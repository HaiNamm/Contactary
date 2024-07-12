import { axios } from "@/lib/axios";
import { Company } from "./company.type";

export const listCompany = (limit: number, page: number, query: any) =>
  axios.get<{ data: Company[]; paging: { total: number } }>("/company", {
    params: {
      limit,
      page,
      ...query,
    },
  });
