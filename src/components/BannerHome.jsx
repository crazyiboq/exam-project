import React, { useState } from 'react';
import { FiTruck, FiSearch } from 'react-icons/fi';
import { bannerStyles } from '../assets/dummyStyles';
import { useNavigate } from 'react-router-dom';
import { features } from '../assets/Dummy';

import BannerFood from '../assets/FoodBanner.png'
const BannerHome = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => setSearchTerm(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if(trimmedTerm) {
      if(onSearch) {
        const searchWords = trimmedTerm.toLowerCase().split(/\s+/)
        onSearch(searchWords.join(' '))
      }
      else {
         navigate(`/items?search=${encodeURIComponent(trimmedTerm)}`)
      }
      setSearchTerm('')
    }
  }
  return (
    <div className="relative overflow-hidden pt-16">
      <div className="bg-gradient-to-r from-green-100 to-green-200 min-h-[400px]">
        {/* Decorative circles */}
        <div className="hidden sm:block absolute top-6 left-6 w-20 h-20 rounded-full bg-teal-100 opacity-30"></div>
        <div className="hidden md:block absolute bottom-12 right-28 w-32 h-32 rounded-full bg-green-200 opacity-30"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-teal-200 opacity-30"></div>

        <div className="relative z-10 mt-8 sm:mt-10 lg:mt-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* LEFT CONTENT */}
            <div className="text-center md:text-left">
              <div className="bg-white inline-block px-3 py-1 rounded-full shadow text-gray-800 text-sm sm:text-base mb-4">
                <span className="flex items-center">
                  <FiTruck className="mr-2" /> 500₼ üzərində bütün alış-verişlərə pulsuz çatdırılma
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                Fresh <span className="italic text-green-600">Groceries</span><br />Delivered to Your Door
              </h1>
              <p className="text-gray-700 text-base sm:text-lg max-w-lg">
                Discover the freshest produce, top-quality meats, and pantry essentials — all
                delivered within 1 min.
              </p>

<form
  onSubmit={handleSubmit}
  className="mt-10 mb-8 flex items-center w-full max-w-md bg-black bg-opacity-30 rounded-full shadow overflow-hidden"
>
  <input
    type="text"
    value={searchTerm}
    onChange={handleSearch}
    placeholder="Search for fruits, vegetables, meats, dairy..."
    className="flex-grow px-4 py-3 text-sm text-white placeholder:text-gray-300 bg-transparent focus:outline-none"
  />
  <button
    type="submit"
    className="px-4 py-3 bg-green-500 text-white rounded-r-full hover:bg-green-600 transition"
  >
    <FiSearch className="h-5 w-5" />
  </button>
</form>

              <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                {features.map(( f, i) => (
                  <div key={i} className={bannerStyles.featureItem}>
                    <div className='text-teal-600 mb-1'>{f.icon}</div>
                    <span className={bannerStyles.featureText}>
                      {f.text}
                    </span>

                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className=' relative flex justify-center'>
              <div className={bannerStyles.imageContainer}>
                <div className={bannerStyles.imageInner}>
                  <img src={BannerFood} alt="Banner" className=' object-cover w-full h-full' />
                </div>
              </div>

              <div className="hidden sm:block absolute -top-4 -right-4 w-20 h-20 rounded-full bg-mint-200 opacity-20"></div>
              <div className="hidden md:block absolute -bottom-4 -left-4 w-28 h-28 rounded-full bg-teal-100 opacity-20"></div>
              <div className="hidden lg:block absolute top-1/4 -left-6 w-20 h-20 rounded-full bg-seafoam-100 opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BannerHome;
