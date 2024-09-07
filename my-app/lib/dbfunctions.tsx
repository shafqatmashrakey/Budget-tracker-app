

export async function getProfile_id(supabase, user) {
   
    try {
        const { data:profile, error } = await supabase
        
            .from("profile")
            .select("*")
            .eq("id", user);
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
       

        if (profile && profile.length > 0) {
            
            
            
            return profile;
        } else {
            console.log("No profile data found for user ID:", user.id);
            return null;
        }
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}

export async function getProfile_Income(supabase, user) {
   console.log("For Income USER?",user);
    try {
        const { data:profile, error } = await supabase
        
            .from("profile")
            .select("income")
            .eq("id", user);
            
            

        if (error) {
            console.log("ERROR for INCOME")
            throw error;
        }
       

        if (profile && profile.length > 0) {
            
            
            
            return profile;
        } else {
            console.log("No profile data found for user ID:", user.id);
            return null;
        }
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}

export async function getProfile_Balance(supabase, user) {
    console.log("For BALANCE USER?",user);
     try {
         const { data:profile, error } = await supabase
         
             .from("profile")
             .select("balance")
             .eq("id", user);
             
             
 
         if (error) {
             console.log("ERROR for INCOME")
             throw error;
         }
        
 
         if (profile && profile.length > 0) {
             
             
             
             return profile;
         } else {
             console.log("No profile data found for user ID:", user.id);
             return null;
         }
     } catch (error) {
         console.error('Error getting profile:', error.message);
         throw error;
     }
 }


export async function getCustomCategory(supabase, user) {

    console.log("For CustomCategory USER?", user);
     try {
         const { data:Categories, error } = await supabase
         
             .from("Categories")
             .select("*")
             .eq("profileId_Category", user[0].profile_id);
             
             
 
         if (error) {
             console.log("ERROR for INCOME")
             throw error;
         }
        
 
         return Categories

     } catch (error) {
         console.error('Error getting profile:', error.message);
         throw error;
     }
 }



export async function AddIncome(supabase, user, income) {
   
    try {
        const { data:profile, error } = await supabase
        
            .from("profile")
            .update({ income: income })
            .eq("id", user[0].id);
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
       

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}
export async function AddBalance(supabase, user, balance) {
   
    try {
        const { data:profile, error } = await supabase
        
            .from("profile")
            .update({ balance: balance })
            .eq("id", user[0].id);
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
       

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}

export async function AddCustomCategory(supabase, user, category) {
   
    try {
        const { data:categorytable, error } = await supabase
        
            .from('Categories')
            .insert([
            { name: category, profileId_Category: user[0].profile_id},
            ])
            .select()
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
       

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}

export async function AddPayment(supabase, user, category, time, price, start, end) {
    
    
    console.log("USERID",user[0].profile_id);
    try {
        const isoStart = start.toISOString().slice(0, 10);
        const { data:payment, error } = await supabase
            .from('payment')
            .insert([
            { end_at: end, started_at: start, category: category, time: time, price: price, profile_id_user: user[0].profile_id},
            ])
            .select()
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
        
        

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}








export async function getPaymentData(supabase, user) {
    
    
    console.log("USERID",user[0].profile_id);
    try {
        const { data:payment, error } = await supabase
            .from('payment')
            .select('*')
            .eq("profile_id_user", user[0].profile_id) 
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
    
        return payment;

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}



export async function deleteCategory (supabase, categoryId) {
   
    console.log("CATEGORY IDDD", categoryId)
 
    try {
        const { data:payment, error } = await supabase
            .from('payment')
            .delete()
            .eq("id", categoryId) 
            
        
        
        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
        
       

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}


export async function deleteCustomCategory (supabase, customcategoryId) {
   
    console.log("CATEGORY IDDD FOR CUSTOM DELETE: ", customcategoryId);
 
    try {
        const { data:payment, error } = await supabase
            .from('Categories')
            .delete()
            .eq('id', customcategoryId) 
            
        
        
        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
        
       

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}


export async function updateCategory (supabase, categoryId,editcategory,editstart,edittime,editend,editprice) {
   
    console.log("CATEGORY IDDD  UPDATE: ", categoryId);
    console.log("BBBBBBBBBBBBBBBBBBBBBBBB");
    try {
        const { data:payment, error } = await supabase
            .from('payment')
            .update({ category: editcategory, started_at: editstart, time: edittime, end_at:editend, price:editprice   })
            .eq('id', categoryId) 
            
        
        
        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
        
       

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}
export async function UpdateIncomeDate(supabase, customerId,incomestart) {
   
    console.log("CATEGORY IDDD  UPDATE: ", customerId[0].profile_id);
    console.log("BBBBBBBBBBBBBBBBBBBBBBBB");
    try {
        const { data:profile, error } = await supabase
            .from('profile')
            .update({ income_start_date: incomestart })
            .eq('profile_id', customerId[0].profile_id) 
            
        
        
        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
        
       

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}

export async function updateUserBalance (supabase, customerId,balance) {
   
    console.log("CustomerID for UPDATE Balance: ", customerId);

    try {
        const { data:profile, error } = await supabase
            .from('profile')
            .update({ balance: balance})
            .eq('id', customerId) 
            
        
        
        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
        
       

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}


