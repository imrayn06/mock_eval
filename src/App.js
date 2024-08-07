import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';


  const App = ()=>{
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    useEffect(()=>{
      axios.get('https://fakestoreapi.com/products')
      .then(response=>{
        setProducts(response.data)
        setLoading(false)
      })
      .catch(error=>{
        console.log("error",error)
        setLoading(false)
      })
    },[])

    const handleCategoryChange = (e)=>{
      setCategory(e.target.value)
    }
    const handleSearchChange=(e)=>{
      setSearch(e.target.value)
    }
    const filteredProducts = products.filter(product =>{
      return product.category === category && product.title.toLowerCase().includes(search.toLowerCase())
    })

  
  return (
    <div>
      <h1>Product List</h1>
      <div>
        <input type="text" 
        value={search} 
        onChange={handleSearchChange} 
        placeholder="Search"/>
        <select value={category} onChange={handleCategoryChange}>
        <option value="">Categories</option>
        {Array.from(new Set(products.map(product => product.category))).map(cat=>(
          <option key={cat} value={cat}>{cat}</option>
        ))}
        </select>
      </div>
      {loading ?(
        <p>Loading</p>
        ):(
          <div>
            {filteredProducts.map(product=>(
              <div key={product.id}>
                <img className='p_image' alt={product.title} src = {product.image}/>
                <h2>{product.title}</h2>
                <p>Price: {product.price}</p>
                <p>Category: {product.category}</p>
              </div>
            ))}
    </div>

  )}
</div>
  )
}

export default App;
