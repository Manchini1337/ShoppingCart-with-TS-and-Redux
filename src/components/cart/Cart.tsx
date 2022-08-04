import classes from './Cart.module.css';
import CartItem from './CartItem';
import storeItems from '../../data/items.json';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleCart,
  selectCartIsVisible,
  selectCartItems,
} from '../../../store';
import { formatCurrency } from '../../utils/formatCurrency';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const isCartVisible = useSelector(selectCartIsVisible);
  const cartItems = useSelector(selectCartItems);
  return (
    <>
      <div
        onClick={() => dispatch(toggleCart())}
        className={isCartVisible ? classes.overlay : classes.overlay__inactive}
      ></div>
      <div
        className={`${classes.container} ${
          isCartVisible ? classes.active : ''
        }`}
      >
        <div className={classes.header}>
          <h2>Cart</h2>
          <button
            className={classes.btn}
            onClick={() => dispatch(toggleCart())}
          >
            x
          </button>
        </div>
        <div className={classes.body}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className={classes.total}>
            Total:{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
