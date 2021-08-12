import { useEffect, useState } from "react"

const fetchTakeShape = async ()=>{
  try{
    const result = await fetch(
      'YOUR-ENDPOINT-HERE',
      {
        method: 'POST',
        headers: {
          "Authorization": `Bearer YOUR-API-KEY-HERE`
        },
        body: JSON.stringify({
            query: "query {getProductList{items{_id name price}}}"
        })
      }
    )

    const resultJSON =  await result.json()  
    return resultJSON.data.getProductList.items.map(item=>{
      return <li key={item._id}>
                <em>{item.name}</em>: {item.price}
            </li>
    })
  } catch(err){
    console.log(err)
  }
}

function App() {

  const [productList, setProductList] = useState([<li key='KEY'>Loading products...</li>])
  
  useEffect(() => {
    (async()=>{
      setProductList(await fetchTakeShape())
    })()
  }, [])
  return (
    <main>
      <h1>
        Product List:
      </h1>

      <ul>
        {productList}  
      </ul>
    </main>
  );
}

export default App;
