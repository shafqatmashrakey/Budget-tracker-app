

import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";

import { redirect } from "next/navigation";
import SignUpButton from "@/components/SignUpButton";
import Layout from "../../components/layout"
import { Canvas } from "@react-three/fiber";
import {Suspense} from 'react'
import { Menu, Transition } from '@headlessui/react'
import {OrbitControls} from '@react-three/drei'
import Homepage from '../../components/homepage/homepage'
import Dashboard from '@/components/dashboard/dashboard'

export default async function ProtectedPage() {
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
  const userProfile = await fetchUserProfile();
  return user?(
    <Layout>
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-stone-400 text-center">
          
     
        </div>
        
      </div>
    </div>
    <Homepage/>
    
    </Layout>
  ):(
    <div>
      hiiiiiiii
    </div>

  );
}

