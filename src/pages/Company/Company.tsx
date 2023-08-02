import { useListPeopleQuery } from "@/core/people/people.query";
import Table from "./Table";
import { useEffect, useState } from "react";
import { emitter } from "@/lib/emitter";
import Sidebar from "@/components/Sidebar";
import Subbar from "./Subbar";
import { useListCompanyQuery } from "@/core/company/company.query";

type Filter = {
  company_name: string;
  company_size: string;
  company_industry: string;
};

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<Filter>({
    company_name: "",
    company_size: "",
    company_industry: "",
  });
  const { data } = useListCompanyQuery(limit, page, query);
  useEffect(() => {
    emitter.on("search", (data: any) => {
      setQuery(data);
      setPage(1);
    });
    return () => {
      emitter.off("search");
    };
  }, []);

  return (
    <div className="flex">
      <div className="flex">
        <Sidebar />
        <Subbar />
      </div>
      <div className="bg-[#FCFCFD] w-full p-8 h-screen">
        <div className="h-full w-auto flex flex-col">
          <Table
            data={data?.data.data ?? []}
            onNext={() => {
              setPage((old) => {
                if (!data?.data) return old;
                if (old === Math.ceil(data?.data.paging.total / limit)) {
                  return old;
                }
                return old + 1;
              });
            }}
            onPrev={() => {
              setPage((old) => {
                if (old === 1) {
                  return old;
                }
                return old - 1;
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
