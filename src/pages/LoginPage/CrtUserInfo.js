import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/logo.png';
import loginImage from '../../assets/loginImage.png';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../providers/AuthProviders';
import Swal from 'sweetalert2';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebaseConfig';
import useRequest from '../../APIServices/useRequest';
import axios from 'axios';

function CreateUserInfoPage() {
  const [postRequest] = useRequest();
  const { handleLoginData, setLoading, user, setUser } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const userID = location.state.userID._id;
  //console.log('location', location);
  const [userInfo, setUserInfo] = useState({
    userType: null,
    userId: userID || '',
    gender: '',
    phoneNumber: '',
  });

  const handleSubmitUsrInfo = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BackendURL}/api/v1/users/crt/usr/info`,
        {
          userType: userInfo.userType,
          gender: userInfo.gender,
          phoneNumber: userInfo.phoneNumber,
          userId: userInfo.userId,
        }
      );

      const { data } = res;

      if (data && data.data) {
        if (data.data.isActive === false) {
          Swal.fire({
            icon: 'info',
            title: 'Account Approval in Pending',
            text: 'Your account has been created but is awaiting admin approval. Please check back later.',
          });
          setUser(null);
          navigate('/');
        } else {
          Swal.fire({
            icon: 'success',
            title: 'User Created Successfully',
            text: 'Your account is active and ready for use.',
          });
          setUser(data.data);
          localStorage.setItem('userCreds', JSON.stringify(data.data));
          navigate('/');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'User Creation Failed',
          text: 'Please check the provided information and try again.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'An Error Occurred',
        text: 'Unable to create user information. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  //console.log('state value', userInfo);

  return (
    <div className="w-full h-screen bg-white flex justify-center items-center p-5">
      <div className="w-full max-w-4xl h-full rounded-lg shadow-lg flex flex-col md:flex-row">
        <div className="bg-orange-100 w-full md:w-1/2 flex justify-center items-center">
          <img src={loginImage} className="w-72 md:w-92" alt="Sign Up Logo" />
        </div>
        <form
          //onSubmit={handleSubmitUsrInfo}
          className="w-full md:w-1/2 p-8 flex flex-col justify-center"
        >
          <div className="mt-5 w-full">
            <div className="flex flex-col items-start">
              <label htmlFor="email">User Type</label>
              <select
                className="border border-gray-200 focus:ring-0 focus:border-gray-400 w-full py-2 rounded-lg px-2"
                name="userType"
                id="userType"
                // onChange={(e) => setGender(e.target.value)}
                value={userInfo.userType}
                onChange={(e) => {
                  setUserInfo((prev) => ({
                    ...prev,
                    userType: e.target.value,
                  }));
                }}
              >
                <option value="">None</option>
                <option value={101}>Vendor</option>
                <option value={103}>Buyer</option>
              </select>
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="gender">Gender</label>
              <select
                className="border border-gray-200 focus:ring-0 focus:border-gray-400 w-full py-2 rounded-lg px-2"
                name="gender"
                id="gender"
                // onChange={(e) => setGender(e.target.value)}
                value={userInfo.gender}
                onChange={(e) => {
                  setUserInfo((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }));
                }}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mt-5 flex flex-col items-start">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                className="border focus:ring-0 focus:border focus:border-gray-400 border-gray-200 w-full py-2 rounded-lg px-2"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="phoneNumber"
                required
                value={userInfo.phoneNumber}
                onChange={(e) => {
                  setUserInfo((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }));
                }}
              />
            </div>

            {/* Role Selection Section */}
            {/* <div className="mt-5 flex justify-between">
              <button
                type="button"
                className={`w-full py-1 mr-2 rounded-lg ${
                  selectedRole === 103
                    ? "bg-orange-600 text-white"
                    : "bg-white text-black"
                } font-bold duration-200 hover:cursor-pointer`}
                onClick={() => setSelectedRole(103)}
              >
                As Buyer
              </button>
              <button
                type="button"
                className={`w-full py-1 ml-2 rounded-lg ${
                  selectedRole === 101
                    ? "bg-orange-600 text-white"
                    : "bg-white text-black"
                } font-bold duration-200 hover:cursor-pointer`}
                onClick={() => setSelectedRole(101)}
              >
                As Vendor
              </button>
              <button
                type="button"
                className={`w-full py-1 ml-2 rounded-lg ${
                  selectedRole === 109
                    ? "bg-orange-600 text-white"
                    : "bg-white text-black"
                } font-bold duration-200 hover:cursor-pointer`}
                onClick={() => setSelectedRole(109)}
              >
                As Admin
              </button>
            </div> */}

            <div>
              <input
                onClick={(e) => handleSubmitUsrInfo(e)}
                className="mt-10 w-full py-2 rounded-lg bg-orange-600 text-white font-bold duration-200 hover:duration-200 hover:cursor-pointer hover:bg-orange-700"
                value="Login"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserInfoPage;
