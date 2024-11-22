import React, { useState, useEffect } from "react";

const EditProfilePage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [farmName, setFarmName] = useState(""); // For vendors
  const [phoneNumber, setPhoneNumber] = useState(""); // For vendors
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch the current user details (assuming the API endpoint provides this)
  useEffect(() => {
    fetch("http://localhost:5000/current-user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch user details");
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
        setName(data.user.name);
        setEmail(data.user.email);
        setRole(data.user.role);
        if (data.user.role === "vendor") {
          setFarmName(data.user.farm_name || "");
          setPhoneNumber(data.user.phone_number || "");
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { name, email };
    if (role === "vendor") {
      updatedData.farm_name = farmName;
      updatedData.phone_number = phoneNumber;
    }

    fetch(`http://127.0.0.1:5000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update user details");
        return response.json();
      })
      .then((data) => {
        setMessage("User details updated successfully");
        setError("");
        setUser(data.user);
      })
      .catch((err) => {
        setMessage("");
        setError(err.message);
      });
  };

  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {role === "vendor" && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Farm Name</label>
              <input
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
