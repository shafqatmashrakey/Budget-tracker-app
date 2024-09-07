import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Admin() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("THIS IS USER: ", user?.id);
  const uniqueid = user?.id;
  const fetchUserProfile = async () => {
    const { data: profileData, error } = await supabase
      .from('profile')
      .select('IsAdmin')
      .eq('id', uniqueid)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error.message);
      return null;
    }
    console.log("Profile Data:", profileData);

    return profileData;
  };

  const userProfile = await fetchUserProfile();
  const isAdmin = userProfile?.IsAdmin;

  return user && isAdmin ? (
    <div className="flex items-center gap-4">
      <Link
        href="/Admin"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Admin
      </Link>
    </div>
  ) : (
    <div></div>
  );
}