import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { emitter } from "@/lib/emitter";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Filter = {
  company_name: string;
  company_size: string;
  company_industry: string;
};

export default function Subbar() {
  const navigate = useNavigate();
  const [data, setData] = useState<Filter>({
    company_name: "",
    company_size: "",
    company_industry: "",
  });
  return (
    <div className="w-72 overflow-hidden bg-[#F9FAFB] py-6 relative h-screen">
      <div className="px-4 pb-3 border-b border-b-slate-200">
        <Tabs
          defaultValue="company"
          className="w-full"
          onValueChange={(e) => {
            if (e == "people") navigate("/");
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="company">Companies</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="h-full flex flex-col">
        <div className="overflow-scroll flex-1 px-4">
          <FormSearch setData={setData} />
        </div>
        <div className="px-4 bg-[#F9FAFB] absolute bottom-0 py-6 w-full border-t border-t-slate-200">
          <Button
            className="w-full"
            onClick={() => {
              emitter.emit("search", data);
            }}
          >
            <Icons.search_white className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

const FormSearch = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<Filter>>;
}) => {
  return (
    <div className="mt-3 pb-32">
      <div className="grid w-full max-w-sm gap-1.5 items-start mt-4">
        <Label htmlFor="company" className="text-left">
          Company
        </Label>
        <Input
          placeholder="e.g Ecloudvalley"
          id="company"
          onChange={(e) =>
            setData((old) => ({ ...old, company_name: e.target.value }))
          }
        />
      </div>
      <div className="mt-4 flex flex-col justify-start">
        <Label htmlFor="company_size" className="text-left">
          Company size
        </Label>
        <Select
          onValueChange={(e) => {
            setData((old) => ({ ...old, company_size: e }));
          }}
        >
          <SelectTrigger className="w-full bg-white mt-2" id="company_size">
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Company size</SelectLabel>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="11-50">11-50</SelectItem>
              <SelectItem value="51-200">51-200</SelectItem>
              <SelectItem value="201-500">201-500</SelectItem>
              <SelectItem value="501-1,000">501-1,000</SelectItem>
              <SelectItem value="1,001-5,000">1,001-5,000</SelectItem>
              <SelectItem value="5,001-10,000">5,001-10,000</SelectItem>
              <SelectItem value="10,001+">10,000+</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full max-w-sm gap-1.5 items-start mt-4">
        <Label htmlFor="industry" className="text-left">
          Industry
        </Label>
        <Input
          placeholder="e.g Retail"
          id="industry"
          onChange={(e) =>
            setData((old) => ({ ...old, company_industry: e.target.value }))
          }
        />
      </div>
    </div>
  );
};
