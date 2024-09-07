'use client'
import { useState,useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import {Model} from "../modeldata.js"
import { Canvas,useLoader } from "@react-three/fiber";
import {Suspense} from 'react'
import THREE from "three";
import {OrbitControls, Text} from '@react-three/drei'
import { getProfile_id } from '../../lib/dbfunctions.js'
import { createClient } from "@/utils/supabase/client";




  




export default function Modelpage() {

  const [user, setUser] = useState(null);
  const [customer_id, setCustomer_id] = useState(null);
  const supabase = createClient();
  const [clickCount, setClickCount] = useState(0); // State to track the number of clicks
  const [modelClicked, setModelClicked] = useState(false);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user.id); // Update user state with fetched user data
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  console.log("USER MODELPAGE:", user)

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        
        const profileId = await getProfile_id(supabase, user);
        console.log("Profile:", profileId);
        setCustomer_id(profileId);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCustomerData();
  }, [user]);


  
  console.log(user)
  const handleModelClick = () => {
    setClickCount(prevCount => prevCount + 1); // Increment click count on each click
    if (clickCount === 1) {
      setModelClicked(true); // Set modelClicked to true on second click
    }
  };
  

  return (
    
    
    <div className="py-20 lg:col-span-32 lg:col-start-1 lg:border-r lg:border-gray-800 lg:pt-6 lg:pb-16 lg:pr-8">
    
      
        {modelClicked ? (
          <div className="h-screen bg-gray-900">
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
            <li><a href="/addpayment4"> ADD PAYMENT BUTTON</a></li>
        
            </div>
          </div> // Render a blank screen when modelClicked is true
        ) : (
          <div className="h-screen bg-gray-900">
          <Canvas>
            <Suspense fallback={null}>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} />
              <directionalLight position={[0, 2, 0]} />
              <directionalLight position={[0, -2, 0]} />
              <Model
                position={[-0.5, 0, 0]}
                rotation={[1.57, -1.57, 0]}
                onClick={handleModelClick} // Call handleModelClick function when the model is clicked
              />
              {customer_id && (
                <Text
                  color="black"
                  fontSize={0.1}
                  position={[-0.5, -0.4, 0.03]}
                  rotation={[0, 0, 0]}
                  textAlign="center"
                >
                  {customer_id[0].first_name} {customer_id[0].last_name}
                </Text>
              )}
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Suspense>
          </Canvas>
          </div>
        )}
      
    
  </div>
);
}