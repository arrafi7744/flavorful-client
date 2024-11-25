import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/logo.png";
import loginImage from "../../assets/loginImage.png";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import useRequest from "../../APIServices/useRequest";

function LoginPage() {
  const [postRequest] = useRequest();
  const { handleLoginData, setLoading, user, setUser } =
    useContext(AuthContext);
  //console.log('User Details', user);
  const [selectedRole, setSelectedRole] = useState(103);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      await handleLoginData({ email, password });

      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      // Redirect after successful login
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const res = await postRequest(`/users/crt/bygl`, {
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
        token,
      });

      if (res.data.error === true) {
        return Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res.data.message || "Invalid credentials",
        });
      } else {
        if (res.data.data.userType) {
          if (res.data.data.isActive === false) {
            return Swal.fire({
              icon: "success",
              title:
                "User Created Successfully, Please Wait for Admin Approval",
              text: res.data.message || "",
            });
          } else {
            localStorage.setItem("userCreds", JSON.stringify(res.data.data));

            setUser(res.data.data);
            navigate("/");
          }
        } else {
          navigate("/user-info-crt", {
            state: { userID: res.data.data },
          });
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire({
        icon: "success",
        title: "User Created Successfully, Please Wait for Admin Approval",
        text: "Please Wait for Admin Approval",
      });
    }
  };

  return (
    <div className="w-full h-screen bg-white flex justify-center items-center p-5">
      <div className="w-full max-w-4xl h-full md:rounded-lg md:shadow-lg flex flex-col md:flex-row">
        <div className="bg-orange-100 md:w-1/2 hidden md:flex justify-center items-center">
          <img src={loginImage} className="w-72 md:w-92" alt="Sign Up Logo" />
        </div>
        <form
          onSubmit={handleLogin}
          className="w-full md:w-1/2 p-4 md:px-8 py-10 md:py-8 flex flex-col justify-center"
        >
          <div className="flex items-center justify-center">
            <Link to="/">
              <img src={img} className="w-20" alt="" />
            </Link>
            <h1 className="text-2xl font-poppins font-extrabold">
              Login to <span className="text-orange-600">Flavourfull </span>
              Fushion
            </h1>
          </div>
          <div className="mt-5 w-full">
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="border focus:ring-0 focus:border focus:border-gray-400 border-gray-200 w-full py-2 rounded-lg px-2"
                name="email"
                id="email"
                placeholder="email"
                required
              />
            </div>
            <div className="mt-5 flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="border focus:ring-0 focus:border focus:border-gray-400 border-gray-200 w-full py-2 rounded-lg px-2"
                name="password"
                id="password"
                placeholder="password"
                required
              />
            </div>

            <div>
              <input
                type="submit"
                className="mt-10 w-full py-2 rounded-lg bg-orange-600 text-white font-bold duration-200 hover:duration-200 hover:cursor-pointer hover:bg-orange-700"
                value="Login"
              />
            </div>
            <div className="w-full mt-2 flex items-center justify-between">
              <h1>
                New to <span>Flavourfull</span> Fushion?
              </h1>
              <Link to="/signup">
                <p className="text-sm md:text-md font-bold text-orange-600 duration-200 hover:duration-200 hover:cursor-pointer hover:text-orange-700">
                  Create Account
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
