import axios from "axios"
import { useEffect, useState } from "react"

function Calculator({costItemList}) {
    const [budget, setBudget] = useState(0)
    const [isBudgetCreated, setIsBudgetCreated] = useState(false)
    const storedToken = localStorage.getItem('authToken');


    const loadBudget = () => {
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/budgets`, { headers: { Authorization: `Bearer ${storedToken}`} })
          .then((response) => {
            setBudget(response.data[0].budget) //change when backend is changed to ID
          })
          .catch((error) => {
            console.log("Error fetching budget: ", error)
          })
      }

      const handleSubmitBudget = (e) => {
        e.preventDefault()
        console.log("The save button has been clicked")

        const requestBody = {
          budget
        }

        axios
          .post(`${import.meta.env.VITE_API_URL}/api/costItems`, { headers: { Authorization: `Bearer ${storedToken}`} }, requestBody)
          .then((response) => {
            console.log("Budget created succesfully")
            toast.success("Budget created succesfully")
            setIsBudgetCreated(true)
          })
          .catch((error) => {
            console.log("Error submitting form: ", error)
          })
        
      }

      useEffect(() => {
        //loadBudget()
      })

      return(
        <div>
          {isBudgetCreated ? (
           <form onSubmit={handleSubmitBudget}>
           <label>
             Budget:
             <input 
             type="number"
             name="budget"
             required={true}
             value={budget}
             onChange={(e) => (setBudget(e.target.value))} />
           </label>
           <button type="submit">Save</button>
         </form>
          ) : (
            <form onSubmit={handleSubmitBudget}>
              <label>
                Budget:
                <input 
                type="number"
                name="budget"
                required={true}
                value={budget}
                onChange={(e) => (setBudget(e.target.value))} />
              </label>
              <button type="submit">Save</button>
            </form>
          )}
        </div>
      )



// const [totalCosts, setTotalCosts] = useState(0)


// const calculateTotal = (itemArray) => {
//   const result = itemArray
//     .map((costItem) => {
//       return costItem.price;
//     })
//     .reduce((acc, currentvalue) => {
//       return acc + currentvalue;
//     }, 0);
//   return result;
// };
    
// useEffect(() => {
//     const sumTotal = calculateTotal(costItemList)
//     setTotalCosts(sumTotal)
// }, [totalCosts])




// return (
//     <div>
//         <h3>Total costs: {totalCosts}</h3>

//     </div>
    
// )

}

export default Calculator