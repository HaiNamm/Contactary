import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Subbar() {
  return (
    <div className="w-72 overflow-hidden bg-[#F9FAFB] py-6 relative h-screen">
      <div className="px-4 pb-3 border-b border-b-slate-200">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">People</TabsTrigger>
            <TabsTrigger value="password">Companies</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="h-full flex flex-col">
        <div className="overflow-scroll flex-1 px-4">
          <FormSearch />
        </div>
        <div className="px-4 bg-[#F9FAFB] absolute bottom-0 py-6 w-full border-t border-t-slate-200">
          <Button className="w-full">
            <Icons.search_white className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

const FormSearch = () => {
  return (
    <div className="mt-3 pb-32">
      <div className="grid w-full max-w-sm gap-1.5 items-start">
        <Label htmlFor="email" className="text-left">
          Name
        </Label>
        <Input placeholder="e.g Cris" />
      </div>
      <div className="grid w-full max-w-sm gap-1.5 items-start mt-4">
        <Label htmlFor="email" className="text-left">
          Job title
        </Label>
        <Input placeholder="e.g Cloud engineer" />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Include related titles
        </label>
      </div>
      <div className="mt-4 flex flex-col justify-start">
        <Label htmlFor="email" className="text-left">
          Seniority
        </Label>
        <Select>
          <SelectTrigger className="w-full bg-white mt-2">
            <SelectValue placeholder="Select seniority level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Seniority</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="a">Apple2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 flex flex-col justify-start">
        <Label htmlFor="email" className="text-left">
          Department
        </Label>
        <Select>
          <SelectTrigger className="w-full bg-white mt-2">
            <SelectValue placeholder="e.g C Suite" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Seniority</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="a">Apple2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full max-w-sm gap-1.5 items-start mt-4">
        <Label htmlFor="email" className="text-left">
          Skills
        </Label>
        <Input placeholder="e.g Javascript" />
      </div>
      <div className="mt-4 flex flex-col justify-start">
        <Label htmlFor="email" className="text-left">
          Years in current role
        </Label>
        <Select>
          <SelectTrigger className="w-full bg-white mt-2">
            <SelectValue placeholder="Select experience range" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Seniority</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="a">Apple2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full max-w-sm gap-1.5 items-start mt-4">
        <Label htmlFor="email" className="text-left">
          Company
        </Label>
        <Input placeholder="e.g Ecloudvalley" />
      </div>
      <div className="mt-4 flex flex-col justify-start">
        <Label htmlFor="email" className="text-left">
          Company size
        </Label>
        <Select>
          <SelectTrigger className="w-full bg-white mt-2">
            <SelectValue placeholder="Select company size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Seniority</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="a">Apple2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Exclude companies
        </label>
      </div>
      <div className="mt-4 flex flex-col justify-start">
        <Label htmlFor="email" className="text-left">
          Industry
        </Label>
        <Select>
          <SelectTrigger className="w-full bg-white mt-2">
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Seniority</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="a">Apple2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full max-w-sm gap-1.5 items-start mt-4">
        <Label htmlFor="email" className="text-left">
          Keyword
        </Label>
        <Input placeholder="e.g Ecloudvalley" />
      </div>
      <div className="grid w-full max-w-sm gap-1.5 items-start mt-4">
        <Label htmlFor="email" className="text-left">
          School
        </Label>
        <Input placeholder="e.g Ecloudvalley" />
      </div>
      <div className="grid w-full max-w-sm gap-1.5 items-start mt-4">
        <Label htmlFor="email" className="text-left">
          School
        </Label>
        <Input placeholder="e.g Ecloudvalley" />
      </div>
    </div>
  );
};
