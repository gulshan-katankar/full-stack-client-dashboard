export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Left side brand panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-[#1A1625] p-12 text-white">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold">
              T
            </div>
            <span className="text-xl font-bold tracking-tight">Taskbito</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mt-16">
            Manage your <span className="text-indigo-400">client deliverables</span> with ease.
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-md">
            The premium workspace for service-based businesses, agencies, and freelancers.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Taskbito Inc.
        </div>
      </div>
      
      {/* Right side auth form */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
