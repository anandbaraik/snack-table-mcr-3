import React, { useState } from 'react';
import { Logo } from './Logo';
import "./index.css";
import snacks from './data/tableData';
function App() {
  const [tableData, setTableData] = useState(snacks);
  const [initialData, setInitialData] = useState(snacks);
  const [search, setSearch] = useState("");
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
  return (
    <div className='container'>
      <h2>Snack Table</h2>
      <input placeholder='search with products & ingredients' value={search} onChange={handleSearch}/>
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Product Weight</th>
          <th>Price (INR)</th>
          <th>Calories</th>
          <th>Ingredients</th>
        </tr>
        </thead>
        <tbody>
        {
            (tableData?.length > 0) ? (
                tableData?.map((snack) => (
                <tr key={snack.id}>
                    <td>{snack.id}</td>
                    <td>{snack.product_name}</td>
                    <td>{snack.product_weight}</td>
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
