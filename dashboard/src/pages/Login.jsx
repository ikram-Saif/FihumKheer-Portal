import axios from "axios";
import { Button, Checkbox, Label } from "flowbite-react";
 import { Form ,Field, Formik, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate  } from "react-router-dom";
import Logo from "../components/Logo";
import {useAuthStore} from "../store/authStor"


function Login() {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state)=> state.setToken)
    const {userRole, setRole} = useAuthStore()


 const  handleLogin= async(values)=>{
    const data = {
        
        "identifier": values.email, 
        "password": values.password
    }

    try {
      const response = await axios.post(`http://localhost:1337/api/auth/local`,data)
      const token = response.data.jwt
      const name = response.data.user.username
      console.log(response)
         setAuth(token)
         setRole(response.data.user.user_role)
        toast.success('Logined Successfully!')
          navigate("/", { replace: true });
        
    } catch (error) {
         // Use proper error logging
    const message =
      error.response?.data?.error?.message || "Login failed.";
        toast.error(message);
        console.log("Login failed:", message); 
  }

 }


 const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});
    
  return (
   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-no-repeat 
   bg-[url('/assets/images/login/hero-shape2.png')] bg-[#222328]">
      <div href="#" className="flex items-center mb-6 w-28 h-24">
        <Logo />  
      </div>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-9 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
    <Toaster />
   <Formik  onSubmit={handleLogin} initialValues={{email:"", passwoed:""}} validationSchema={validationSchema}>
    <Form className="space-y-4 md:space-y-6">

        <div className="mb-2 block">
          <Label htmlFor="email1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</Label>
          <Field id="email1" type="email" placeholder="name@flowbite.com"  name = 'email'
          className = "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
         <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
   
        <div className="mb-2 block">
          <Label htmlFor="password1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</Label>
        <Field id="password1" type="password"  name =  'password'
             className = "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

     <div className="flex items-center justify-between">
       <div className="flex items-start">
        <div className="flex items-center h-5">
            <Checkbox  id="remember" aria-describedby="remember" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
            </div>
                <div className="ml-3 text-sm">
                 <Label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</Label>
                </div>
            </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
        </div>
         <Button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</Button>
                
    </Form>
   </Formik>
   </div>
      </div>

   </div>
  )
}

export default Login