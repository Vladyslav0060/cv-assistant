"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdateUserDto, UpdateUserDtoRole } from "@/api/generated.schemas";
import { useMe } from "@/hooks/auth/useMe";
import { useUpdateUser } from "@/hooks/auth/useUpdateUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserControllerUpdateUserBody } from "@/api/models/user/user.zod";
import { useEnrichedUser } from "@/hooks/user/useEnrichedUser";
import { useCurrentUser } from "@/hooks/auth/current-user";

// const profileSchema = z.object({
//   email: z.email("Invalid email").optional(),
//   firstName: z.string().optional(),
//   lastName: z.string().optional(),
//   avatarUrl: z.url("Invalid URL").optional(),
//   role: z.enum([UpdateUserDtoRole.admin, UpdateUserDtoRole.user]).optional(),
//   address: z.string().optional(),
//   city: z.string().optional(),
//   state: z.string().optional(),
//   zip: z.string().optional(),
//   country: z.string().optional(),
//   phone: z.string().optional(),
//   linkedIn: z.url("Invalid URL").optional(),
//   portfolio: z.url("Invalid URL").optional(),
//   summary: z.string().optional(),
//   skills: z.string().optional(),
//   experience: z.string().optional(),
//   education: z.string().optional(),
//   achievements: z.string().optional(),
// });
// type ProfileFormValues = z.infer<typeof profileSchema>;
type ProfileFormValues = z.infer<typeof UserControllerUpdateUserBody>;

export const ProfileForm = () => {
  const me = useCurrentUser();
  const { data: user } = useEnrichedUser(me?.id);
  // const { data: me, isLoading } = useMe();
  const { mutateAsync, isPending, isError, isSuccess, isLoading } =
    useUpdateUser();

  const form = useForm<ProfileFormValues>({
    // resolver: zodResolver(profileSchema),
    resolver: zodResolver(UserControllerUpdateUserBody),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      avatarUrl: "",
      role: undefined,
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: "",
      linkedIn: "",
      portfolio: "",
      summary: "",
      skills: "",
      experience: "",
      education: "",
      achievements: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!user) return;
    form.reset({
      email: user.email ?? "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      avatarUrl: user.avatarUrl ?? "",
      role: user.role ?? undefined,
      address: user.address ?? "",
      city: user.city ?? "",
      state: user.state ?? "",
      zip: user.zip ?? "",
      country: user.country ?? "",
      phone: user.phone ?? "",
      linkedIn: user.linkedIn ?? "",
      portfolio: user.portfolio ?? "",
      summary: user.summary ?? "",
      skills: user.skills ?? "",
      experience: user.experience ?? "",
      education: user.education ?? "",
      achievements: user.achievements ?? "",
    });
  }, [user, form]);

  async function onSubmit(values: ProfileFormValues) {
    const cleaned: UpdateUserDto = Object.fromEntries(
      Object.entries(values).map(([k, v]) => {
        if (typeof v !== "string") return [k, v];
        const t = v.trim();
        return [k, t.length ? t : undefined];
      }),
    ) as UpdateUserDto;

    await mutateAsync(cleaned);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <FieldSeparator>Basic</FieldSeparator>

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isPending}
                  {...field}
                />
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : []}
                />
              </FieldContent>
            </Field>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Controller
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>First name</FieldLabel>
                <FieldContent>
                  <Input placeholder="John" disabled={isPending} {...field} />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Last name</FieldLabel>
                <FieldContent>
                  <Input placeholder="Doe" disabled={isPending} {...field} />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="avatarUrl"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Avatar URL</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="https://..."
                  disabled={isPending}
                  {...field}
                />
                <FieldDescription>Optional. Public image URL.</FieldDescription>
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : []}
                />
              </FieldContent>
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="role"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Role</FieldLabel>
              <FieldContent>
                <Select
                  value={field.value ?? ""}
                  onValueChange={(v) =>
                    field.onChange(v ? (v as UpdateUserDtoRole) : undefined)
                  }
                  disabled={isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UpdateUserDtoRole.user}>User</SelectItem>
                    <SelectItem value={UpdateUserDtoRole.admin}>
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldDescription>
                  If your backend ignores this for non-admins, it’s safe to
                  leave.
                </FieldDescription>
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : []}
                />
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <FieldSeparator>Contact</FieldSeparator>

        <Controller
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Phone</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="+1 555 000 0000"
                  disabled={isPending}
                  {...field}
                />
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : []}
                />
              </FieldContent>
            </Field>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Controller
            control={form.control}
            name="linkedIn"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>LinkedIn</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="https://linkedin.com/in/..."
                    disabled={isPending}
                    {...field}
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="portfolio"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Portfolio</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="https://..."
                    disabled={isPending}
                    {...field}
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />
        </div>
      </FieldGroup>

      <FieldGroup>
        <FieldSeparator>Address</FieldSeparator>

        <Controller
          control={form.control}
          name="address"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Address</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="Street address"
                  disabled={isPending}
                  {...field}
                />
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : []}
                />
              </FieldContent>
            </Field>
          )}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <Controller
            control={form.control}
            name="city"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>City</FieldLabel>
                <FieldContent>
                  <Input disabled={isPending} {...field} />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="state"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>State</FieldLabel>
                <FieldContent>
                  <Input disabled={isPending} {...field} />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="zip"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>ZIP</FieldLabel>
                <FieldContent>
                  <Input disabled={isPending} {...field} />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="country"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Country</FieldLabel>
              <FieldContent>
                <Input disabled={isPending} {...field} />
                <FieldError
                  errors={fieldState.error ? [fieldState.error] : []}
                />
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <FieldSeparator>CV</FieldSeparator>

        {(
          [
            ["summary", "Summary", "A short professional summary"],
            ["skills", "Skills", "Comma-separated or free text"],
            ["experience", "Experience", "Your recent roles and impact"],
            ["education", "Education", "Degrees, courses, certificates"],
            ["achievements", "Achievements", "Awards, publications, etc."],
          ] as const
        ).map(([name, label, desc]) => (
          <Controller
            key={name}
            control={form.control}
            name={name}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>{label}</FieldLabel>
                <FieldContent>
                  <Textarea
                    placeholder={desc}
                    disabled={isPending}
                    rows={4}
                    {...field}
                  />
                  <FieldDescription>{desc}</FieldDescription>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />
        ))}
      </FieldGroup>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={isPending || isLoading}
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button type="submit" disabled={isPending || isLoading}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>

      {isError && (
        <p className="text-destructive text-sm">
          Failed to update profile. Please try again.
        </p>
      )}
      {isSuccess && <p className="text-sm text-muted-foreground">Saved.</p>}
    </form>
  );
};
