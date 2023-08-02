import { useQuery } from "@tanstack/react-query";
import { listPeople } from "./people.api";

export const useListPeopleQuery = (limit: number, page: number, query: any) =>
  useQuery(["listPeople", limit, page, query], () =>
    listPeople(limit, page, query)
  );
