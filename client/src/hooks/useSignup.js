import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const succes = handleInputErrors({ fullName, username, password, confirmPassword, gender });
    if (!succes) return;
    setLoading(true);
  try {
    const res = await fetch("/api/v1/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, username, password, confirmPassword, gender
      }),
    });
    
    const data = await res.json();
    console.log(data);
    if (res.status === 201) {
      toast.success("Account created successfully");
    }
    if (data.error) {
      throw new Error(data.error);
    }

    //will save fromt here to local storage 
    localStorage.setItem("chat-user",JSON.stringify(data));
    setAuthUser(data);
  
  } catch (error) {
    toast.error(error.message);
  }
  finally{
    setLoading(false);
  };
}
return { signup, loading };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("All fields are required");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if(password.length < 6){
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;
}
