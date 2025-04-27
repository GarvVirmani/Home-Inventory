import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

function Login() {
    const { loading, darkMode } = useSelector(store => store.theme);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, { identifier, password }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        }
        catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
        finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className={`
            min-h-screen flex items-center justify-center px-4
            ${darkMode 
                ? 'bg-gradient-to-tr from-gray-900 via-black to-gray-900' 
                : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
            }
        `}>
            <div className={`
                w-full max-w-md rounded-3xl shadow-2xl p-8 sm:p-10
                transition-transform duration-300 hover:scale-105
                ${darkMode 
                    ? 'bg-gradient-to-b from-gray-800 to-gray-900 text-white'
                    : 'bg-gradient-to-b from-white to-blue-50 text-gray-900'
                }
            `}>
                <h2 className={`
                    text-3xl sm:text-4xl font-extrabold text-center mb-8
                    ${darkMode ? 'text-blue-400' : 'text-blue-600'}
                `}>
                    Welcome Back
                </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label 
                            htmlFor="identifier" 
                            className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Username or Email
                        </Label>
                        <Input
                            id="identifier"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder="Enter username or email"
                            required
                            className={`
                                w-full px-4 py-3 rounded-lg border
                                focus:outline-none focus:ring-2
                                ${darkMode
                                    ? 'bg-gray-700 border-gray-600 placeholder:text-gray-400 text-white focus:ring-blue-400'
                                    : 'bg-white border-gray-300 placeholder:text-gray-500 text-gray-900 focus:ring-blue-400'
                                }
                            `}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label 
                            htmlFor="password" 
                            className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            className={`
                                w-full px-4 py-3 rounded-lg border
                                focus:outline-none focus:ring-2
                                ${darkMode
                                    ? 'bg-gray-700 border-gray-600 placeholder:text-gray-400 text-white focus:ring-blue-400'
                                    : 'bg-white border-gray-300 placeholder:text-gray-500 text-gray-900 focus:ring-blue-400'
                                }
                            `}
                        />
                    </div>

                    <div>
                        {loading ? (
                            <Button className="w-full py-3" disabled>
                                <Loader2 className="animate-spin mr-2" />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className={`
                                    w-full py-3 rounded-full font-semibold
                                    bg-gradient-to-r
                                    ${darkMode 
                                        ? 'from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600'
                                        : 'from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500'
                                    }
                                    text-white shadow-md hover:shadow-lg transition-all duration-300
                                `}
                            >
                                Login
                            </Button>
                        )}
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Don't have an account?
                        <Link
                            to="/register"
                            className={`
                                ml-1 font-semibold transition-colors
                                ${darkMode 
                                    ? 'text-blue-400 hover:text-blue-300' 
                                    : 'text-blue-500 hover:text-blue-400'
                                }
                            `}
                        >
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;