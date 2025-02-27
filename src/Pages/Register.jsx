import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Password:', password);
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
        <button type="submit" className='my-5 bg-[#006400] text-white rounded-xl p-2 text-xl font-bold'>Register</button>
      </form>
    </div>
  );
};

export default Register;