"use client";
import { Container } from "@/components/ui/container";
import LoginForm from "../../components/feature/auth/LoginForm";

export default function LoginPage() {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <Container className="flex flex-col justify-center max-w-sm">
      <LoginForm />
    </Container>
  );
}
