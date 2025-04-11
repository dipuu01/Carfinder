import { useState, useEffect } from "react";
import { getWishlist, removeFromWishlist } from "../utils/localStorage";
import CarCard from "../components/CarCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleRemove = (car) => {
    removeFromWishlist(car.id);
    setWishlist(getWishlist());
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wishlist.map(car => (
          <CarCard
            key={car.id}
            car={car}
            onToggleWishlist={handleRemove}
            isWishlisted={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
