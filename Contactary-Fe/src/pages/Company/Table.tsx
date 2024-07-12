import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Company } from "@/core/company/company.type";
import { People } from "@/core/people/people.type";
import copy from "@/utils/copy";
import getAvatar from "@/utils/getAvatar";

import toast from "react-hot-toast";

type ITable = {
  data: Company[];
  onNext: () => void;
  onPrev: () => void;
};

export default function Table({ data, ...props }: ITable) {
  console.log(data);
  return (
    <div className="border rounded-xl relative overflow-hidden h-full">
      <div className="rounded-t-xl w-full border-b border-b-slate-200">
        <div className="w-full rounded-t-xl flex justify-between items-center bg-slate-100 hover:bg-slate-100">
          <div className="py-3 px-4">
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select all
              </label>
            </div> */}
            <div className="font-semibold">List company</div>
          </div>
          {/* <div className="w-[250px] py-3 px-4">
            <div className="flex items-center space-x-2 justify-end">
              <Button disabled size={"sm"}>
                Save
              </Button>
              <Button size={"sm"} variant={"outline"}>
                Export
              </Button>
            </div>
          </div> */}
        </div>
      </div>
      <div className="overflow-scroll h-full pb-32">
        {data.map((company, idx) => (
          <div
            key={"tb" + idx}
            className="w-full border-b border-b-slate-200 flex justify-between"
          >
            <div className="flex-1">
              <div className="px-4 py-4 w-auto flex items-start gap-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={company.image} />
                    <AvatarFallback>{getAvatar(company.name)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="flex gap-2 items-center">
                    <h1 className="font-bold text-black text-left">
                      {company.name}
                    </h1>
                    <a href={company.linkedin} target="_blank">
                      <Icons.linkedin className="w-3 h-3 text-slate-400 hover:text-slate-600" />
                    </a>
                  </div>

                  {/* <div className="flex flex-row items-center cursor-pointer mt-1">
                    <span className="text-primary font-semibold text-sm mr-1">
                      ...more
                    </span>
                    <Icons.select_down className="" />
                  </div> */}
                  <div className="text-sm text-left">{company.about}</div>
                </div>
              </div>
            </div>
            <div className="w-[300px] overflow-hidden text-ellipsis whitespace-nowrap pl-2 flex flex-col items-start justify-center h-full py-5 space-y-2">
              {company.size != null && (
                <button className="flex gap-2 items-center text-sm text-slate-500 group relative">
                  <div className="absolute w-[calc(100%+1rem)] h-[calc(100%+0.5rem)] duration-200 group-hover:bg-slate-200 rounded-md top-0 left-0 z-10 -translate-x-2 -translate-y-1"></div>
                  <div className="relative gap-2 z-20 flex gap-x items-center">
                    <Icons.employee />
                    <p className="overflow-hidden text-ellipsis">
                      {company.size}
                    </p>
                  </div>
                </button>
              )}
              {company.industry != null && (
                <button className="flex gap-2 items-center text-sm text-slate-500 group relative">
                  <div className="absolute w-[calc(100%+1rem)] h-[calc(100%+0.5rem)] duration-200 group-hover:bg-slate-200 rounded-md top-0 left-0 z-10 -translate-x-2 -translate-y-1"></div>
                  <div className="relative gap-2 z-20 flex gap-x items-center">
                    <Icons.job />
                    <p className="overflow-hidden text-ellipsis">
                      {company.industry}
                    </p>
                  </div>
                </button>
              )}
              {company.address != null && (
                <button className="flex gap-2 items-center text-sm text-slate-500 group relative">
                  <div className="absolute w-[calc(100%+1rem)] h-[calc(100%+0.5rem)] duration-200 group-hover:bg-slate-200 rounded-md top-0 left-0 z-10 -translate-x-2 -translate-y-1"></div>
                  <div className="relative gap-2 z-20 flex gap-x items-center">
                    <Icons.map />
                    <p className="overflow-hidden text-ellipsis">
                      {company.address}
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-between gap-2 rounded-b-md px-3 py-4 border-t border-t-slate-200 bg-slate-100 absolute bottom-0 w-full z-[1000]">
        <Button variant="outline" className="rounded-lg" onClick={props.onPrev}>
          <span className="">
            <Icons.arrow_left className="w-5 h-5" />
          </span>
          <span className="pl-2">Previous</span>
        </Button>

        <Button variant="outline" className="rounded-lg" onClick={props.onNext}>
          <span className="pr-2">Next</span>
          <span className="">
            <Icons.arrow_right className="w-5 h-5" />
          </span>
        </Button>
      </div>
    </div>
  );
}
