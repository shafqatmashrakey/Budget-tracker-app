import Layout from "../../components/layout"
import Categorypage from '@/components/category/Categorypage'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("THIS iS USER: ",user)
  if (!user) {
    return redirect("/login");
  }
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
  return (
    <Layout>
      <Categorypage />
    </Layout>
  )
}