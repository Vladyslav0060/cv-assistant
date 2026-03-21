"use client";

import { JSX, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  AddressInfoInputs,
  ContactInfoInputs,
  CVInputs,
  PersonalInfoInputs,
  TabGroupProps,
} from "./GroupedTabInputs";
import { Typography } from "@/components/ui/typography";

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

const USER_TABS = {
  PERSONAL_INFO: "Personal Info",
  CONTACT: "Contact",
  ADDRESS: "Address",
  DETAILS: "Details",
};

type UserTabValue = (typeof USER_TABS)[keyof typeof USER_TABS];

const TAB_GROUP_COMPONENTS: Record<
  UserTabValue,
  (props: TabGroupProps) => JSX.Element | null
> = {
  [USER_TABS.PERSONAL_INFO]: (props) => <PersonalInfoInputs {...props} />,
  [USER_TABS.CONTACT]: (props) => <ContactInfoInputs {...props} />,
  [USER_TABS.ADDRESS]: (props) => <AddressInfoInputs {...props} />,
  [USER_TABS.DETAILS]: (props) => <CVInputs {...props} />,
};

const renderTabGroup = (tab: UserTabValue, props: TabGroupProps) =>
  TAB_GROUP_COMPONENTS[tab]?.(props) ?? null;

export const PERSONAL_NAME_FIELDS = [
  {
    name: "firstName",
    label: "First name",
    placeholder: "John",
  },
  {
    name: "lastName",
    label: "Last name",
    placeholder: "Doe",
  },
] as const;

const CONTACT_FIELDS = [
  {
    name: "linkedIn",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/...",
  },
  {
    name: "portfolio",
    label: "Portfolio",
    placeholder: "https://...",
  },
] as const;

const ADDRESS_FIELDS = [
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "zip", label: "ZIP" },
] as const;

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
    <FormProvider {...form}>
      <Typography element="h2" as={"h2"} className="mb-2">
        Profile
      </Typography>
      <Tabs defaultValue={USER_TABS.PERSONAL_INFO} className="gap-4">
        <TabsList>
          {Object.values(USER_TABS).map((tabValue) => (
            <TabsTrigger value={tabValue} key={tabValue}>
              {tabValue}
            </TabsTrigger>
          ))}
        </TabsList>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {Object.values(USER_TABS).map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue}>
              <Card>
                <CardContent>
                  <FieldGroup>
                    {renderTabGroup(tabValue, { isPending })}
                  </FieldGroup>
                </CardContent>
              </Card>
            </TabsContent>
          ))}

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
      </Tabs>
    </FormProvider>
  );
};
