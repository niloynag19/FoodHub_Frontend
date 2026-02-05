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
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

const fromSchema = z.object({
  name: z.string().min(1, "This field is required"),
  password: z.string().min(8, "This field is required"),
  email: z.email(),
})

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: fromSchema
    },
    onSubmit: async ({ value }) => {
      const toastId=toast.loading("Creating user");
      try {
        const {data,error}= await authClient.signUp.email({
          name:value.name,
          email:value.email,
          password:value.password,
          callbackURL:"/"
        })
        if(error)
        {
          toast.error(error.message,{id:toastId})
          return;
        }
        toast.success("User created successfully",{id:toastId})
      } catch (error) {
        toast.error("Something went wrong",{id:toastId})
      }
    }
  })
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
          <FieldGroup>
            <form.Field name="name" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )

                  }
                </Field>
              )
            }} />
            <form.Field name="email" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )

                  }
                </Field>
              )
            }} />
            <form.Field name="password" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )
                  }
                </Field>
              )
            }} />
          </FieldGroup>

        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button form="login-form" type="submit" className="w-full">Submit</Button>
      </CardFooter>
    </Card>
  )
}
