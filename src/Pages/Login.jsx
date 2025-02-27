import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../public/Components/firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log('Email:', email);
    // console.log('Password:', password);
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("User loged in successfully!!", {position: "top-center"})
        window.location.href = "/profile"
    } catch (error) {
        toast.error(error.message, {position: "bottom-center"})
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
        <button type="submit" className='my-5 bg-[#006400] text-white rounded-xl p-2 text-xl font-bold'>Login</button>
      </form>
    </div>
  );
};

export default Login;