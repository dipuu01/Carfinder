import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/CarCard";
import Pagination from "../components/Pagination"; // 📦 Import Pagination component
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../utils/localStorage";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuel, setFuel] = useState("");
  const [seats, setSeats] = useState("");
  const [wishlist, setWishlist] = useState(getWishlist());
  const [currentPage, setCurrentPage] = useState(1); // 🌐 Pagination State
  const carsPerPage = 10;

  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    fuel: "",
    seats: "",
  });

  useEffect(() => {
    axios
      .get("https://67f82b782466325443ec0ccc.mockapi.io/ape/car/car")
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleWishlist = (car) => {
    if (wishlist.some((item) => item.id === car.id)) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
    setWishlist(getWishlist());
  };

  const handleSearch = () => {
    setFilters({
      search,
      minPrice,
      maxPrice,
      fuel,
      seats,
    });
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredCars = cars.filter((car) => {
    const matchesName = car.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesFuel = filters.fuel
      ? car.fuel.toLowerCase() === filters.fuel.toLowerCase()
      : true;
    const matchesSeats = filters.seats
      ? car.seats === parseInt(filters.seats)
      : true;
    const matchesPrice =
      (!filters.minPrice || car.price >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || car.price <= parseInt(filters.maxPrice));

    return matchesName && matchesFuel && matchesSeats && matchesPrice;
  });

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  return (
    <div className="p-4">
      {/* Search Bar & Filters */}
      {/* <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2"
        />
        <select
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          className="border p-2"
        >
          <option value="">All Fuels</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="border p-2"
        >
          <option value="">All Seats</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7+</option>
        </select>

        // 🔍 Search Button 
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div> */}

<div
  className="relative bg-cover bg-center py-10 h-[650px] mb-10"
  style={{ backgroundImage: "url('/heroimg.jpg')" }} // 🔁 Use your image path here
>
  {/* Overlay for better readability */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Search Filters */}
  <div className="relative z-10 container mx-auto h-full flex items-center justify-center px-10">
    <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
        <select
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">All Fuels</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">All Seats</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7+</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</div>


      {/* Results */}
      {filteredCars.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onToggleWishlist={handleWishlist}
                isWishlisted={wishlist.some((item) => item.id === car.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <p className="text-center mt-10 text-gray-500">
          No cars match your filters.
        </p>
      )}
    </div>
  );
};

export default Home;
