
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, GraduationCap, Users, BookOpen, ArrowRight, Sparkles, 
  BarChart3, Shield, Clock, Globe, Zap, Award, TrendingUp, CheckCircle2,
  Smartphone, Cloud, Lock, MessageSquare, Calendar, FileText, Bell
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { getPlatformSeo, getPlatformBranding } from "@/lib/actions/branding";
import { getAllTenants, TenantData } from "@/lib/actions/tenants";
import { redirect } from "next/navigation";
import { TenantBrandingProvider } from "@/components/branding/TenantBrandingProvider";


interface TenantCardProps {
  tenant: TenantData;
}

function TenantCard({ tenant }: TenantCardProps) {
  const initials = tenant.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Extract branding colors
  const primaryColor = tenant.branding?.primary || '#2563eb';
  const secondaryColor = tenant.branding?.secondary || '#4f46e5';
  const features = tenant.branding?.features || [];

  return (
    <Link href={`/${tenant.slug}`}>
      <Card
        className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary relative overflow-hidden"
        style={{
          borderColor: `${primaryColor}20`,
        }}
      >
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
          }}
        />

        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-start justify-between">
            <Avatar className="h-16 w-16 border-2" style={{ borderColor: `${primaryColor}40` }}>
              {tenant.logoUrl ? (
                <AvatarImage src={tenant.logoUrl} alt={tenant.name} />
              ) : null}
              <AvatarFallback
                className="text-white text-xl font-bold"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <Badge
              className="text-white border-0"
              style={{ backgroundColor: primaryColor }}
            >
              active
            </Badge>
          </div>
          <CardTitle
            className="text-xl mt-4 transition-colors"
            style={{
              color: 'inherit'
            }}
          >
            {tenant.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {tenant.slogan || tenant.seo?.description || "Welcome to our school portal"}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          {/* Features badges */}
          {features.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {features.slice(0, 3).map((feature, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor: `${primaryColor}40`,
                    color: primaryColor
                  }}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {feature}
                </Badge>
              ))}
            </div>
          )}

          <div
            className="mt-4 flex items-center font-medium group-hover:gap-2 transition-all"
            style={{ color: primaryColor }}
          >
            <span>Visit School</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

const features = [
  {
    icon: Users,
    title: "Student Management",
    description: "Comprehensive student records, attendance tracking, and academic performance monitoring.",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: GraduationCap,
    title: "Teacher Portal",
    description: "Powerful tools for lesson planning, grading, and seamless student communication.",
    color: "indigo",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: BookOpen,
    title: "Course Management",
    description: "Create, manage, and organize courses, assignments, and educational resources.",
    color: "purple",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Real-time insights and comprehensive reports to track performance and progress.",
    color: "green",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security with data encryption and privacy protection.",
    color: "red",
    gradient: "from-red-500 to-rose-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Fully responsive design that works seamlessly on all devices and screen sizes.",
    color: "orange",
    gradient: "from-orange-500 to-amber-500"
  },
];

const benefits = [
  { icon: Zap, text: "Lightning Fast Performance" },
  { icon: Cloud, text: "Cloud-Based Infrastructure" },
  { icon: Lock, text: "Bank-Level Security" },
  { icon: MessageSquare, text: "Real-Time Communication" },
  { icon: Calendar, text: "Smart Scheduling" },
  { icon: FileText, text: "Digital Documentation" },
  { icon: Bell, text: "Automated Notifications" },
  { icon: Globe, text: "Multi-Language Support" },
];

export default async function Home() {
  const user = await currentUser();
  const platformSeo = await getPlatformSeo() as any;
  const platformBranding = await getPlatformBranding() as any;
  const superAdminEmail = process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL;

  // Fetch real tenant data from database
  const tenants = await getAllTenants();

  // Strict Debugging
  console.log("Check SuperAdmin:", {
    hasUser: !!user,
    emailObj: user?.emailAddresses?.[0],
    envEmail: superAdminEmail
  });

  const isSuperAdmin =
    !!user &&
    !!superAdminEmail &&
    user.emailAddresses?.length > 0 &&
    user.emailAddresses[0].emailAddress === superAdminEmail;

  // Branding variables
  const branding = {
    primary: platformBranding?.branding?.primary || '#2563eb',
    secondary: platformBranding?.branding?.secondary || '#4f46e5',
  };

  if (isSuperAdmin) {
    redirect("/super-admin");
  }

  return (
    <TenantBrandingProvider branding={branding}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {isSuperAdmin && (
          <div className="fixed bottom-4 right-4 z-50">
            <Button asChild className="shadow-lg gap-2 bg-slate-900 text-white hover:bg-slate-800">
              <Link href="/super-admin">
                <ArrowRight className="h-4 w-4" />
                Go to Admin Dashboard
              </Link>
            </Button>
          </div>
        )}

        {/* Header */}
        <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {platformBranding?.logoUrl ? (
                  <div className="h-12 w-12 flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={platformBranding.logoUrl}
                      alt="Logo"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                )}
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {platformBranding?.slogan || "BurstBrain School"}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Multi-Tenant School Portal</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <Button asChild variant="outline" className="hidden sm:flex">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </SignedOut>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-6 px-4 py-1.5 text-sm bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 hover:scale-105 transition-transform">
              <Sparkles className="h-3 w-3 mr-2 inline" />
              Modern School Management Platform
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Transform Your School
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Management Experience
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Streamline operations, enhance collaboration, and empower your educational community with our comprehensive, cloud-based school management solution.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-10">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                <span className="text-sm sm:text-base font-semibold text-gray-700">{tenants.length} Schools Online</span>
              </div>
              <Separator orientation="vertical" className="h-6 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm sm:text-base font-semibold text-gray-700">{tenants.length * 100}+ Students</span>
              </div>
              <Separator orientation="vertical" className="h-6 hidden sm:block" />
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <span className="text-sm sm:text-base font-semibold text-gray-700">99.9% Uptime</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                <Link href="/sign-up" className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2">
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
          </div>

          {/* Tenants Grid */}
          {tenants.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Select Your School</h3>
                <Badge variant="secondary" className="hidden sm:flex">
                  {tenants.length} Active Schools
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tenants.map((tenant) => (
                  <TenantCard key={tenant.id} tenant={tenant} />
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          <div id="features" className="mb-20 scroll-mt-20">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">
                <Award className="h-3 w-3 mr-1" />
                Powerful Features
              </Badge>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive tools designed to streamline your school operations and enhance the learning experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <Card key={idx} className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-transparent overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    <CardHeader className="relative z-10">
                      <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                    Why Choose BurstBrain School?
                  </h3>
                  <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
                    Join thousands of schools already transforming their management with our platform.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {benefits.map((benefit, idx) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                        <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm sm:text-base font-medium">{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50">
              <CardContent className="p-8 sm:p-12">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                  Join the future of school management. Start your free trial today and experience the difference.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6">
                    <Link href="/sign-up" className="flex items-center gap-2">
                      Create Free Account
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-2">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">BurstBrain School</p>
                  <p className="text-xs text-gray-600">© 2024 All rights reserved.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600">
                <Link href="/about" className="hover:text-gray-900 transition-colors font-medium">
                  About
                </Link>
                <Link href="/contact" className="hover:text-gray-900 transition-colors font-medium">
                  Contact
                </Link>
                <Link href="/privacy" className="hover:text-gray-900 transition-colors font-medium">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-gray-900 transition-colors font-medium">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TenantBrandingProvider>
  );
}

// Generate Metadata for the page
export async function generateMetadata() {
  const seo = await getPlatformSeo() as any;
  return {
    title: seo?.title || "BurstBrain School - Multi-Tenant School Management",
    description: seo?.description || "A powerful school management portal for students, teachers, and administrators.",
    keywords: seo?.keywords || "school, management, portal, education",
  };
}
