import './App.css';
import {useQuery} from 'react-query'
import {Drawer, LinearProgress, Grid, Badge} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import Item from './item/Item'
import { Wrapper } from './App.styles';

export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string 
  amount: number

}

const addToCart = () => null;

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
    <Wrapper>
      <Grid container spacing = {3}>
        {data?.map((item) => {
         return  <Grid item key={item.id} xs={12} sm={4}>
            <Item item = {item} addToCart = {addToCart}>
            </Item> 
          </Grid>
})}
      </Grid>
    </Wrapper>
  );
}

export default App;
