import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../public/Components/firebase";
import { setDoc, doc, getDocs, collection, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !phone || !password) {
      toast.error("All fields are required", { position: "bottom-center" });
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long", { position: "bottom-center" });
      return;
    }
    setLoading(true);
    try {
      // Check if the phone number already exists
      const q = query(collection(db, "users"), where("phone", "==", phone));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.error("Phone number already registered", { position: "bottom-center" });
        setLoading(false);
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          phone: phone,
        });
      }
      toast.success("User registered successfully!!", { position: "top-center" });
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email already in use", { position: "bottom-center" });
      } else if (error.code === 'auth/invalid-email') {
        toast.error("Invalid email", { position: "bottom-center" });
      } else {
        toast.error(error.message, { position: "bottom-center" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register-page md:min-w-[500] my-30 gap-10 mx-auto px-[5%] border w-[90%] rounded-md'>
      <h1 className='text-4xl font-bold mt-5'>Register</h1>
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
            <label htmlFor="phone" className='block text-left mb-2 text-[#000435] text-lg'>Phone:</label>
            <input
              className='border border-[#000435] rounded-3xl p-3 w-full'
              placeholder='Enter Phone Number'
              type="tel"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;