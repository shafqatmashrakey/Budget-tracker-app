import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("THIS IS USER: ",user?.id);
  const uniqueid = user?.id;
  const fetchUserProfile = async () => {
    const { data: profileData, error } = await supabase
      .from('profile')
      .select('first_name')
      .eq('id', uniqueid)
      //.single();

    if (error) {
      console.error("Error fetching user profile:", error.message);
      return null;
    }
    console.log("Profile Data:", profileData);

    return profileData;
  };

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };
  const userProfile = await fetchUserProfile();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {userProfile ? userProfile[0].first_name : 'User'}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
