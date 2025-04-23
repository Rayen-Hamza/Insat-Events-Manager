import { requireAdmin } from "@/lib/guards";

export default async function AdminPage() {
    await requireAdmin();

    return <div>Admin Dashboard</div>;
}