"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import Loading from "../../components/Loading";
import UpdateInfo from "../../components/UpdateInfo";
import UpdatePaymentInfo from "../../components/UpdatePaymentInfo";

import Link from "next/link";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmedPw, setConfirmedPw] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const [newPaymentDetail, setNewPaymentDetail] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      // console.log("Frontend Token:", token);

      // check if his has the token (that mean if he is login)
      // if (!token) {
      //   router.push("/login");
      //   return;
      // }

      try {
        // check if the token is expired
        // const decoded = jwt.decode(token);
        // if (!decoded || Date.now() >= decoded.exp * 1000) {
        //   router.push("/login");
        //   return;
        // }

        const response = await fetch("http://localhost:3030/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile fetch response:", response);
        // setIsLogin(response.ok);

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfileData();
  }, [router]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <Loading />;
  }

  const handleUpdateUserData = (updatedData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const handleOnChange = (ev) => {
    const { name, value } = ev.target;
    if (name === "old") {
      setOldPw(value);
    } else if (name === "new") {
      setNewPw(value);
    } else if (name === "confirmed") {
      setConfirmedPw(value);
    }
  };

  const handleOnSubmit = async () => {
    if (!(oldPw && newPw && confirmedPw)) {
      setPasswordError("Please enter all information");
      return;
    }

    try {
      const res = await fetch("http://localhost:3030/verify-password", {
        method: "POST",
        body: JSON.stringify({
          password: oldPw,
          username: userData.merchant_username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setPasswordError(
          "The current password you entered does not match the system record"
        );
      } else if (checkPasswordFormat(confirmedPw)) {
        setPasswordError(
          "Password must be at least 8 characters and contain at least one English letter and number"
        );
      } else if (oldPw === confirmedPw) {
        setPasswordError(
          "The new password is the same as the current password"
        );
      } else if (newPw !== confirmedPw) {
        setPasswordError(
          "The new password and the confirmed password are different!!"
        );
      } else {
        const res = await updatePassword(newPw);
        if (res.ok) {
          setPasswordError("Password has been updated");
          setOldPw("");
          setNewPw("");
          setConfirmedPw("");
        } else {
          setPasswordError("Password cannot be updated");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const updatePassword = async (password) => {
    try {
      const res = await fetch("http://localhost:3030/update-password", {
        method: "POST",
        body: JSON.stringify({
          password: newPw,
          username: userData.merchant_username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const checkPasswordFormat = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return password.length < 8 || !passwordRegex.test(password);
  };

  return (
    <>
      {/* --------------------------------------Page title----------------------------------- */}
      <h1 className="text-3xl mt-4 mb-2">Profile</h1>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href="/dashboard">Home</Link>
          </li>
          <li>
            <a>Profile</a>
          </li>
        </ul>
      </div>
      {/* --------------------------------分隔個條線--------------------------- */}
      <div className="flex w-full flex-col">
        <div className="divider divider-primary mt-1 mb-1"></div>
      </div>
      {/* -------------------data----------------------------- */}
      <div className="flex justify-center">
        <div className="mt-2 stats stats-vertical lg:stats-horizontal shadow w-11/12">
          <div className="stat pl-16">
            <div className="stat-title">Username:</div>
            <div className="infoValue text-center">
              {userData.merchant_username}
            </div>
            <div className="stat-title">Email:</div>
            <div className="infoValue text-center">
              {userData.merchant_email}
            </div>
            <div className="stat-title">Phone Number:</div>
            <div className="infoValue text-center">{userData.telephone_no}</div>
          </div>

          <div className="stat pl-16">
            <div className="stat-title">Company:</div>
            <div className="infoValue text-center">{userData.organization}</div>
            <div className="stat-title">FPS Number:</div>
            <div className="infoValue text-center">
              {userData.payment_number?.fps || "Not provided"}
            </div>
            <div className="stat-title">PayMe Number:</div>
            <div className="infoValue text-center">
              {userData.payment_number?.payme || "Not provided"}
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------分隔既線2------------------------- */}
      <div className="divider"></div>
      {/* -------------------------change info list-------------------------- */}
      {/* <p>Id: {userData.id}</p> */}

      <div className="flex justify-center">
        <div className="flex">
          <div>
            <div className="flex mb-4 stat-title">
              Change Account Information:
            </div>
            <UpdateInfo
              userData={userData}
              onUpdateUserData={handleUpdateUserData}
            />
          </div>
          <div className="flex ml-4 mt-10">
            <div>
              <div>
                <p>Current Password</p>
                <input
                  name="old"
                  value={oldPw}
                  onChange={handleOnChange}
                  className="input input-bordered input-sm w-full max-w-xs mb-6"
                  placeholder="Type here"
                />
              </div>
              <div>
                <p>New Password</p>
                <input
                  name="new"
                  value={newPw}
                  onChange={handleOnChange}
                  className="input input-bordered input-sm w-full max-w-xs"
                  placeholder="Type here"
                />
              </div>
              <div>
                <p>Confirm Password</p>
                <input
                  name="confirmed"
                  value={confirmedPw}
                  onChange={handleOnChange}
                  className="input input-bordered input-sm w-full max-w-xs"
                  placeholder="Type here"
                />
              </div>

              <button
                className="btn mt-2"
                type="button"
                onClick={handleOnSubmit}
              >
                Change Password
              </button>
              {passwordError && (
                <div className="text-red-500">{passwordError}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex">
          <UpdatePaymentInfo
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
