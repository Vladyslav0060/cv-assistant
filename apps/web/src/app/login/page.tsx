"use client";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <div className="flex flex-col">
      <p>LoginPage</p>
      <LoginForm />
    </div>
  );
}
