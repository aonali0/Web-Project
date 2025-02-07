import React, { useState, useEffect } from 'react';

const ManageFarmers = () => {
  const [farmers, setFarmers] = useState([{
    _id: "67595fa6bdd0c7ea1b0036d4",
    fullName: "Muhammad Umar Abbas",
    email: "malikumar17349@gmail.com",
    password: "$2a$10$OoyJ6rLm9jl2ffaoQeoYQO2b65ZvtZWmUsKj1/ZkjhXSuMZaLSZG6",
    farmName: "malik farm",
    farmAddress: "village dhoke awan po chak akka teh dina distt jhelum",
    city: "DINA / PUNJAB",
    phone: "03495793446",
    role: "farmer",
    __v: 0
  },
  {
    _id: "676b00c0816a3c73c7e0fbcf",
    fullName: "Muhammad Umar",
    email: "malikumar17348@gmail.com",
    password: "$2a$10$EQrNNxeZqaev5kELpM2F1.uKhbKQrmHl/d3lsYEFl8vupvPZoglaa",
    farmName: "malik",
    farmAddress: "village dhoke awan",
    city: "DINA",
    phone: "03468768646",
    role: "farmer",
    __v: 0
  },
  {
    _id: "676b06d0816a3c73c7e0fc7b",
    fullName: "Umar Abbas",
    email: "malik@gmail.com",
    password: "$2a$10$vJI/3wLYqyfwWpDRaqQMruDtHq9patwf7hf6O9xAaIbgx8dil0MA2",
    farmName: "malik farm",
    farmAddress: "awan po chak akka teh dina distt jhelum",
    city: "DINA / PUNJAB",
    phone: "03495793449",
    role: "farmer",
    __v: 0
  },
  {
    _id: "6772b4055f93f342ffdbf313",
    fullName: "qasim",
    email: "qasim@gmail.com",
    password: "$2a$10$y9FYpR85pRHQxdptHMHhUupSt03vhks/lhRECgL/EJsuRwA1N8Xiy",
    farmName: "Qasim farm",
    farmAddress: "F7,Islamabad",
    city: "islamabad",
    phone: "12345678910",
    role: "farmer",
    products: [],
    __v: 0
  },
  {
    _id: "6772b4ff5f93f342ffdbf325",
    fullName: "qasimAli",
    email: "ali@gmail.com",
    password: "$2a$10$MRKkNv7mI4kfxkBSSgiI5OweuBGMrlrUsDV1F81BUYvKsalK6vvW6",
    farmName: "malik haweli",
    farmAddress: "F7",
    city: "islamabad",
    phone: "12345678911",
    role: "farmer",
    products: [],
    __v: 0
  },
  {
    _id: "6772d93f5f93f342ffdbf385",
    fullName: "uzair",
    email: "u@gmail.com",
    password: "$2a$10$aOYw6xOJLbYbz5a/EyVVR.DAzr3/IsT/m4HCNJ83OYqoxdN6Il8he",
    farmName: "Veli",
    farmAddress: "Dina",
    city: "dina",
    phone: "1234544333",
    role: "farmer",
    products: [],
    __v: 0
  },
  {
    _id: "6773247cf8b2293d0217cd9b",
    fullName: "mad Umar Abbas",
    email: "malik21@gmail.com",
    password: "123456789",
    farmName: "haweli",
    farmAddress: "village dhoke awan po chak akka teh dina distt jhelum",
    city: "DINA / PUNJAB",
    phone: "03495793446",
    role: "farmer",
    products: [],
    __v: 0
  },
  {
    _id: "6773a832f8b2293d0217cdbf",
    fullName: "Muhammad Umar Abbas",
    email: "umr@gmail.com",
    password: "123456",
    farmName: "haweli",
    farmAddress: "village dhoke awan po chak akka teh dina distt jhelum",
    city: "DINA / PUNJAB",
    phone: "03495793446",
    role: "farmer",
    products: [],
    __v: 0
  },
  {
    _id: "6773d6d44e29485778224193",
    fullName: "m3",
    email: "m7@gmail.com",
    password: "123456",
    farmName: "3",
    farmAddress: "dxja",
    city: "bxjsab",
    phone: "x kcsa",
    role: "farmer",
    products: [],
    __v: 0
  },
  {
    _id: "6773f101874f0c08a52083fb",
    fullName: "dani",
    email: "dani@gmail.com",
    password: "654321",
    farmName: "dani farm",
    farmAddress: "village dhoke awan po chak akka teh dina distt jhelum",
    city: "DINA / PUNJAB",
    phone: "03495793446",
    role: "farmer",
    products: [],
    __v: 0
  },
  {
    _id: "6775a038ffc5d9fa310094f5",
    fullName: "aon masali",
    email: "aon@gmail.com",
    password: "12345678",
    farmName: "muftian",
    farmAddress: "kal",
    city: "csd",
    phone: "1321123",
    role: "farmer",
    products: [],
    __v: 0
  },
  {
    _id: "6775a06effc5d9fa310094fc",
    fullName: "aon masali",
    email: "a34@gmail.com",
    password: "123456",
    farmName: "muftian",
    farmAddress: "kal",
    city: "csd",
    phone: "1321123",
    role: "farmer",
    products: [],
    __v: 0
  }
]);

  const handleDelete = (id) => {
    const updatedFarmers = farmers.filter((farmer) => farmer._id !== id);
    setFarmers(updatedFarmers);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Panel - Farmer Dashboard</h1>
      <table>
        <thead>
        <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Farm Name</th>
        <th>Farm Address</th>
        <th>City</th>
        <th>Phone</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {farmers.map((farmer) => (
        <tr key={farmer._id}>
          <td>{farmer.fullName}</td>
          <td>{farmer.email}</td>
          <td>{farmer.farmName}</td>
          <td>{farmer.farmAddress}</td>
          <td>{farmer.city}</td>
          <td>{farmer.phone}</td>
          <td>
            <button onClick={() => handleDelete(farmer._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

);
};

export default ManageFarmers;