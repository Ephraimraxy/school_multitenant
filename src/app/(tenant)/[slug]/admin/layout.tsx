import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getTenantBySlug } from "@/lib/actions/tenants";
import { TenantAdminSidebar } from "@/components/tenant-admin/TenantAdminSidebar";
import { TenantBrandingProvider } from "@/components/branding/TenantBrandingProvider";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function TenantAdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
  const user = await currentUser();

    // Check if user is authenticated
    if (!user) {
        redirect(`/${slug}?redirect=admin`);
    }

    // Fetch tenant data
    const tenant = await getTenantBySlug(slug);

    if (!tenant) {
        redirect("/");
    }

  // Resolve current app user from Clerk user
  const primaryEmail = user.emailAddresses?.[0]?.emailAddress || "";

  // 1) Try to find by Clerk ID
  let dbUser =
    (await db.query.users.findFirst({
      where: eq(users.clerkId, user.id),
    })) || null;

  // 2) If not found, try to attach existing invited user by email
  if (!dbUser && primaryEmail) {
    const invitedUser = await db.query.users.findFirst({
      where: eq(users.email, primaryEmail),
    });

    if (invitedUser) {
      await db
        .update(users)
        .set({ clerkId: user.id })
        .where(eq(users.id, invitedUser.id));

      dbUser = { ...invitedUser, clerkId: user.id };
    }
  }

  // 3) Still not found → create a basic user row
  if (!dbUser) {
    const [created] = await db
      .insert(users)
      .values({
        clerkId: user.id,
        email: primaryEmail || user.id,
        displayName:
          user.firstName || user.lastName
            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
            : primaryEmail || user.id,
      })
      .returning();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dbUser = created as any;
  }

  // Final authorization: must be tenant_admin for this tenant
  const isTenantAdmin =
    dbUser.role === "tenant_admin" && dbUser.tenantId === tenant.id;

    if (!isTenantAdmin) {
        redirect(`/${slug}`);
    }

    // Get branding
    const branding = tenant.branding as any || {};

    return (
        <TenantBrandingProvider branding={branding}>
            <div className="flex h-screen overflow-hidden bg-gray-50">
                {/* Sidebar */}
                <TenantAdminSidebar
                    tenantSlug={slug}
                    tenantName={tenant.name}
                    tenantLogo={tenant.logoUrl}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {tenant.name} - Admin Dashboard
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Manage your school efficiently
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {orgRole === "org:creator" ? "Owner" : "Admin"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content Area */}
                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </TenantBrandingProvider>
    );
}
