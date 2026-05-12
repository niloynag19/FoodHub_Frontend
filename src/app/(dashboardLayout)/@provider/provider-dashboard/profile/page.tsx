import { getCurrentUserAction } from "@/actions/user.actions";
import ProfileForm from "@/components/shared/ProfileForm";
 

export default async function ProviderProfile() {
  const result = await getCurrentUserAction();
  const user = result?.data;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ProfileForm user={user} />
    </div>
  );
}