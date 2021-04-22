import './App.css';
import {useQuery} from 'react-query'
import {Drawer, LinearProgress, Grid, Badge} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'

export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string 
  amount: number

}
const getProducts = async (): Promise<CartItemType[]> => 
await (await fetch("https://fakestoreapi.com/products")).json()

function App() {
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts)
  console.log(data)
  if(isLoading)
    return <LinearProgress/>
  if(error)
    return <div> Oops! Something went wrong....</div>
  return (
    <div className="App">
     Start
     
    </div>
  );
}

export default App;
