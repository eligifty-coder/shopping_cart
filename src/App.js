import './App.css';
import { Route, BrowserRouter, Switch} from "react-router-dom";
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import CartProvider from './context/CartProvider'

function App() {
  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <Switch>
            
            <Route  path="/cart">
              <Cart />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </CartProvider>
      </BrowserRouter>
    </div >
  );
}

export default App;
