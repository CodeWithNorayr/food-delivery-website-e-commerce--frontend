import React, { useContext } from 'react';
import './DisplayFood.css';
import DisplayItems from '../DisplayItems/DisplayItems';
import { StoreContext } from '../../context/StoreContext';

const DisplayFood = ({ category, setCategory }) => {
  const { food_list,cartItems,addToCart,removeFromCart } = useContext(StoreContext);

  return (
    <div>
      <div className='display-food'>
        {food_list
          .filter(
            (item) => category === 'All' || item.category === category
          )
          .map((item) => (
            <DisplayItems
              key={item._id}   // ✅ use stable unique key
              id={item._id}
              price={item.price}
              image={item.image}
              description={item.description}
              category={item.category}
              name={item.name}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayFood;
