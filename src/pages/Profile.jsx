import React, { useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import UploadAvatar from "../components/UploadAvatar";
import Header from "../components/Header/Header";
import useProfileStore from "../stores/useProfileStore";

const Profile = () => {
  const { user, setUser, updateUser } = useProfileStore();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateUser(name, value);
  };

  const handleSubmit = () => {
    localStorage.setItem("userData", JSON.stringify(user));
  };

  return (
    <>
      <Header />
      <div className="profile m-4 d-flex flex-column">
        <div className="avatar d-flex flex-row justify-content-center">
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
              token={user.email}
              userId={user.id}
              username={user.username}
              avatarUrl={user.avatarUrl}
              setIsUserUpdated={() => {}}
            />
          </div>
        </div>
        <div className="profile-body mt-4 d-flex flex-column">
          <label className="d-flex flex-row justify-content-between mb-2">
            <div>Full Name:</div>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter Full Name"
              className="DM_Sans form-control p-2 w-75"
              value={user.fullName}
              onChange={handleInputChange}
            />
          </label>

          <label className="d-flex flex-row justify-content-between mb-2">
            <div>Email:</div>
            <input
              type="text"
              name="email"
              id="email"
              className="DM_Sans form-control p-2 w-75"
              value={user.email}
              onChange={handleInputChange}
              disabled
            />
          </label>
          <label className="d-flex flex-row justify-content-between mb-2">
            Gender:
            <select
              className="dropdown-toggle w-75 DM_Sans d-flex flex-row justify-content-between align-items-center text-secondary btn border dropdown-toggle bg-white p-2"
              name="gender"
              id="gender"
              value={user.gender}
              onChange={handleInputChange}
            >
              <option
                value="Female"
                className="text-center text-secondary DM_Sans fs-6"
              >
                Female
              </option>
              <option
                value="Male"
                className="text-center text-secondary DM_Sans fs-6"
              >
                Male
              </option>
            </select>
          </label>
          <label className="d-flex flex-row justify-content-between mb-2">
            PhoneNumber:
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              className="DM_Sans form-control p-2 w-75"
              value={user.phoneNumber}
              onChange={handleInputChange}
            />
          </label>
          <div className="d-flex justify-content-center">
            <button
              className="btn-first btn border-0 p-2 rounded mt-4 w-50 fw-bold"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
