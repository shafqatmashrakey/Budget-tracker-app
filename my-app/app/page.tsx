
import { createClient } from '@/utils/supabase/server';
import Layout from "../components/layout"
import Homepage from '../components/models/Modelhomepage';

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <Layout>
      
        <header className="bg-stone-400 text-white py-4">
          <div className="container mx-auto w-full px-6">
            <h1 className="text-center text-2xl font-semibold">WELCOME TO BUDGET TRACKER</h1>
            {/* Add any additional header elements here */}
          </div>
        </header>
        
        <Homepage/>
       
    </Layout>
  );
  
}
