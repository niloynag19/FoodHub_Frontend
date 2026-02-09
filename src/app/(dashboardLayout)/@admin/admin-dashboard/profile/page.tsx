import { getCurrentUserAction } from "@/actions/user.actions";
import ProfileForm from "@/components/shared/ProfileForm";


export default async function CustomerProfile() {
  const result = await getCurrentUserAction();
  const user = result?.data;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-zinc-900 italic">My Account</h1>
        <p className="text-zinc-500">Manage your personal details and delivery address</p>
      </div>
      <ProfileForm user={user} />
    </div>
  );
}