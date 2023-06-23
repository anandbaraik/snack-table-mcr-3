import React, { useState } from 'react';
import { Logo } from './Logo';
import "./index.css";
import snacks from './data/tableData';
function App() {
  const [tableData, setTableData] = useState(snacks);
  const [initialData, setInitialData] = useState(snacks);
  const [search, setSearch] = useState("");
  const [sortingOrder, setSortingOrder] = useState({
    id:false,
    product_name:false,
    product_weight:false,
    price:false,
    calories: false,
    ingredients: false,
  })
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if(searchValue) {
        const filterData = initialData?.filter(({product_name, ingredients}) => {
            if(product_name.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
            return ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchValue.toLowerCase()));
        });
        setTableData(filterData);
    } else {
        setTableData(initialData);
    }
  }

  const sortBy = (col) => {
    let sortedData = [];
    let orderCopy = {...sortingOrder};
    for (const key in orderCopy) {
        orderCopy[key] = false;
        if(key === col) {
            orderCopy[key] = !sortingOrder[key];
        }
    }
    setSortingOrder(orderCopy);
    if(col === 'id') {
        sortedData = sortingOrder.id ? [...initialData]?.sort((a, b) => a?.id - b?.id) : [...initialData]?.sort((a, b) => b?.id - a?.id) ;
    } else if (col === 'product_name') {
        sortedData = sortingOrder.product_name ? [...initialData]?.sort((a, b) => a.product_name.localeCompare(b.product_name)) : [...initialData]?.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else if (col === 'product_weight') {
        sortedData = sortingOrder.product_weight ? [...initialData]?.sort((a, b) => a?.product_weight - b?.product_weight) : [...initialData]?.sort((a, b) => b?.product_weight - a?.product_weight);
    } else if (col === 'price') {
        sortedData = sortingOrder.price ? [...initialData]?.sort((a, b) => a?.price - b?.price) : [...initialData]?.sort((a, b) => b?.price - a?.price);
    } else if (col === 'calories') {
        sortedData = sortingOrder.calories ? [...initialData]?.sort((a, b) => a?.calories - b?.calories) : [...initialData]?.sort((a, b) => b?.calories - a?.calories);
    }
    setTableData(sortedData);
  }
  return (
    <div className='container'>
      <h2>Snack Table</h2>
      <input placeholder='search with products & ingredients' value={search} onChange={handleSearch}/>
      <table>
      <thead>
        <tr>
          <th onClick={() => { sortBy('id')}}>
            ID
            {
                sortingOrder.id ? ' ↑' : ' ↓'
            }
        </th>
          <th onClick={() => sortBy('product_name')}>
            Product Name
            {
                sortingOrder.product_name ? ' ↑' : ' ↓'
            }
        </th>
          <th onClick={() => sortBy('product_weight')}>
            Product Weight {
                sortingOrder.product_weight ? ' ↑' : ' ↓'
            }
            </th>
          <th onClick={() => sortBy('price')}>
            Price (INR) {
                sortingOrder.price ? ' ↑' : ' ↓'
            }
            </th>
          <th onClick={() => sortBy('calories')}>
            Calories {
                sortingOrder.calories ? ' ↑' : ' ↓'
            }
            </th>
          <th>
            Ingredients
        </th>
        </tr>
        </thead>
        <tbody>
        {
            (tableData?.length > 0) ? (
                tableData?.map((snack) => (
                <tr key={snack.id}>
                    <td>{snack.id}</td>
                    <td>{snack.product_name}</td>
                    <td>{snack.product_weight} {'g'}</td>
                    <td>{snack.price}</td>
                    <td>{snack.calories}</td>
                    <td>{snack.ingredients.join(", ")}</td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={6}>
                        Search products not found!
                    </td>
                </tr>
            )
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;
