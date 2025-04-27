import { USER_API_END_POINT } from '@/utils/constant';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

function Register() {
  const { loading, darkMode } = useSelector(store => store.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={`
      min-h-screen flex items-center justify-center
      bg-gradient-to-br ${darkMode ? 'from-gray-900 via-gray-800 to-black' : 'from-blue-100 via-white to-blue-200'}
      transition-all duration-500
    `}>
      <div className={`
        w-full max-w-md p-8 rounded-2xl shadow-2xl
        ${darkMode ? 'bg-gray-950' : 'bg-white'}
        transform transition-transform duration-300 hover:scale-105
      `}>
        <h2 className={`
          text-3xl font-extrabold text-center mb-6
          ${darkMode ? 'text-blue-400' : 'text-blue-600'}
        `}>
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="fullname" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Full Name</Label>
            <Input
              id="fullname"
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className={`
                ${darkMode
                  ? 'bg-gray-800 text-white border-gray-700 placeholder:text-gray-400 focus:ring-blue-500'
                  : 'bg-gray-100 text-gray-900 border-gray-300 placeholder:text-gray-500 focus:ring-blue-400'
                }
                rounded-lg px-4 py-2 transition focus:outline-none focus:ring-2
              `}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="username" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
              className={`
                ${darkMode
                  ? 'bg-gray-800 text-white border-gray-700 placeholder:text-gray-400 focus:ring-blue-500'
                  : 'bg-gray-100 text-gray-900 border-gray-300 placeholder:text-gray-500 focus:ring-blue-400'
                }
                rounded-lg px-4 py-2 transition focus:outline-none focus:ring-2
              `}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="email" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className={`
                ${darkMode
                  ? 'bg-gray-800 text-white border-gray-700 placeholder:text-gray-400 focus:ring-blue-500'
                  : 'bg-gray-100 text-gray-900 border-gray-300 placeholder:text-gray-500 focus:ring-blue-400'
                }
                rounded-lg px-4 py-2 transition focus:outline-none focus:ring-2
              `}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="password" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className={`
                ${darkMode
                  ? 'bg-gray-800 text-white border-gray-700 placeholder:text-gray-400 focus:ring-blue-500'
                  : 'bg-gray-100 text-gray-900 border-gray-300 placeholder:text-gray-500 focus:ring-blue-400'
                }
                rounded-lg px-4 py-2 transition focus:outline-none focus:ring-2
              `}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="phoneNumber" className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Phone Number</Label>
            <Input
              id="phoneNumber"
              type="number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
              className={`
                ${darkMode
                  ? 'bg-gray-800 text-white border-gray-700 placeholder:text-gray-400 focus:ring-blue-500'
                  : 'bg-gray-100 text-gray-900 border-gray-300 placeholder:text-gray-500 focus:ring-blue-400'
                }
                rounded-lg px-4 py-2 transition focus:outline-none focus:ring-2
              `}
            />
          </div>
          {loading ? (
            <Button className="w-full py-3">
              <Loader2 className="animate-spin mr-2" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className={`
                w-full py-3 rounded-full font-semibold
                bg-gradient-to-r
                ${darkMode
                  ? 'from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white'
                  : 'from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white'
                }
                transition-all duration-300 shadow-lg
              `}
            >
              Register
            </Button>
          )}
        </form>
        <div className="mt-6 text-center text-sm">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?
            <Link
              to="/login"
              className={`ml-1 font-semibold transition-colors duration-300
                ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}
              `}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;