"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import pb from "@/lib/pocketbase";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export function LoginForm({
  className,
  isSignUp = false,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & { isSignUp?: boolean }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpId, setOtpId] = useState<string>();

  useEffect(() => {
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Prevent multiple submissions
    setIsSubmitting(true);

    // Do something with the form values
    console.log(values);

    try {
      if (isSignUp) {
        const user = await pb.collection("users").create({
          email: values.email,
          password: "12345678",
          passwordConfirm: "12345678",
        });
        console.log(user);
      }

      const result = await pb.collection("users").requestOTP(values.email);
      console.log(result);
      setOtpId(result.otpId);
    } catch (error) {
      console.error("Error during login:", error);
    }

    setIsSubmitting(false);
  }

  if (otpId) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl font-bold text-center">Check your inbox</h1>
        <p className="text-balance text-sm text-muted-foreground text-center">
          If the email is valid, you should receive a one-time password
        </p>
        <InputOTPForm otpId={otpId} />
      </div>
    );
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{`${
          isSignUp ? "Create" : "Login to"
        } your account`}</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {`Enter your email below to ${
            isSignUp ? "create" : "login to"
          } your account`}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : isSignUp ? "Create Account" : "Login"}
        </Button>
      </div>
      <div className="text-center text-sm">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        {isSignUp ? (
          <a href="login" className="underline underline-offset-4">
            Login
          </a>
        ) : (
          <a href="signup" className="underline underline-offset-4">
            Sign up
          </a>
        )}
      </div>
    </form>
  );
}

const otpSchema = z.object({
  pin: z
    .string()
    .min(6, {
      message: "Your one-time password must be 6 characters.",
    })
    .max(6, {
      message: "Your one-time password must be 6 characters.",
    }),
});

function InputOTPForm({ otpId }: { otpId: string }) {
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof otpSchema>) {
    console.log(data);
    const authData = await pb.collection("users").authWithOTP(otpId, data.pin);
    console.log("Login successful:", authData);
    console.log("pb.authStore.isValid", pb.authStore.isValid);
    console.log("pb.authStore.token", pb.authStore.token);
    console.log("pb.authStore.record.id", pb.authStore.record?.id);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
