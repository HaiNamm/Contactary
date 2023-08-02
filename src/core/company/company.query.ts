import { useQuery } from "@tanstack/react-query";
import { listCompany } from "./company.api";

export const useListCompanyQuery = (limit: number, page: number, query: any) =>
  useQuery(["listCompany", limit, page, query], () =>
    listCompany(limit, page, query)
  );
