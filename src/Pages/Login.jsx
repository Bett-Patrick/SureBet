import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Components/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email and Password Validation
    if (!email || !password) {
      toast.error("All fields are required", { position: "bottom-center" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", { position: "bottom-center" });
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long", { position: "bottom-center" });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        // const role = userDoc.data().role;
        toast.success("Logged in successfully!", { position: "top-center" });
        
        // Redirect Users After Login Based on Role
        // navigate(role === "admin" ? "/admin" : "/profile");
      }
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        toast.error("Invalid credentials!!", { position: "bottom-center" });
      } else {
        toast.error(error.message, { position: "bottom-center" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-page md:min-w-[500] my-30 gap-10 mx-auto px-[5%] border w-[90%] rounded-md'>
      <h1 className='text-4xl font-bold mt-5'>Login</h1>
      <hr className='h-2 mx-auto opacity-20 my-2' />
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5 items-center'>
          <div>
            <label htmlFor="email" className='block text-left mb-2 text-[#000435] text-lg'>Email:</label>
            <input
              className='border border-[#000435] rounded-3xl p-3 w-full'
              placeholder='Enter Email'
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className='block text-left mb-2 text-[#000435] text-lg'>Password:</label>
            <input
              className='border border-[#000435] rounded-3xl p-3 w-full'
              placeholder='Enter Password'
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>
        <hr className='h-2 mx-auto opacity-20 mt-5'/>
        <button
          type="submit"
          className={`my-5 text-white rounded-xl p-2 text-xl font-bold ${loading ? 'bg-gray-500' : 'bg-[#006400]'}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="flex flex-row gap-3 justify-center my-3">
          <p>Don't have an account yet?</p>
          <button 
            className="font-semibold border-b-2 text-blue-950 p-0"
            onClick={() => navigate("/register")}
          >
            register
          </button>
        </div>
        <div className="flex flex-row gap-3 justify-center my-3">
          <p>Forgot your password?</p>
          <button 
            className="font-semibold border-b-2 text-blue-950 p-0"
            onClick={() => navigate("/reset-password")}
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;