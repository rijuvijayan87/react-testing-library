import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../contants';

const OrderDetails = createContext();

// create custom hooks to check whether we're in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      'useOrderDetails must be called from within an OrderDetailsProvider'
    );
  }
  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionCounts = { ...optionCounts };

    // update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  // utility function to derive totals from optionCOunts state value
  function calculateTotal(optionType) {
    // get an array of counts for option type
    const countsArray = Object.values(optionCounts[optionType]);

    //total the values in the array of counts
    const totalCount = countsArray.reduce(
      (previousCount, currentValue) => (previousCount += currentValue),
      0
    );

    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
