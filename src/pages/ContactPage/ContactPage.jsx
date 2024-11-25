import React from "react";
import illust from "../../assets/Work_7.png";
import { FaFacebookSquare } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa";
import useRequest from "../../APIServices/useRequest";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const [postRequest, getRequest] = useRequest();
  const navigate = useNavigate();

  const createContact = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const userFullName = form.name.value;
      const email = form.email.value;
      const subject = form.subject.value;
      const description = form.description.value;

      const crtData = await postRequest("/contact/crt", {
        userFullName,
        email,
        subject,
        description,
      });

      if (crtData?.data?.error === false) {
        Swal.fire(
          "Successfully Sent the Message!",
          "Thank you for reaching out. Stay with Flavorfull Fushion!",
          "success"
        ).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Failed to Contact", error.message, "error");
    }
  };

  return (
    <div className="bg-fifth px-6 md:px-[10vw] py-20 md:py-[8vh]">
      <div className="bg-transparent grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-1 px-4 py-4 md:border md:shadow-lg md:rounded-lg">
          <img src={illust} className="-mt-2" alt="" />
          <div className="px-4 mt-5">
            <h1 className="font-extrabold text-xl">Address</h1>
            <p className="mt-2 tracking-wide">
              Majdair EidGah, Narayanganj, Bangladesh
            </p>
          </div>
          <div className="px-4 mt-10">
            <h1 className="font-extrabold text-xl">Phone</h1>
            <p className="mt-2 tracking-wide text-lg">{`(+880) 1621754583`}</p>
          </div>
          <div className="px-4 mt-10">
            <h1 className="font-extrabold text-xl">Email</h1>
            <p className="mt-2 tracking-wide text-lg">
              mahisur.rahman.001@gmail.com
            </p>
          </div>
          <div className="px-4 mt-10">
            <h1 className="font-extrabold text-xl">Website</h1>
            <div className="flex items-center justify-between mt-2">
              <p className="tracking-wide text-lg">https://mahisur.com</p>
              <p className="text-fourth font-extrabold duration-200 hover:text-seventh hover:cursor-pointer hover:duration-200">
                Visit Site
              </p>
            </div>
          </div>
          <div className="px-4 mt-10">
            <h1 className="font-extrabold text-xl text-center md:text-left">Follow Us</h1>
            <div className="mt-4 pb-5 text-3xl md:text-2xl flex items-center justify-center md:justify-normal gap-10">
              <FaFacebookSquare className="text-orange-600 duration-200 hover:text-seventh hover:cursor-pointer hover:duration-200 hover:scale-110"></FaFacebookSquare>
              <ImInstagram className="text-orange-600 duration-200 hover:text-seventh hover:cursor-pointer hover:duration-200 hover:scale-110"></ImInstagram>
              <FaLinkedin className="text-orange-600 duration-200 hover:text-seventh hover:cursor-pointer hover:duration-200 hover:scale-110"></FaLinkedin>
            </div>
          </div>
        </div>
        <div className="col-span-2 md:px-10 py-4 md:border md:shadow-lg md:rounded-lg">
          <h1 className="mt-5 text-2xl font-extrabold tracking-wider text-center md:text-left">
            How can we improve our experience?{" "}
          </h1>
          <form onSubmit={createContact} className="mt-5 py-5">
            <div className="flex items-center justify-between gap-5">
              <div className="flex flex-col w-full">
                <label className="font-extrabold tracking-wide" htmlFor="name">
                  Name
                </label>
                <input
                  className="mt-2 text-sm w-full py-2 px-2 border border-fourth rounded-[6px] focus:outline-seventh"
                  type="text"
                  name="name"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-extrabold tracking-wide" htmlFor="email">
                  Email
                </label>
                <input
                  className="mt-2 text-sm w-full py-2 px-2 border border-fourth rounded-[6px] focus:outline-seventh"
                  type="email"
                  name="email"
                  required
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex flex-col w-full">
                <label
                  className="font-extrabold tracking-wide"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  className="mt-2 text-sm w-full py-2 px-2 border border-fourth rounded-[6px] focus:outline-seventh"
                  type="text"
                  name="subject"
                  required
                />
              </div>
            </div>
            <div className="mt-5">
              <label
                className="font-extrabold tracking-wide"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="w-full border border-fourth h-[20vh] mt-2 rounded-[6px] px-2 py-2 focus:outline-seventh"
                name="description"
                required
                id=""
              ></textarea>
            </div>
            <div className="mt-5">
              <input
                className="px-4 py-2 bg-fourth rounded-[4px] duration-200 text-white bg-orange-600 font-bold hover:duration-200 hover:scale-110 hover:cursor-pointer"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
