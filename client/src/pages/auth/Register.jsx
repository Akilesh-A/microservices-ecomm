import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

import { Link, useNavigate } from "react-router-dom";
import Form from "@/components/common/Form";
import { registerFormControls } from "@/config";
import {regiterUser} from "../../store/auth-slice/index"
import { useDispatch } from "react-redux";


const initialState = {
  userName: "",
  email: "",
  password: "",
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(regiterUser(formData)).then((a)=>{
      console.log(a);
      
      if(a.payload.success===true){
        toast({
          title: a.payload.message
        })
        navigate('/auth/login')

      }else{
          toast({
          title: a.payload.message,
         variant: "destructive",
        })
      }
      // console.log(a);
      
      
    })


    console.log("sdvgjdvv");
  };
  
    console.log(formData);
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign Up
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium text-primary hover:underline ml-2"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      <Form
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default Register;
