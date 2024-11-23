import React, { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import UploadAvatar from "../components/UploadAvatar";
import Header from "../components/Header/Header";
import loginStore from "../stores/useLoginStore";

const Profile = () => {
  const { userName, email, password } = loginStore();
  const [user, setUser] = useState({
    username: userName,
    email: email,
    avatarUrl: "", // You can add the logic to fetch the avatar URL
    fullName: "", // If this is available in your data
    gender: "",
    phoneNumber: "",
  });

  const [isUserUpdated, setIsUserUpdated] = useState(false);

  // Set the user profile data from localStorage (if necessary)
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        username: parsedUser.userName,
        email: parsedUser.email,
        avatarUrl: parsedUser.avatarUrl || "", // Use default avatar if none
        fullName: parsedUser.fullName || "", // Or handle if it's missing
        gender: parsedUser.gender || "",
        phoneNumber: parsedUser.phoneNumber || "",
      });
    }
  }, [isUserUpdated]);

  return (
    <>
      <Header />
      <div className="profile">
        <div className="avatar">
          <div className="avatar-wrapper">
            {user.avatarUrl ? (
              <img
                src={`http://localhost:5173${user.avatarUrl}`}
                alt={`${user.username} avatar`}
              />
            ) : (
              <IoPersonCircleOutline />
            )}
            <UploadAvatar
              token={user.email} // Pass token (or use user ID from state)
              userId={user.id}
              username={user.username}
              avatarUrl={user.avatarUrl}
              setIsUserUpdated={setIsUserUpdated}
            />
          </div>
        </div>
        <div className="body">
          <p>FullName: {user.fullName}</p>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>PhoneNumber: {user.phoneNumber}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
