import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import HalftoneBackground from "@/components/HalftoneBackground";

export default function LoginPage() {
  return (
    <>
      <HalftoneBackground />
      <main className="min-h-screen bg-transparent flex flex-col relative z-10">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-20 py-8">
          <LoginForm />
        </div>
      </main>
    </>
  );
}
