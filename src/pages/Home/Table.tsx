import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { People } from "@/core/people/people.type";
import copy from "@/utils/copy";
import getAvatar from "@/utils/getAvatar";

import toast from "react-hot-toast";

type ITable = {
  data: People[];
  onNext: () => void;
  onPrev: () => void;
};

export default function Table({ data, ...props }: ITable) {
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
            <div className="font-semibold">List people</div>
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
        {data.map((people, idx) => (
          <div
            key={"tb" + idx}
            className="w-full border-b border-b-slate-200 flex justify-between"
          >
            <div className="flex-1">
              <div className="px-4 py-4 w-auto flex items-start gap-3">
                <div className="flex items-center space-x-3">
                  {/* <Checkbox className="" /> */}
                  <Avatar>
                    <AvatarImage src={people.avatar} />
                    <AvatarFallback>{getAvatar(people.name)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="flex gap-2 items-center">
                    <h1 className="font-bold text-black">{people.name}</h1>
                    <a href={people.linkedin} target="_blank">
                      <Icons.linkedin className="w-3 h-3 text-slate-400 hover:text-slate-600" />
                    </a>
                  </div>

                  {people.experiences &&
                    people.experiences.length > 0 &&
                    people.experiences.map((exp, i) => (
                      <div
                        className="flex gap-2 items-center mt-2 text-sm"
                        key={"exp" + i}
                      >
                        <div>
                          <Icons.job />
                        </div>
                        <p className="text-left">
                          {exp.job_title} at{" "}
                          <a
                            href={exp.company.linkedin}
                            target="_blank"
                            className="font-semibold"
                          >
                            {exp.company.name}
                          </a>{" "}
                          in {exp.from} - {exp.to}
                        </p>
                      </div>
                    ))}
                  {/* <div className="flex flex-row items-center cursor-pointer mt-1">
                    <span className="text-primary font-semibold text-sm mr-1">
                      ...more
                    </span>
                    <Icons.select_down className="" />
                  </div> */}
                </div>
              </div>
            </div>
            <div className="w-[300px] overflow-hidden text-ellipsis whitespace-nowrap pl-2 flex flex-col items-start justify-center h-full py-5 space-y-2">
              {people.email != "" && (
                <button
                  className="flex gap-2 items-center text-sm text-slate-500 group relative"
                  onClick={() => {
                    copy(people.email);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <div className="absolute w-[calc(100%+1rem)] h-[calc(100%+0.5rem)] duration-200 group-hover:bg-slate-200 rounded-md top-0 left-0 z-10 -translate-x-2 -translate-y-1"></div>
                  <div className="relative gap-2 z-20 flex gap-x items-center">
                    <Icons.email />
                    <p className="overflow-hidden text-ellipsis">
                      {people.email}
                    </p>
                    <Icons.online />
                  </div>
                </button>
              )}
              {people.phone && (
                <button
                  className="flex gap-2 items-center text-sm text-slate-500 group relative"
                  onClick={() => {
                    copy(people.email);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <div className="absolute w-[calc(100%+1rem)] h-[calc(100%+0.5rem)] duration-200 group-hover:bg-slate-200 rounded-md top-0 left-0 z-10 -translate-x-2 -translate-y-1"></div>
                  <div className="relative gap-2 z-20 flex gap-x items-center">
                    <Icons.phone />
                    <p className="overflow-hidden text-ellipsis">
                      {people.phone}
                    </p>
                    <Icons.online />
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
