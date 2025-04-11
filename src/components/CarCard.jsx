import React from 'react'
import { Link } from "react-router-dom";

const Carcard = ({ car, onToggleWishlist, isWishlisted }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={"https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"} alt={car.name} className="h-40 w-full object-cover" />
      <h3 className="text-lg font-semibold">{car.name}</h3>
      <p>{car.brand} - {car.fuel} - {car.seats} Seats</p>
      <p className="font-bold">₹{car.price}</p>
      <div className="flex justify-between mt-2">
        <Link to={`/car/${car.id}`} className="text-blue-500">Details</Link>
        <button
          className="text-red-500"
          onClick={() => onToggleWishlist(car)}
        >
          {isWishlisted ? "Remove" : "Wishlist"}
        </button>
      </div>
    </div>
  );
};

export default Carcard
