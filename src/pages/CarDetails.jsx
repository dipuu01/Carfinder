import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../utils/localStorage";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `https://67f82b782466325443ec0ccc.mockapi.io/ape/car/car/${id}`
        );
        setCar(response.data);

        const wishlist = getWishlist();
        setIsWishlisted(wishlist.some((item) => item.id === response.data.id));
      } catch (error) {
        console.error("Failed to fetch car data:", error);
      }
    };

    fetchCar();
  }, [id]);

  const handleWishlistToggle = () => {
    if (!car) return;
    if (isWishlisted) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
    setIsWishlisted(!isWishlisted);
  };

  if (!car) {
    return <div className="text-center p-6 text-gray-600">Loading car details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white rounded shadow">
      <img
        src={"https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"}
        alt={car.name}
        className="w-full h-64 object-cover rounded mb-4 shadow-lg"
      />
      <h2 className="text-2xl font-bold mb-2">{car.name}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {car.description || "No description available."}
      </p>
      <ul className="mb-4 space-y-1">
        <li><strong>Price:</strong> ₹{car.price}</li>
        <li><strong>Fuel Type:</strong> {car.fuel}</li>
        <li><strong>Seating Capacity:</strong> {car.seats}</li>
        <li><strong>Transmission:</strong> {car.transmission || "Not specified"}</li>
      </ul>
      <button
        onClick={handleWishlistToggle}
        className={`px-4 py-2 rounded text-white transition ${
          isWishlisted ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
};

export default CarDetails;
