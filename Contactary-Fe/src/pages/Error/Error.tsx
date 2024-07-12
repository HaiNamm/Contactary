import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function Error() {
    return (
        <div className="container flex h-screen w-screen flex-col items-start justify-center">
            <div className="mx-auto flex w-full flex-col items-start space-y-5">
                <p className="font-medium text-primary">404 error</p>
                <h1 className="font-semibold text-5xl">We can't find that page</h1>
                <p className="">Sorry, the page you are looking for doesn't exist or has been moved</p>
            </div>
            <div className="flex gap-2 mt-8">
                <Button className="text-xs border border-gray-300 bg-white text-black hover:bg-slate-100">
                    <Icons.arrow_left className="mr-2 h-4 w-4"/>
                    Go back
                </Button>
                <Button className="text-xs">Home</Button>
            </div>
        </div>
    )
}