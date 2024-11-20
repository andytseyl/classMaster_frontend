"use client";
// import Layout from "../components/Layout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import axios from "axios";

export const SignUp = () => {
  const [data, setData] = useState({
    merchant_username: "",
    merchant_email: "",
    telephone_no: "",
    organization: "",
    password: "",
    subscription_period: "",
    created_program_id: [],
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState({});

  const router = useRouter();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Do it later
  // const handleTelephoneChange = (e) => {
  //   const { name } = e.target;
  //   const telephone = name.value.replace(/\D/g, "");

  //   setData((prev) => ({
  //     ...prev,
  //     telephone_no: telephone,
  //   }));
  // };

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    const {
      merchant_username,
      merchant_email,
      telephone_no,
      organization,
      password,
    } = data;

    // Log the data being sent
    // console.log("Form data to send:", {
    //   merchant_username,
    //   merchant_email,
    //   telephone_no,
    //   organization,
    //   password,
    //   telephone_no,
    // });

    // It need to be check at the backend
    // const existUser = await merchant_username.findOne({ merchant_username });
    // if (existUser) {
    //   newErrors.user_error = "此用戶名已使用，請使用另一名稱";
    // }

    // Check telephone number format
    const validDigits = ["2", "3", "5", "6", "7", "8", "9"];
    if (telephone_no.length !== 8) {
      newErrors.telephone_error = "電話號碼必須為8位數字";
    } else if (
      !validDigits.includes(telephone_no[0]) ||
      telephone_no.slice(0, 3) === "999"
    ) {
      newErrors.telephone_error = "電話號碼必須為有效數字";
    }

    // Check email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(merchant_email)) {
      newErrors.email_error = "電子郵件無效";
    }

    // Check password format
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password.length < 8) {
      newErrors.password_error = "密碼必須至少長度為8";
    } else if (!passwordRegex.test(password)) {
      newErrors.password_error = "密碼必須至少包含一個數字和一個英文字";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (
      merchant_username &&
      merchant_email &&
      telephone_no &&
      organization &&
      password &&
      Object.keys(newErrors).length === 0
    ) {
      const res = await fetch("http://localhost:3030/register", {
        method: "POST",
        body: JSON.stringify({
          merchant_username,
          merchant_email,
          telephone_no,
          organization,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        const responseData = await res.json();
        console.log("Response: ", responseData);
        router.push("/");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "An error occurred");
      }
    } else {
      setError("Please fill in all fields.");
    }
  }
  return (
    <div className="flex flex-row justify-center">
      <div className="artboard phone-3">
        <form onSubmit={handleSubmit}>
          <div className="center">註冊帳號</div>
          {/* <div>
            <p>帳戶名稱</p>
            <input
              name="merchant_username"
              type="text"
              placeholder="帳戶名稱"
              value={data.merchant_username}
              onChange={handleOnChange}
              required
              style={{ border: "1px solid black" }}
            ></input>
          </div>
          {errors.user_error && (
            <span style={{ color: "red" }}>{errors.user_error}</span>
          )}
          <div>
            <p>電郵</p>
            <input
              name="merchant_email"
              type="text"
              placeholder="電郵"
              value={data.merchant_email}
              onChange={handleOnChange}
              required
              style={{ border: "1px solid black" }}
            ></input>
          </div>
          <div className="ErrorLabel" style={{ height: "24px" }}>
            {errors.email_error && (
              <span style={{ color: "red" }}>{errors.email_error}</span>
            )}
          </div>
          <div>
            <p>電話</p>
            <input
              name="telephone_no"
              type="text"
              placeholder="電話"
              value={data.telephone_no}
              onChange={handleOnChange}
              required
              style={{ border: "1px solid black" }}
            ></input>
          </div>
          <div className="ErrorLabel" style={{ height: "24px" }}>
            {errors.telephone_error && (
              <span style={{ color: "red" }}>{errors.telephone_error}</span>
            )}
          </div>
          <div>
            <p>公司名稱</p>
            <input
              name="organization"
              type="text"
              placeholder="公司名稱"
              value={data.organization}
              onChange={handleOnChange}
              required
              style={{ border: "1px solid black" }}
            ></input>
          </div>
          <div className="ErrorLabel" style={{ height: "24px" }}></div>
          <div>
            <p>密碼</p>
            <input
              name="password"
              type="password"
              placeholder="密碼"
              value={data.password}
              onChange={handleOnChange}
              required
              style={{ border: "1px solid black" }}
            ></input>
          </div>
          <div className="ErrorLabel" style={{ height: "24px" }}>
            {errors.password_error && (
              <span style={{ color: "red" }}>{errors.password_error}</span>
            )}
          </div>
          <button type="submit" className="btn btn-active">
            註冊
          </button> */}

          <div className="label">
            <span className="label-text">帳戶名稱</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              name="merchant_username"
              type="text"
              className="grow"
              placeholder="帳戶名稱"
              value={data.merchant_username}
              onChange={handleOnChange}
              required
            />
          </label>
          <div className="ErrorLabel" style={{ height: "24px" }}>
            {errors.user_error && (
              <span style={{ color: "red" }}>{errors.user_error}</span>
            )}
          </div>
          <div className="label">
            <span className="label-text">電郵</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              name="merchant_email"
              type="text"
              className="grow"
              placeholder="電郵"
              value={data.merchant_email}
              onChange={handleOnChange}
              required
            />
          </label>
          <div className="ErrorLabel" style={{ height: "24px" }}>
            {errors.email_error && (
              <span style={{ color: "red" }}>{errors.email_error}</span>
            )}
          </div>
          <div className="label">
            <span className="label-text">電話</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
              />
            </svg>
            <input
              name="telephone_no"
              type="text"
              className="grow"
              placeholder="電話"
              value={data.telephone_no}
              onChange={handleOnChange}
              required
            ></input>
          </label>
          <div className="ErrorLabel" style={{ height: "24px" }}>
            {errors.telephone_error && (
              <span style={{ color: "red" }}>{errors.telephone_error}</span>
            )}
          </div>
          <div className="label">
            <span className="label-text">公司名稱</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
              />
            </svg>
            <input
              name="organization"
              type="text"
              className="grow"
              placeholder="公司名稱"
              value={data.organization}
              onChange={handleOnChange}
              required
            />
          </label>
          <div className="ErrorLabel" style={{ height: "24px" }}></div>
          <div className="label">
            <span className="label-text">密碼</span>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              />
            </svg>
            <input
              name="password"
              type="password"
              className="grow"
              placeholder="密碼"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </label>
          <div className="ErrorLabel" style={{ height: "24px" }}>
            {errors.password_error && (
              <span style={{ color: "red" }}>{errors.password_error}</span>
            )}
          </div>
          <button type="submit" className="btn btn-active">
            註冊
          </button>
        </form>
        <p className="mt-2">
          已有帳號？
          <Link
            href="/"
            className="link link-hover underline underline-offset-2"
          >
            按此登入
          </Link>
        </p>
      </div>
    </div>
  );
};

export default function Register() {
  return <SignUp />;
}
