'use client'
import { useState, useEffect } from 'react'
import { Model } from "../modeldata.js"
import { Canvas } from "@react-three/fiber";
import { Suspense } from 'react'
import { OrbitControls, Text } from '@react-three/drei'
import { updateUserBalance,getProfile_id} from '../../lib/dbfunctions'
import { createClient } from "@/utils/supabase/client";

import Dashboard from '@/components/dashboard/dashboard'

export default function Homepage() {
  const [user, setUser] = useState(null);
  const [customer_id, setCustomer_id] = useState(null);
  const supabase = createClient();
  const [modelClicked, setModelClicked] = useState(false);
  const [showBalancePopup, setShowBalancePopup] = useState(false);
  const [balanceInput, setBalanceInput] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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

  const handleModelClick = () => {
    if (customer_id[0]?.balance === null) {
      setShowBalancePopup(true);
    }
    else {
      setModelClicked(true);
    }
  };

  const handleSaveBalance = async() => {
    
    try {
     
    console.log('Saving balance:', balanceInput);
     console.log('customer ID: ', customer_id[0].id)
      // Call the function to delete the category from the database
      await updateUserBalance(supabase,customer_id[0].id, balanceInput);
      
      // Close the edit dialog after successful update
      setShowBalancePopup(false);
      setModelClicked(true);
      // Optionally, update the state to reflect the changes immediately
      // Example: setItems(updatedItems);
    } catch (error) {
      console.error('Error updating Balance:', error);
    }
  };

  

  return (
    <div className=" lg:col-span-32 lg:col-start-1 lg:border-r lg:border-gray-800   ">
      {modelClicked ? (
        <Dashboard />
      ) : (
        <div className="h-screen bg-gray-900">
          <Canvas camera={{ position: [0, 0, 2] }}>
            <Suspense fallback={null}>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} />
              <directionalLight position={[0, 2, 0]} />
              <directionalLight position={[0, -2, 0]} />
              <Model
                position={[-0.5, 0, 0]}
                rotation={[1.57, -1.57, 0]}
                onDoubleClick={handleModelClick} // Use onDoubleClick event
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
              <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
            </Suspense>
          </Canvas>
        </div>
      )}
      {showBalancePopup && <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="relative bg-white p-4 rounded-lg">
        <h3 className="text-lg text-black font-semibold mb-4">BALANCE</h3>
        <input
          type="text" // Set input type to number
          step="0.01" // Allow decimal numbers with two decimal places
          
          value={balanceInput}
          onChange={(e) => {const input = e.target.value;
            // Check if the input is a valid float number
            if (/^\d*\.?\d*$/.test(input)) {
              setBalanceInput(input);
            }
          
          }}
          placeholder="Enter your balance"
          
          className="text-black border rounded-md p-2 w-full mb-4"
        />
        
        <div className="flex justify-end">
          <button
            onClick={handleSaveBalance}
            className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>}
    </div>
  );
}
