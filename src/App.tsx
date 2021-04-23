import './App.css';
import {useQuery} from 'react-query'
import {Drawer, LinearProgress, Grid, Badge} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'
import Item from './item/Item'
import { Wrapper, StyledButton } from './App.styles';
import { useState } from 'react';
import Cart from './Cart/Cart';
import CartItem from './CartItem/CartItem';

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

const getCartItems = (cartItems: CartItemType[]) => (
  cartItems.reduce((ack: number, item)=> ack + item.amount, 0)
);

const removeFromCart = (id: number) => null;

function App() {
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const addToCart = (clickedItem: CartItemType) => {
      setCartItems(prev => {
        const isItemInCart = prev.find(item => item.id === clickedItem.id);
        if(isItemInCart){
          return prev.map(item => item.id === clickedItem.id ? {...item, amount: item.amount +1 } : item)
        }
        return [...prev, {...clickedItem, amount: 1}]
      });
  }
  console.log(data)
  if(isLoading)
    return <LinearProgress/>
  if(error)
    return <div> Oops! Something went wrong....</div>
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose = {() => setCartOpen(false)}>
          <Cart cartItems={cartItems}
            addToCart = {addToCart}
            removeFromCart = {removeFromCart}
          />
      </Drawer>
      <StyledButton onClick = {() => setCartOpen(true)}>
        <Badge badgeContent = {getCartItems(cartItems)} color = 'error'>
          <AddShoppingCart/>

        </Badge>

      </StyledButton>
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
