"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useForm } from "@tanstack/react-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import * as z from "zod"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useState } from "react"
import { LogIn, Mail, Lock, UserCog, User } from "lucide-react"

const fromSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Please enter a valid email address"),
})


export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Submit clicked:", value);
      const validation = fromSchema.safeParse(value);
      if (!validation.success) {
        console.error("Validation failed:", validation.error);
        toast.error(validation.error.issues[0].message);
        return;
      }


      const toastId = toast.loading("Logging in...");
      setIsLoading(true);
      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        })
        if (error) {
          console.error("Login error:", error);
          toast.error(error.message || "Invalid credentials", { id: toastId })
          setIsLoading(false);
          return;
        }
        toast.success("Welcome back!", { id: toastId })
        window.location.href = "/";
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong", { id: toastId })
        setIsLoading(false);
      }
    }
  })


  const fillDemoCredentials = (role: 'admin' | 'provider') => {
    if (role === 'admin') {
      form.setFieldValue('email', 'admin@admin.com');
      form.setFieldValue('password', 'admin1234');
    } else {
      form.setFieldValue('email', 'provider@gmail.com');
      form.setFieldValue('password', 'provider12345');
    }
    toast.info(`${role.charAt(0).toUpperCase() + role.slice(1)} credentials filled!`);
  };

  const onGoogleSignIn = async () => {
    const toastId = toast.loading("Redirecting to Google...");
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }
      toast.success("Redirecting...", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-md overflow-hidden" {...props}>
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" />
      <CardHeader className="space-y-1 pb-4">
        <div className="flex justify-center mb-2">
          <div className="p-3 rounded-2xl bg-orange-100 text-orange-600">
            <LogIn className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center tracking-tight">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your FoodHub account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}>
          <FieldGroup className="space-y-4">
            <form.Field name="email" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field className="space-y-1.5">
                  <FieldLabel htmlFor={field.name} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Mail className="h-3 w-3" /> Email Address
                  </FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    placeholder="name@example.com"
                    className="h-11 rounded-xl border-zinc-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }} />
            <form.Field name="password" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Lock className="h-3 w-3" /> Password
                    </FieldLabel>
                    <Link href="#" className="text-[10px] font-bold text-orange-600 hover:underline uppercase tracking-widest">Forgot?</Link>
                  </div>
                  <Input
                    type="password"
                    id={field.name}
                    placeholder="••••••••"
                    className="h-11 rounded-xl border-zinc-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }} />
          </FieldGroup>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-11 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-lg shadow-orange-200 transition-all active:scale-[0.98] mt-6"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            className="h-9 rounded-xl border-dashed border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-[10px] font-bold uppercase tracking-tighter"
            onClick={() => fillDemoCredentials('admin')}
          >
            <UserCog className="mr-1.5 h-3.5 w-3.5" /> Demo Admin
          </Button>
          <Button 
            type="button"
            variant="outline" 
            size="sm" 
            className="h-9 rounded-xl border-dashed border-blue-200 hover:border-blue-500 hover:bg-blue-50 text-[10px] font-bold uppercase tracking-tighter"
            onClick={() => fillDemoCredentials('provider')}
          >
            <User className="mr-1.5 h-3.5 w-3.5" /> Demo Provider
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="relative w-full py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-100" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
            <span className="bg-white px-3 text-zinc-400">
              Or connect with
            </span>
          </div>
        </div>

        <Button 
          variant="outline" 
          type="button" 
          className="w-full h-11 rounded-xl border-zinc-200 hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 font-semibold text-zinc-700"
          onClick={onGoogleSignIn}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-orange-600 hover:underline">
            Create an account
          </Link>
        </p>
      </CardFooter>

    </Card>
  )
}

