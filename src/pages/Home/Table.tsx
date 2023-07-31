import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRef } from "react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
const user_info = [
  {
    name: "Cris Binh",
    location: "Ha Noi, Viet Nam",
    job: "Director - Environmental, Health & Safety at TreeHouse Foods in 2022 - Present",
    seniority: "Doctor of Philosophy - PhD in 2015",
    email: "lequocbinh@gmail.com",
    phone: "0123 567 890",
  },
];

export default function TableDemo() {
  const headerRef = useRef<any>(null);
  return (
    <div className="border rounded-xl relative overflow-hidden h-full">
      <div className="rounded-t-xl w-full border-b border-b-slate-200">
        <div className="w-full rounded-t-xl flex justify-between items-center bg-slate-100 hover:bg-slate-100">
          <div className="py-3 px-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select all
              </label>
            </div>
          </div>
          <div className="w-[250px] py-3 px-4">
            <div className="flex items-center space-x-2 justify-end">
              <Button disabled size={"sm"}>
                Save
              </Button>
              <Button size={"sm"} variant={"outline"}>
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-scroll h-full pb-32">
        {Array(25)
          .fill(null)
          .map((invoice, idx) => (
            <div
              key={"tb" + idx}
              className="w-full border-b border-b-slate-200 flex justify-between"
            >
              <div className="">
                <div className="px-4 py-4 w-auto flex items-start gap-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox className="" />
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <div className="flex gap-2">
                      <h1 className="font-bold text-black">
                        {user_info[0].name}
                      </h1>
                      <div>
                        <span className="border-r-2 h-3 border-slate-200" />
                      </div>
                      <p className="text-slate-300 font-normal">
                        {user_info[0].location}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center mt-2 text-sm">
                      <Icons.job />
                      <p>{user_info[0].job}</p>
                    </div>
                    <div className="flex gap-2 items-center mt-1 text-sm">
                      <Icons.graduation />
                      <p>{user_info[0].seniority}</p>
                    </div>
                    <div className="flex flex-row items-center cursor-pointer mt-1">
                      <span className="text-purple-bold text-sm mr-1">
                        ...more
                      </span>
                      <Icons.select_down className="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[250px] flex flex-col items-start justify-center h-full py-5">
                <div className="flex gap-2 items-center text-sm text-slate-500">
                  <Icons.email />
                  <p>{user_info[0].email}</p>
                  <Icons.online />
                </div>
                <div className="flex gap-2 items-center mt-2 text-sm text-slate-500">
                  <Icons.phone />
                  <p>{user_info[0].phone}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-row justify-between gap-2 rounded-b-md px-3 py-4 border-t border-t-slate-200 bg-slate-100 absolute bottom-0 w-full">
        <Button variant="outline" className="rounded-lg">
          <span className="">
            <Icons.arrow_left className="w-5 h-5" />
          </span>
          <span className="pl-2">Previous</span>
        </Button>

        <Button variant="outline" className="rounded-lg">
          <span className="pr-2">Next</span>
          <span className="">
            <Icons.arrow_right className="w-5 h-5" />
          </span>
        </Button>
      </div>
    </div>
  );
}
