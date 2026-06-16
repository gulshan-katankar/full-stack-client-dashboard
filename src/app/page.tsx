import Link from "next/link";
import { ArrowRight, CheckCircle2, LayoutDashboard, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#09090b] font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white font-bold">
              T
            </div>
            <span className="text-xl font-bold tracking-tight">Taskbito</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#product" className="hover:text-black transition-colors">Product</Link>
            <Link href="#solutions" className="hover:text-black transition-colors">Solutions</Link>
            <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-black transition-colors">FAQ</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Login
            </Link>
            <Link href="/signup" className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-start text-center">
        <div className="z-10 max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-black mb-6">
            Elevate Your <br /> Client Experience
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Unlock your agency's potential in a fully managed, premium portal environment powered by Taskbito.
          </p>
        </div>

        {/* Video Animation Container */}
        <div className="relative w-full max-w-5xl mx-auto h-[500px] sm:h-[600px] flex justify-center items-center">
          {/* We use mix-blend-multiply to blend the video cleanly into the white background if it has a light/colored background, or opacity tricks if it's dark */}
          <div className="absolute inset-0 rounded-[4rem] overflow-hidden bg-white mask-image-radial-gradient">
             <video 
              src="/background animation.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover mix-blend-multiply opacity-90 scale-110"
            />
            {/* Fade out edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Center Call to Action Button */}
          <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/signup" className="bg-white/90 backdrop-blur-md border border-gray-200 text-black px-8 py-4 rounded-full font-semibold shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Sign Up & Manage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Floating Glass Card Left */}
          <div className="absolute left-0 md:-left-12 top-1/4 bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl p-6 rounded-3xl w-64 text-left hidden sm:block animate-float">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Access</span>
              <div className="bg-white p-1.5 rounded-full shadow-sm"><Zap className="w-4 h-4 text-black" /></div>
            </div>
            <h3 className="font-bold text-lg text-black leading-tight">Unparalleled <br/> Portal Access</h3>
            <p className="text-sm text-gray-500 mt-2">24/7 client sync</p>
          </div>

          {/* Floating Glass Card Right */}
          <div className="absolute right-0 md:-right-12 bottom-1/4 bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl p-6 rounded-3xl w-64 text-left hidden sm:block animate-float-delayed">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Retention</span>
              <div className="bg-white p-1.5 rounded-full shadow-sm"><Shield className="w-4 h-4 text-black" /></div>
            </div>
            <h3 className="text-4xl font-bold text-black mb-1">96%</h3>
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-black w-[96%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Logos */}
      <section className="py-16 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by industry leaders worldwide</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center grayscale opacity-60">
            <span className="text-2xl font-black tracking-tighter">ACME CORP</span>
            <span className="text-2xl font-serif font-bold italic">Globex</span>
            <span className="text-2xl font-mono font-bold tracking-widest">SOYLENT</span>
            <span className="text-2xl font-bold tracking-tight">Initech.</span>
            <span className="text-2xl font-extrabold uppercase tracking-wide">Umbrella</span>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Everything you need to deliver excellence.</h2>
            <p className="text-xl text-gray-500">Stop juggling spreadsheets and email threads. Bring your entire client operations into one premium dashboard.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                <LayoutDashboard className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Custom Kanban Boards</h3>
              <p className="text-gray-500">Track deliverables seamlessly with drag-and-drop boards customized for your unique workflow and services.</p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Real-time Sync</h3>
              <p className="text-gray-500">Powered by Supabase, your clients see updates to their orders the instant you move a card.</p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Enterprise Security</h3>
              <p className="text-gray-500">Bank-grade security and authentication out of the box. Keep your clients' data completely safe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-black text-white rounded-t-[3rem] md:rounded-t-[6rem]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, transparent pricing.</h2>
            <p className="text-xl text-gray-400">Start for free, upgrade when you need to scale your agency.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tier 1 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-400" /> <span>Up to 3 active clients</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-400" /> <span>Basic Kanban board</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-400" /> <span>Community support</span></li>
              </ul>
              <Link href="/signup" className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-center rounded-xl font-medium transition-colors">Get Started</Link>
            </div>

            {/* Tier 2 */}
            <div className="bg-white rounded-3xl p-8 text-black relative scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Agency</h3>
              <div className="text-4xl font-bold mb-6">$49<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> <span>Unlimited clients</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> <span>Advanced analytics</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> <span>Custom branding</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> <span>Priority support</span></li>
              </ul>
              <Link href="/signup" className="block w-full py-3 px-4 bg-black text-white hover:bg-gray-800 text-center rounded-xl font-medium transition-colors shadow-lg">Start Free Trial</Link>
            </div>

            {/* Tier 3 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-6">Custom</div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-400" /> <span>Dedicated account manager</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-400" /> <span>SLA guarantee</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-400" /> <span>API access</span></li>
              </ul>
              <Link href="/contact" className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-center rounded-xl font-medium transition-colors">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-500 py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-white text-black font-bold text-xs">T</div>
            <span className="font-bold text-white">Taskbito</span>
          </div>
          <p>© {new Date().getFullYear()} Taskbito Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
