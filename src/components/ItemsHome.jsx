import React, { useEffect, useState } from 'react';
import { itemsHomeStyles } from '../assets/dummyStyles';
import BannerHome from './BannerHome';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { FaMinus, FaShoppingCart, FaThList, FaPlus } from 'react-icons/fa';
import { categories, products } from '../assets/dummyData';

const ItemsHome = () => {
  const [activeCategory, setActiveCategory] = useState(
    () => localStorage.getItem('activeCategory') || 'All'
  );

  useEffect(() => {
    localStorage.setItem('activeCategory', activeCategory);
  }, [activeCategory]);

  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const productMatchesSearch = (product, term) => {
    if (!term) return true;
    const clean = term.trim().toLowerCase();
    return clean
      .split(/\s+/)
      .every(word => product.name.toLowerCase().includes(word));
  };

  const searchedProducts = searchTerm
    ? products.filter(p => productMatchesSearch(p, searchTerm))
    : activeCategory === 'All'
      ? products
      : products.filter(
          p => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  const getQuantity = id => {
    const item = cart.find(ci => ci.id === id);
    return item ? item.quantity : 0;
  };

  const handleIncrease = product => addToCart(product, 1);
  const handleDecrease = product => {
    const qty = getQuantity(product.id);
    qty > 1
      ? updateQuantity(product.id, qty - 1)
      : removeFromCart(product.id);
  };

  const handleSearch = term => setSearchTerm(term);

  const sidebarCategories = [
    { name: 'All Items', value: 'All', icon: <FaThList className='text-lg' /> },
    ...categories.map(c => ({ ...c, value: c.name }))
  ];

  const handleImgError = e => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = process.env.PUBLIC_URL + '/images/fallback.jpg';
  };

  return (
    <div className={itemsHomeStyles.page}>
      <BannerHome onSearch={handleSearch} />
      <div className='flex flex-col lg:flex-row flex-1'>
        <aside className={itemsHomeStyles.sidebar}>
          <div className={itemsHomeStyles.sidebarHeader}>
            <h1 className={itemsHomeStyles.sidebarTitle}>Fresh cart</h1>
            <div className={itemsHomeStyles.sidebarDivider} />
          </div>
          <ul className={itemsHomeStyles.categoryList}>
            {sidebarCategories.map(cat => (
              <li key={cat.name}>
                <button
                  onClick={() => {
                    setActiveCategory(cat.value);
                    setSearchTerm('');
                  }}
                  className={`${itemsHomeStyles.categoryItem} ${
                    activeCategory === cat.value && !searchTerm
                      ? itemsHomeStyles.activeCategory
                      : itemsHomeStyles.inactiveCategory
                  }`}
                >
                  <span className={itemsHomeStyles.categoryIcon}>{cat.icon}</span>
                  <span className={itemsHomeStyles.categoryName}>
                    {cat.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className={itemsHomeStyles.mainContent}>
          <div className={itemsHomeStyles.mobileCategories}>
            {sidebarCategories.map(cat => (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setSearchTerm('');
                }}
                className={`${
                  activeCategory === cat.value && !searchTerm
                    ? itemsHomeStyles.activeMobileCategory
                    : itemsHomeStyles.inactiveMobileCategory
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {searchTerm && (
            <div className={itemsHomeStyles.searchResults}>
              <span className='text-emerald-700 font-medium'>
                Search results for: <span className='font-bold'>"{searchTerm}"</span>
              </span>
              <button
                onClick={() => setSearchTerm('')}
                className='ml-4 text-emerald-500 hover:text-shadow-emerald-700 p-1 rounded-full'
              >
                <span className='text-sm bg-emerald-100 px-2 py-1 rounded-full'>
                  Clear
                </span>
              </button>
            </div>
          )}

          <div className={itemsHomeStyles.sectionDivider} />
          <h2 className={itemsHomeStyles.sectionTitle}>
            {searchTerm
              ? 'Search Results'
              : activeCategory === 'All'
              ? 'Featured Products'
              : `Best ${activeCategory}`}
          </h2>

          <div className={itemsHomeStyles.productsGrid}>
            {searchedProducts.length > 0 ? (
              searchedProducts.map(product => {
                const qty = getQuantity(product.id);
                return (
                  <div key={product.id} className={itemsHomeStyles.productCard}>
                    <div className={itemsHomeStyles.imageContainer}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={itemsHomeStyles.productImage}
                        onError={handleImgError}
                      />
                    </div>
                    <div className={itemsHomeStyles.productContent}>
                      <h3 className={itemsHomeStyles.productTitle}>
                        {product.name.trim()}
                      </h3>
                      <div className={itemsHomeStyles.priceContainer}>
                        <p className={itemsHomeStyles.currentPrice}>
                          {product.price.toFixed(2)}
                        </p>
                        <span className={itemsHomeStyles.oldPrice}>
                          {('' + (product.price * 1.2).toFixed(2))}
                        </span>
                      </div>
                      {qty === 0 ? (
                        <button
                          onClick={() => handleIncrease(product)}
                          className={itemsHomeStyles.addButton}
                        >
                          <FaShoppingCart className='mr-2' /> Add
                        </button>
                      ) : (
                        <div className={itemsHomeStyles.quantityControls}>
                          <button
                            onClick={() => handleDecrease(product)}
                            className={itemsHomeStyles.quantityButton}
                          >
                            <FaMinus />
                          </button>
                          <span className='font-bold'>{qty}</span>
                          <button
                            onClick={() => handleIncrease(product)}
                            className={itemsHomeStyles.quantityButton}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={itemsHomeStyles.noProducts}>
                <div className={itemsHomeStyles.noProductsText}>
                  Duz girde Xiyar
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ItemsHome;
