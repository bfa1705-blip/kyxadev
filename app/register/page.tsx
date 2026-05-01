import Header from "@/components/Header";
import RegisterForm from "@/components/RegisterForm";
import HalftoneBackground from "@/components/HalftoneBackground";

export default function RegisterPage() {
  return (
    <>
      <HalftoneBackground />
      <main className="min-h-screen bg-transparent flex flex-col relative z-10">
        <Header />
        <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-20 py-8 pt-32">
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
