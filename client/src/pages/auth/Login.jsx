import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import {loginUser} from "../../store/auth-slice/index"
import { toast } from "@/components/ui/use-toast";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch=useDispatch()
  const onSubmit = (event) => {
    event.preventDefault();
  dispatch(loginUser(formData)).then((a) => {
  if (a.payload && a.payload.success) {
    toast({ title: a.payload.message });
    // navigate("/dashboard") if needed
  } else {
    toast({ title: a.payload?.message,
          variant:"destructive"
     });

  }
});


  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
       Sign In to your account
        </h1>
        <p className="mt-2">
         Dont Have an account
          <Link
            className="font-medium text-primary hover:underline ml-2"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      <Form
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default Login;
