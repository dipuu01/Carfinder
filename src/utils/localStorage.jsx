export const getWishlist = () => {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
  };
  
  export const addToWishlist = (car) => {
    const current = getWishlist();
    localStorage.setItem("wishlist", JSON.stringify([...current, car]));
  };
  
  export const removeFromWishlist = (id) => {
    const current = getWishlist();
    const updated = current.filter(car => car.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };
  