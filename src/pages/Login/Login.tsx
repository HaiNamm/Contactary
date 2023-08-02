import { Icons } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useChangePasswordMutation,
  useLoginMutation,
} from "@/core/auth/auth.query";
import { cn } from "@/lib/utils";
import { DASHBOARD_PATH } from "@/routes/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .nonempty("Please enter your email address"),
  password: z.string().nonempty("Please enter your password"),
});

export default function Login() {
  const { mutate, data, error, isLoading } = useLoginMutation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };

  useEffect(() => {
    if (!error) return;
    toast.error("Email or password is incorrect, please try again.");
  }, [error]);

  useEffect(() => {
    if (!data) return;
    if (data.data.data.ChallengeName === "NEW_PASSWORD_REQUIRED") {
      setOpen(true);
      return;
    }
    if (!data.data.data.AuthenticationResult) return;
    toast.success("Login success! Welcome back!");
    navigate(DASHBOARD_PATH);
    localStorage.account = JSON.stringify({
      access: data.data.data.AuthenticationResult.AccessToken,
      refresh: data.data.data.AuthenticationResult.RefreshToken,
    });
  }, [data]);

  const callback = (password: string) => {
    setValue("password", password);
    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 100);
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <ModalChangePass
        open={open}
        setOpen={setOpen}
        email={getValues("email")}
        callback={callback}
      />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <div className={cn("grid gap-6")}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@contactary.com"
                  type="email"
                  autoCapitalize="none"
                  disabled={isLoading}
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="px-1 text-xs text-left text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="••••••••••"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("password")}
                />
                {errors?.password && (
                  <p className="px-1 text-xs text-left text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button disabled={isLoading || Object.keys(errors).length > 0}>
                {isLoading && (
                  <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() => {
              // setIsGitHubLoading(true);
              // signIn("github");
            }}
            // disabled={isLoading || isGitHubLoading}
          >
            {/* {isGitHubLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : ( */}
            <Icons.microsoft className="mr-2 h-4 w-4" />
            {/* )}{" "}*/}
            Microsoft
          </button>
        </div>
      </div>
    </div>
  );
}

const ModalChangePass = ({
  open,
  setOpen,
  email,
  callback,
}: {
  open: boolean;
  setOpen: any;
  email: string;
  callback: (newPassword: string) => void;
}) => {
  const { mutate, data, error, isLoading } = useChangePasswordMutation();
  const formSchema = z
    .object({
      oldPassword: z.string().nonempty("Please enter your password"),
      password: z
        .string()
        .nonempty("Please enter your password")
        .regex(
          /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/,
          "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
        ),
      confirmPassword: z.string().nonempty("Please enter your password"),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (password !== confirmPassword) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password and confirm password must be the same",
          path: ["confirmPassword"],
        });
      }
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      email,
      password: values.password,
      oldPassword: values.oldPassword,
    });
  }

  useEffect(() => {
    if (!error) return;
    toast.error((error as any).message);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    toast.success("Change password success!");
    setOpen(false);
    callback(form.getValues("password"));
  }, [data]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please change your password</AlertDialogTitle>
          <AlertDialogDescription>
            Your password is expired, please change your password to continue to
            Contactary
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Old password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="New password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={
                      isLoading || Object.keys(form.formState.errors).length > 0
                    }
                  >
                    {isLoading && (
                      <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Change password
                  </Button>
                </div>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
