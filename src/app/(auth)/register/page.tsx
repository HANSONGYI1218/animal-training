import RegisterForm from "@/components/auth/register/register-from";

export default async function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center py-12">
      <RegisterForm />
    </div>
  );
}
