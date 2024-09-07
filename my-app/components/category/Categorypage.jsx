'use client';
import { useState,useEffect } from 'react'
import {UpdateIncomeDate,AddBalance,getProfile_Balance, updateCategory,deleteCustomCategory,getCustomCategory,AddCustomCategory,getProfile_Income, deleteCategory, getProfile_id, AddIncome, AddPayment, getPaymentData} from '../../lib/dbfunctions'
import { createClient } from "@/utils/supabase/client";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles

const categories = [
  { id: 1, name: 'Food', unavailable: false },
  { id: 2, name: 'Housing', unavailable: false },
  { id: 3, name: 'Entertainment', unavailable: false },
  { id: 4, name: 'Clothing/Accessories', unavailable: false },
  { id: 5, name: 'Education', unavailable: false },
]

const times = [
  { id: 1, name: 'Does Not Repeat', unavailable: false },
  { id: 2, name: 'Daily', unavailable: false },
  { id: 3, name: 'Weekly on ', unavailable: false },
  { id: 4, name: 'Monthly on the fourth ', unavailable: false },
  { id: 5, name: 'Annually on ', unavailable: false },
  { id: 6, name: 'Every weekday (Monday to Friday)', unavailable: false },
  
]

export default function Categorypage() {
  
  const [customer_id, setCustomer_id] = useState(null);
  const [user, setUser] = useState(null); 
  const [inputincome, setinputIncome] = useState();
  const [inputbalance, setinputBalance] = useState();
  const [income, setIncome] = useState(" ");
  const [balance, setBalance] = useState(" ");
  const supabase = createClient();
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [customCategory, setcustomCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false); // State to manage the visibility of the category input field
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store the selected category
  const [price, setnewprice] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [addedCategories, setAddedCategories] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  const [customCategories, setCustomCategories] = useState([]);
  const [inputincomestartdate, setInputIncomeStartDate] = useState();
  const [incomestart, setIncomeStart] = useState();

  //FOR CALENDER 
 
  const [startDate, setStartDate] = useState(null); // Define startDate state
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  
 

  //FOR CUSTOM... 
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customRecurrence, setCustomRecurrence] = useState('');
  const [repeatInterval, setRepeatInterval] = useState(1); // Define repeatInterval state
  const [repeatUnit, setRepeatUnit] = useState('days');
  const [endOption, setEndOption] = useState('Never'); // Define endOption state
  const [endDate, setEndDate] = useState(''); // Define endDate state
  const [occurrences, setOccurrences] = useState(0); // Define occurrences state

  //FOR EDIT OPTION
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editItemData, setEditItemData] = useState(null);
  const [editprice, setEditPrice]=useState(null);
  const [editcategory, setEditCategory]=useState(null);
  const [edittime, setEditTime]=useState(null);
  const [editstart, setEditStart]=useState(null);
 
  const [editend, setEditEnd]=useState(null);

  const [estartDate, seteStartDate] = useState(null); // Define startDate state
  const emonthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const edaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [eselectedDay, seteSelectedDay] = useState(null);
  const [eselectedMonth, seteSelectedMonth] = useState(null);
  const [eselectedDate, seteSelectedDate] = useState(null);

  const [editend2, setEditEnd2]=useState('');
  const [formattededitend2, setFormattedEditEnd2]=useState('');
  const [editoccurrences, setEditOccurrences] = useState(0); // Define occurrences state('');


  

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

  console.log("USER:", user)

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




  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        
        const profileIncome = await getProfile_Income(supabase, user);
        const profileBalance = await getProfile_Balance(supabase, user);
        const profileIncomeDate = await getProfile_id(supabase, user);
        console.log("Profile Income:",profileIncome[0].income);
        setIncome(profileIncome[0].income);
        setBalance(profileBalance[0].balance);
        setIncomeStart(profileIncomeDate[0].income_start_date)
       
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchIncomeData();
  }, [user]);

  console.log("INCOME",income)
  console.log("CUSTOMER ID: ", customer_id);

  
  useEffect(() => {
    const fetchCustomCategories = async () => {
      try {
        // Fetch custom categories from the database
        const x = await getCustomCategory(supabase, customer_id);
        console.log("PEEK");
        console.log("DB-FUNCTION CUSTOMCATEGORY: ", x);
        setCustomCategories(x);
      } catch (error) {
        console.error('Error fetching custom categories:', error);
      }
    };

    fetchCustomCategories();
  }, [customer_id]);

  console.log("Custom Categories: ", customCategories )
  const combinedCategories = [...categories, ...customCategories];
  console.log("Combined Categories: ", combinedCategories )
  const handleIncomeChange = (e) => {
    setinputIncome(e.target.value);
  };
  const handleSubmitIncome = async (e) => {
    e.preventDefault();
    try {
        // Call the AddIncome function to update the income value in the user's profile
        const updatedProfile = await AddIncome(supabase, customer_id, inputincome);
        console.log('Profile updated with income:', updatedProfile);
        console.log("INCOME START DATE: ",inputincomestartdate);
        await UpdateIncomeDate(supabase,customer_id, inputincomestartdate);


        const profileIncome = await getProfile_Income(supabase, user);
        const profileIncomedate = await getProfile_id(supabase, user);
    console.log("Profile Income:",profileIncome[0].income);
    setIncome(profileIncome[0].income);
    setIncomeStart(profileIncomedate[0].income_start_date);

    // Reset the input field
    setinputIncome('');
    } catch (error) {
        console.error('Error updating income:', error);
    }
};

const handleBalanceChange = (e) => {
  setinputBalance(e.target.value);
};
const handleSubmitBalance = async (e) => {
  e.preventDefault();
  try {
      // Call the AddIncome function to update the income value in the user's profile
      const updatedProfile = await AddBalance(supabase, customer_id, inputbalance);
      console.log('Profile updated with Balance:', updatedProfile);




      const profileBalance = await getProfile_Balance(supabase, user);
  console.log("Profile Balance:",profileBalance[0].balance);
  setBalance(profileBalance[0].balance);

  // Reset the input field
  setinputIncome('');
  } catch (error) {
      console.error('Error updating income:', error);
  }
};

const handleIncomeDate = (e) => {
  
    setInputIncomeStartDate(e.target.value);

};
const handleAddCategory = async () => {
  try {
  // Add your logic to handle adding the new category here
  console.log('Adding new category...');
  console.log('Selected category:', selectedCategory);
  console.log('Selected Date', selectedDate);
  console.log('Selected Time:', selectedTime);
  console.log('Price:', price);
  console.log("END: ", endOption);
  await AddPayment(supabase, customer_id, selectedCategory, selectedTime, price, startDate, endOption);
  // Debug: Log the newCategory object
  //console.log('New category:', newCategory);


    
  // Refetch payment categories after adding a new one
  const updatedPaymentData = await getPaymentData(supabase, customer_id);
  setPaymentData(updatedPaymentData);
  console.log('New category added successfully.');

  // Reset the input fields and hide the category input section
    setSelectedCategory('');
    setSelectedTime('');
    setPrice('');
    setStartDate('');
    setEndOption('Never')

    setShowCategoryInput(false);
  } catch (error) {
    console.error('Error adding new category:', error.message);
  }
};

useEffect(() => {
  const fetchpaymentCategories = async () => {
    try {
      // Fetch custom categories from the database
      const y = await getPaymentData(supabase, customer_id);
      console.log("PEEK");
      console.log("DB-FUNCTION PAYMENT DATA: ", y);
      setPaymentData(y);
    } catch (error) {
      console.error('Error fetching custom categories:', error);
    }
  };

  fetchpaymentCategories();
}, [customer_id]);
console.log("PAYEMENT DATAAAAAAAAAAAAAA")
console.log(paymentData);



const handleAddCustomCategory = async () => {
  try {
    console.log(customCategories.length);
    if (customCategories.length >= 40) {
      alert('Error: There cannot be more than 40 custom categories.');
      return; // Exit the function if the maximum limit is reached
    }
  
  console.log('Custom Category:', customCategory);
  
  
  await AddCustomCategory(supabase, customer_id, customCategory);
    console.log('New Custom category added successfully!');
  
    setCustomCategories([...customCategories, { id: customCategories.length + 1, name: customCategory }]);


  // Reset the input fields and hide the category input section
    setcustomCategory('');
    setSelectedTime('');
    setPrice('');
    setShowCategoryInput(false);
  } catch (error) {
    console.error('Error adding new custom category:', error.message);
  }
};


useEffect(() => {
  const fetchPaymentData = async () => {
    try {
      // Fetch payment data from the database
      const data = await getPaymentData(supabase, customer_id);
      setPaymentData(data); // Update state with the fetched data
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  fetchPaymentData();
}, [customer_id]);

console.log("USER PAYEMENT DATA",paymentData)
  
const handleDeleteCategory = async (categoryId) => {
  try {
    console.log("categoryIdEEEEEEEEE", categoryId);
    // Call the function to delete the category from the database
    await deleteCategory(supabase,categoryId);
    
    // If deletion is successful, update the UI by removing the deleted category from the state
    setPaymentData((prevData) => prevData.filter((item) => item.id !== categoryId));
    
    console.log('Category deleted successfully!');
  } catch (error) {
    console.error('Error deleting category:', error.message);
  }
};


const handleDeleteCustomCategory = async (customcategoryId) => {
  try {
    console.log("categoryId FOR HANDLE DELTE CUSTOM CATEGORY: ", customcategoryId);
    // Call the function to delete the category from the database
    await deleteCustomCategory(supabase,customcategoryId);
    
    // If deletion is successful, update the UI by removing the deleted category from the state
    setCustomCategories((prevData) => prevData.filter((item) => item.id !== customcategoryId));
    
    console.log('Category deleted successfully!');
  } catch (error) {
    console.error('Error deleting category:', error.message);
  }
};
const handleDateChangeForEdit = (date) => {
  console.log("DATE: ",date);
  const correctformattedDate = date.toLocaleDateString('en-US', {
    month: '2-digit', // 2-digit numeric representation of the month
    day: '2-digit', // 2-digit numeric representation of the day
    year: 'numeric', // Full numeric representation of the year (e.g., 2024)
  });
  console.log("PEDKOKDOR: ",correctformattedDate);
  setEditStart(correctformattedDate);
  console.log("EDIT START: ",estartDate);
  if (date) {
   
    const eselectedDayOfWeek = edaysOfWeek[date.getDay()]; // Get the day name using the index
    console.log("EDIT SELECTDAY OF WEEK :",eselectedDayOfWeek);
    seteSelectedDay(eselectedDayOfWeek);
    const emonthnum = date.getMonth();
    const eday = date.getDate();
    const eselectedMonthName = emonthNames[emonthnum];
    seteSelectedMonth(eselectedMonthName)

   
    const eformattedDate = `${eselectedMonthName} ${eday}`;
    console.log("EDIT FORMATTED DATE: ", eformattedDate);
    seteSelectedDate(eformattedDate, () => {
      // This callback function will be executed after setSelectedDate updates the state
      console.log('Selected date:', eselectedDate);
    });
    console.log('Selected day of the week:', eselectedDayOfWeek);
    const eupdatedTimes = times.map((time) => {
      if (time.id === 3) {
        return { ...time, name: `Weekly on ${eselectedDayOfWeek}` };
      }
      if (time.id === 4) {
        return { ...time, name: `Monthly on the fourth ${eselectedDayOfWeek}` };
      }
      if (time.id === 5) {
        return { ...time, name: `Annually on ${eformattedDate}` };
      }
      return time;
    });
    console.log('Updated times:', eupdatedTimes);
  }
};

const handleDateChange = (date) => {
  setStartDate(date);
  if (date) {
   
    const selectedDayOfWeek = daysOfWeek[date.getDay()]; // Get the day name using the index
    setSelectedDay(selectedDayOfWeek);
    const monthnum = date.getMonth();
    const day = date.getDate();
    const selectedMonthName = monthNames[monthnum];
    setSelectedMonth(selectedMonthName)

   
    const formattedDate = `${selectedMonthName} ${day}`;
    setSelectedDate(formattedDate, () => {
      // This callback function will be executed after setSelectedDate updates the state
      console.log('Selected date:', selectedDate);
    });

    



    console.log('Selected day of the week:', selectedDayOfWeek);
    const updatedTimes = times.map((time) => {
      if (time.id === 3) {
        return { ...time, name: `Weekly on ${selectedDayOfWeek}` };
      }
      if (time.id === 4) {
        return { ...time, name: `Monthly on the fourth ${selectedDayOfWeek}` };
      }
      if (time.id === 5) {
        return { ...time, name: `Annually on ${formattedDate}` };
      }
      return time;
    });
    console.log('Updated times:', updatedTimes);
  }
};

const handleCustomDialog = () => {
  setShowCustomDialog(!showCustomDialog);
  console.log("AAAAAAAAAAAAAAA");
  console.log('showCustomDialog:', showCustomDialog);
};

const handleCustomRecurrenceSubmit = () => {
  // You can perform validation or additional logic here before submitting the custom recurrence
  console.log('Custom Recurrence:', customRecurrence);
  console.log("Every "+repeatInterval+" "+ repeatUnit);
  console.log(endOption);
  console.log("ENNNNNNDDDDDDDD: ",editend2)
  
  

  


  let formattedEndOption = "";
  if (editend||endOption === "Never"){
    formattedEndOption = "Never";
  }

  if (editend === "OnDate") {
    let formattedEndDate = editend2.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    formattedEndOption = formattedEndDate;
  } else if (endOption === "OnDate") {
    let formattedEndDate = endDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    formattedEndOption = formattedEndDate;
  }
  if (editend === "AfterOccurrences") {
    
    formattedEndOption = "After "+ editoccurrences + " Occurrences";
  }

  else if (endOption === "AfterOccurrences") {
    formattedEndOption = "After "+ occurrences + " Occurrences";
  }

  if (editend !== null) {
    setEditEnd(formattedEndOption);
  } else {
    setEndOption(formattedEndOption);
  }
  if (edittime !== null) {
    setEditTime("Every "+repeatInterval+" "+ repeatUnit);
  } else {
    setSelectedTime("Every "+repeatInterval+" "+ repeatUnit);
  }

  
  // Close the pop-up after submission
  setShowCustomDialog(false);
};

useEffect(() => {
  console.log("STOP :", editend);

}, [editend]);


console.log("FINAL: ", editend);
//HANDLES FOR EDIT 


const handleEdit = (item) => {
  setShowEditDialog(true);
  setEditItemData(item);
  
  console.log("THIS IS CATEGORY FOR ITEM: ",item.category);
  console.log("THIS IS OUR ITEM: ",item);
  setEditCategory(item.category);
  console.log(editcategory);
  setEditPrice(item.price);
  setEditStart(item.started_at);
  setEditTime(item.time);
  setEditEnd(item.end_at);
  
};

const handleSaveEdit = async (categoryId) => {
  try {
    // Call your update function here passing the edited data
    // Example: await updateItem(editItemData);
    console.log("THIS IS ID OF EDIT ITEM: ",categoryId.id);
    console.log(editcategory);
    console.log(editstart);
    console.log(edittime);
    console.log(editend);
    console.log(editprice);
   
    // Call the function to delete the category from the database
    await updateCategory(supabase,categoryId.id,editcategory,editstart,edittime,editend,editprice);
    
    // Close the edit dialog after successful update
    setShowEditDialog(false);

    // Optionally, update the state to reflect the changes immediately
    // Example: setItems(updatedItems);
  } catch (error) {
    console.error('Error updating Edited item:', error);
  }
};
  

  return (    
    <div className="bg-white">
      <div className="py-6 font-bold bg-stone-400 text-center">
          
     
      </div>
    <div className="pt-6">
      

    
    <div className="flex justify-center mb-8">
  {/* Income Section */}
  <div className="flex flex-col items-center mr-8"> {/* Added margin-right for spacing */}
  <div className="bg-gray-200 p-20 rounded-md">
    <p className="text-lg text-center font-semibold text-black">Start Date: {incomestart ? `${incomestart}` : 'Not available'}</p>
    <p className="text-lg text-center font-semibold text-black">Current Income:</p>
    <p className="text-xl text-center text-indigo-600">{income ? `$${income}` : 'Not available'}</p>
  </div>
  <form onSubmit={handleSubmitIncome} className="max-w-md w-full mt-4">
    {/* Income Input Section */}
    <div className="flex flex-col sm:flex-row mb-4">
      <div className="mb-4 sm:mr-2 flex-1">
        <label htmlFor="income" className="block text-sm font-medium text-gray-900">Income</label>
        <input
          type="text"
          id="income"
          name="income"
          value={inputincome}
          onChange={handleIncomeChange}
          className="mt-1 px-4 py-2 w-full rounded-md border border-gray-800 focus:border-indigo-500 focus:ring-indigo-500 text-black"
          placeholder="Enter your income"
        />
      </div>

      {/* Start Date Input Section */}
      <div className="mb-4 sm:ml-1 flex-1 w-1">
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-900">Start Date</label>
        <input
          type="date" 
          id="start-date"
          name="start-date"
          value={inputincomestartdate} 
          onChange={handleIncomeDate} 
          className="mt-1 px-4 py-2 w-full rounded-md border border-gray-800 focus:border-indigo-500 focus:ring-indigo-500 text-black"
        />
      </div>
    </div>

    {/* Submit Button */}
    <div className="flex items-center justify-center">
      <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Submit</button>
    </div>
  </form>
</div>




  {/* Balance Section */}
  <div className="flex flex-col items-center"> {/* Added flex-column styling */}
    <div className="bg-gray-200 p-24 rounded-md">
      <p className="text-lg text-center font-semibold text-black">Current Balance:</p>
      <p className="text-xl text-center text-indigo-600">{balance ? `$${balance}` : 'Not available'}</p>
    </div>
    <form onSubmit={handleSubmitBalance} className="max-w-md w-full mt-4"> {/* Added margin-top for spacing */}
      <div className="mb-4">
        <label htmlFor="balance" className="block text-sm font-medium text-gray-900">Balance</label>
        <input
          type="text"
          id="balance"
          name="balance"
          value={inputbalance}
          onChange={handleBalanceChange}
          className="mt-1 px-4 py-2 w-full rounded-md border border-gray-800 focus:border-indigo-500 focus:ring-indigo-500 text-black"
          placeholder="Enter to change your Balance"
        />
      </div>
      <div className="text-center">
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Submit</button>
      </div>
    </form>
  </div>
</div>

     

      
        

      
      {/* ADD Custom Category */}
<div className="flex flex-col items-center">
  {/* Button to toggle the visibility of the category input field */}
  <button
    type="button"
    className="inline-flex justify-center items-center w-28 h-8 rounded-md border border-gray-300 shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
  >
    {showNewCategoryInput ? 'Hide Categories' : 'Add Custom Category'}
  </button>
  {showNewCategoryInput && (
    <div className="flex flex-col items-center mt-4">
      {/* Input field to enter Custom Category */}
      <input
        type="text"
        value={customCategory}
        onChange={(e) => setcustomCategory(e.target.value)}
        className="block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        placeholder="Enter Custom Category"
      />
      {/* Button to add the custom category to database category or custom category */}
      <button
        type="button"
        onClick={handleAddCustomCategory}
        className="inline-flex justify-center mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add
      </button>
    </div>
  )}
  {/* Display list of custom categories */}
{showNewCategoryInput && (
  <div className="mt-4 w-1/2">
    <h3 className="text-lg font-semibold mb-2 text-black">Custom Categories</h3>
    <div className="flex flex-wrap -mx-2">
      {customCategories.map((category) => {
        return (
          <div key={category.id} className="w-1/3 px-2 mb-4">
            <div className="bg-gray-100 p-2 rounded-md flex justify-between items-center">
              <span className="text-black">{category.name}</span>
              <button
                onClick={() => handleDeleteCustomCategory(category.id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}

</div>

  
      {/* Category */}
      {/* Category Dropdown */}
      <div className="flex items-center justify-center space-x-4 mt-6">
        {/* Button to toggle the visibility of the category input field */}
        <button
          type="button"
          className="inline-flex justify-center items-center w-28 h-8 rounded-md border border-gray-300 shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setShowCategoryInput(true)}
        >
          Add Category
        </button>
        {showCategoryInput && (
          <div className="flex items-center">
            {/* Dropdown to select a category from the predefined list */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            >
            <option value="">Select a category</option>
              {combinedCategories
              .sort((a, b) => a.name.localeCompare(b.name)) // Sort categories alphabetically by name
              .map((category) => (
            <option key={category.id} value={category.name}>
            {category.name}
            </option>
            ))}
            </select>
            {/* Date picker to select the starting day */}
            <ReactDatePicker
              selected={startDate} // Pass the selected date
              onChange={handleDateChange} // Handle date change
              className="block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              placeholderText="Select starting day" // Placeholder text
            />
  
            {/* Dropdown to select a Time from the predefined list */}
            <select
              value={selectedTime}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue === 'Custom...') {
                  handleCustomDialog(); // Call the function to handle opening the custom dialog
                } else {
                  // Set selectedValue based on multiple conditions
                  if (times.find(time => time.name === selectedValue)) {
                    const selectedTimeObj = times.find(time => time.name === selectedValue);
                    if (selectedTimeObj.id === 3 && selectedDay) {
                      setSelectedTime(`Weekly on ${selectedDay}`);
                    } else if (selectedTimeObj.id === 4 && selectedDay) {
                      setSelectedTime(`Monthly on the fourth ${selectedDay}`);
                    } else if (selectedTimeObj.id === 5 && selectedDate) {
                      setSelectedTime(`Annually on ${selectedDate}`);
                    } else {
                      setSelectedTime(selectedValue);
                    }
                  }
                }
              }}
              className="block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            >
              <option value="">Select a Time</option>
              {times.map((times) => (
                <option key={times.id} value={times.name}>
                  {times.id === 3 && selectedDay ? `Weekly on ${selectedDay}` : times.id === 5 && selectedDate ? `Annually on ${selectedDate}`: times.id === 4 && selectedDay ? `Monthly on the fourth ${selectedDay}`: times.name}
                  
                </option>
              ))}
              {/* Add a custom option that triggers the pop-up */}
              <option value="Custom..." >Custom...</option>
              </select>
            
            {/* Input field to enter PRICE */}
            <input
              type="text"
              value={price}
              onChange={(e) => setnewprice(e.target.value)}
              className="block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              placeholder="Enter Price"
            />
            {/* Button to add the selected category or custom category */}
  
            <button
              type="button"
              onClick={handleAddCategory}
              className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
        )}
        {/* Custom Dialog */}
        {showCustomDialog && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex justify-center items-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative bg-white p-4 rounded-lg">
            <h3 className="text-lg text-black font-semibold mb-4">Custom Recurrence</h3>

            {/* Repeat Interval Input */}
            <div className="mb-4">
              <label htmlFor="repeatInterval" className="block text-sm font-medium text-gray-700">Repeat Every</label>
              <div className="text-black flex items-center">
                <input
                  type="number"
                  id="repeatInterval"
                  value={repeatInterval}
                  onChange={(e) => setRepeatInterval(e.target.value)}
                  className="mt-1 px-4 py-2 w-24 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm mr-2"
                />
                <span className="text-sm text-gray-700">Choose interval</span>
              </div>
            </div>

            {/* Repeat Unit Dropdown */}
            <div className="mb-4">
              <label htmlFor="repeatUnit" className="block text-sm font-medium text-gray-700">Unit</label>
              <select
                id="repeatUnit"
                value={repeatUnit}
                onChange={(e) => setRepeatUnit(e.target.value)}
                className="text-black mt-1 px-4 py-2 w-48 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>

            {/* Day of Week Selection */}
      {repeatUnit === "weeks" && (
        <div className="mb-4 flex justify-center">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`mx-1 p-3 rounded-full focus:outline-none ${
                selectedDay === day ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {day.substring(0, 1)}
            </button>
          ))}
        </div>
      )}
            {/* Ends Section */}
      <div className="mb-4">
        <label htmlFor="ends" className="block text-sm font-medium text-gray-700">Ends</label>
        <select
  id="ends"
  value={editend !== null ? editend : endOption}
  onChange={(e) => {
    const selectedValue = e.target.value;
    {console.log("OOOOOOOO: ",selectedValue)}
    if (editend !== null) {
      setEditEnd(selectedValue); // Set editEnd if not null
    } else {
      setEndOption(selectedValue); // Set endOption if editEnd is null
    }
  }}
  className="text-black mt-1 px-4 py-2 w-48 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
>
          <option value="Never">Never</option>
          <option value="OnDate">On a specific date</option>
          <option value="AfterOccurrences">After a number of occurrences</option>
        </select>
        {console.log("Logging here: ",editend)}
        {(editend === "OnDate") ? (
          <ReactDatePicker
          selected={editend2} // Use editend directly for selected date
          onChange={(date) => setEditEnd2(date)} // Handle date change for editend
          className="text-black block mt-1 px-4 py-2 w-48 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholderText="Select end date" // Placeholder text
          />
          ) : (endOption === "OnDate" && (
          <ReactDatePicker
          selected={endDate} // Use endDate for selected date
          onChange={(date) => setEndDate(date)} // Handle date change for endDate
          className="text-black block mt-1 px-4 py-2 w-48 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholderText="Select end date" // Placeholder text
          />
        ))}
        {console.log("Logging here ENDDATE: ",endDate)}
        
        {(editend === "AfterOccurrences") ? (
          <input
          type="number"
          value={editoccurrences}
          onChange={(e) => setEditOccurrences(e.target.value)}
          className="text-black mt-1 px-4 py-2 w-24 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm mr-2"
        />
          ) : (endOption === "AfterOccurrences" && (
            <input
            type="number"
            value={occurrences}
            onChange={(e) => setOccurrences(e.target.value)}
            className="text-black mt-1 px-4 py-2 w-24 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm mr-2"
          />
        ))}
        {console.log("Logging here OCCC: ",occurrences)}
      </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end">
              <button
                onClick={handleCustomRecurrenceSubmit}
                className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
              >
                Submit
              </button>
              <button
                onClick={handleCustomDialog}
                className="inline-flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  


      </div>
  
      {/* Table displaying added categories */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4 ml-6 text-black">Added Categories</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created on
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Started on
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ends on
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-black">
          
            {paymentData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.created_at ? new Date(item.created_at).toLocaleString('en-US', {timeZone: 'EST'}) : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.started_at}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.end_at}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(item)} // Pass the item id to the edit handler
                  className="text-indigo-600 hover:text-indigo-800 font-medium mr-2"
                >
                Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(item.id)} // Pass the item id to the delete handler
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {/* Render the edit dialog based on the showEditDialog state */}
    {showEditDialog && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="relative bg-white w-96 rounded-lg">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Edit Item</h2>
          <div className="flex">
            <button
              onClick={() => handleSaveEdit(editItemData)}
              className="text-indigo-600 hover:text-indigo-800 font-medium mr-2 focus:outline-none"
            >
              Save
            </button>
            <button
              onClick={() => setShowEditDialog(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Edit dialog content */}
          <ul className="text-black divide-y divide-gray-200">
            <li className="py-2 ">
              <label className="text-black block font-medium">Category: {editcategory} </label>
              <select
              value={editcategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="text-center block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              style={{ margin: 'auto' }}
            >
            <option value= "">Select a category</option>
              {combinedCategories
              .sort((a, b) => a.name.localeCompare(b.name)) // Sort categories alphabetically by name
              .map((category) => (
            <option key={category.id} value={category.name}>
            {category.name}
            </option>
            ))}
            </select>
            </li>
            <li className="py-2">
              <label className="block font-medium text-gray-800">Started At: {editstart}</label>
              <ReactDatePicker
              
              selected={editstart} // Pass the selected date
              onChange={handleDateChangeForEdit} // Handle date change
              className="text-center block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              style={{ margin: 'auto' }}
              placeholderText="Select starting day" // Placeholder text
            />
            </li>
            <li className="py-2">
              <label className="text-black block font-medium">Time: {edittime}</label>
              <select
              value={edittime}
              onChange={(e) => {
                const eselectedValue = e.target.value;
                if (eselectedValue === 'Custom...') {
                  handleCustomDialog(); // Call the function to handle opening the custom dialog
                } else {
                  // Set selectedValue based on multiple conditions
                  if (times.find(time => time.name === eselectedValue)) {
                    const eselectedTimeObj = times.find(time => time.name === eselectedValue);
                    if (eselectedTimeObj.id === 3 && eselectedDay) {
                      setEditTime(`Weekly on ${eselectedDay}`);
                    } else if (eselectedTimeObj.id === 4 && eselectedDay) {
                      setEditTime(`Monthly on the fourth ${eselectedDay}`);
                    } else if (eselectedTimeObj.id === 5 && eselectedDate) {
                      setEditTime(`Annually on ${eselectedDate}`);
                    } else {
                      setEditTime(eselectedValue);
                    }
                  }
                }
              }}
              className="text-center block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              style={{ margin: 'auto' }}
            >
              <option value="">Select a Time</option>
              {times.map((times) => (
                <option key={times.id} value={times.name}>
                  {times.id === 3 && eselectedDay ? `Weekly on ${eselectedDay}` : times.id === 5 && eselectedDate ? `Annually on ${eselectedDate}`: times.id === 4 && eselectedDay ? `Monthly on the fourth ${eselectedDay}`: times.name}
                  
                </option>
              ))}
              {/* Add a custom option that triggers the pop-up */}
              <option value="Custom...">Custom...</option>
              </select>
            </li>
            <li className="py-2">
              <label className="text-black block font-medium">Ends On: {editend}</label>
              
            </li>
            <li className="py-2">
              <label className="text-black block font-medium">Price: ${editprice}</label>
              <input
              type="text"
              value={editprice}
              onChange={(e) => {const input = e.target.value;
                // Check if the input is a valid float number
                if (/^\d*\.?\d*$/.test(input)) {
                  setEditPrice(input);
                }
              
              }}
              className="text-center block w-48 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              style={{ margin: 'auto' }}
              placeholder="Enter Price"
            />
            </li>
            {/* Add similar select elements for other properties */}
          </ul>
        </div>
      </div>
    </div>
  </div>
)}

  </div>
  )}