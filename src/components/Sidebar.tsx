import { useNavigate } from "react-router-dom";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
const nav = [
  {
    name: "Search",
    icon: Icons.search,
    path: "/search",
    active: true,
  },
  // {
  //   name: "Enrichment",
  //   icon: Icons.enrichment,
  //   path: "/enrichment",
  //   active: false,
  // },
  // {
  //   name: "User management",
  //   icon: Icons.user,
  //   path: "/user-management",
  //   active: false,
  // },
  // {
  //   name: "Org management",
  //   icon: Icons.org,
  //   path: "/org-management",
  //   active: false,
  // },
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="w-64 border-r border-r-[#EAECF] h-screen flex flex-col justify-between">
      <div className="py-8 px-3">
        <div className="flex items-center space-x-2 text-lg font-semibold text-[#9E77ED] px-3">
          <Icons.logo_purple className="w-8 h-8" />
          <div>Contactary</div>
        </div>
        <div className="mt-6 space-y-2">
          {nav.map((item, index) => (
            <button
              className={cn(
                "px-3 flex items-center space-x-3 py-3 font-medium  w-full rounded-lg duration-200",
                {
                  "bg-slate-100": item.active,
                  "hover:bg-slate-100": !item.active,
                }
              )}
              key={"nav" + index}
            >
              <item.icon className="w-5 h-5" />
              <div>{item.name}</div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="px-3 border-b border-slate-200 pb-6">
          <a
            href="mailto:support@contactary.vn"
            className={cn(
              "px-3 flex items-center space-x-3 py-2 font-medium  w-full rounded-lg duration-200 text-sm"
            )}
          >
            <Icons.help className="w-5 h-5" />
            <div>Get help</div>
          </a>
          {/* <button
            className={cn(
              "px-3 flex items-center space-x-3 py-2 font-medium  w-full rounded-lg duration-200 text-sm"
            )}
          >
            <Icons.document className="w-5 h-5" />
            <div>Document</div>
          </button> */}
        </div>
        <div className="px-3 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="aspect-square h-8 w-8 rounded-full mr-2"
              src="https://github.com/shadcn.png"
            />
            <div className="flex flex-col justify-start items-start">
              <div className="text-xs font-semibold text-slate-900">Shadcn</div>
              <div className="text-xs text-slate-500">binh@contactary.com</div>
            </div>
          </div>
          <button
            className="duration-200 hover:bg-slate-100 p-1 rounded-full"
            onClick={() => {
              localStorage.removeItem("account");
              window.location.reload();
            }}
          >
            <Icons.exit className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
