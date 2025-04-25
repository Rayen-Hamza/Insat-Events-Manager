// app/dashboard/page.tsx
import { requireAuth } from '@/lib/guards';
import { SignOutButton } from '@/components/SignOutButton';

export default async function DashboardPage() {
  await requireAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      {/* Other dashboard content… */}
      <SignOutButton />
    </div>
  );
}
