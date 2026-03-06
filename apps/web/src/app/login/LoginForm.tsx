// apps/web/src/app/login/LoginForm.tsx
"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthControllerLoginBody } from "@/api/models/auth/auth.zod";
import { Card } from "@/components/ui/card";

type LoginDto = z.infer<typeof AuthControllerLoginBody>;

export default function LoginForm() {
  const { mutate: handleLogin } = useLogin();
  const methods = useForm<LoginDto>({
    resolver: zodResolver(AuthControllerLoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<LoginDto> = async (formData: LoginDto) => {
    handleLogin(formData);
  };

  return (
    <FormProvider {...methods}>
      <Card size="sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "grid", gap: 12 }}
        >
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input placeholder="Email" {...field} />
              </Field>
            )}
          ></Controller>

          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input placeholder="Password" {...field} />
              </Field>
            )}
          ></Controller>

          {/* <button type="submit" disabled={login.isPending}>
        {login.isPending ? "Signing in…" : "Sign in"}
      </button>

      {login.isError && (
        <p style={{ color: "crimson" }}>
          {login.error instanceof Error ? login.error.message : "Login failed"}
        </p>
      )} */}
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </FormProvider>
  );
}
