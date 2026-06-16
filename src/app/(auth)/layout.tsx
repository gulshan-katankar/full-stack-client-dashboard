export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side brand panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gray-50/50 border-r border-gray-100 p-12 text-black relative overflow-hidden">
        {/* Subtle background animation */}
        <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply">
           <video 
              src="/background animation.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover scale-110"
            />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white font-bold">
              T
            </div>
            <span className="text-xl font-bold tracking-tight">Taskbito</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mt-16 text-black">
            Manage your <span className="text-gray-400">client deliverables</span> with ease.
          </h1>
          <p className="mt-4 text-gray-500 text-lg max-w-md">
            The premium workspace for service-based businesses, agencies, and freelancers.
          </p>
        </div>
        <div className="relative z-10 text-sm text-gray-400">
          © {new Date().getFullYear()} Taskbito Inc.
        </div>
      </div>
      
      {/* Right side auth form */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8 bg-white z-10">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
