import { removeFromCart } from '../../../store/index';
import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import storeItems from '../../data/items.json';
import { formatCurrency } from '../../utils/formatCurrency';

interface CartItemProps {
  id: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, quantity }) => {
  const dispatch = useDispatch();
  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;

  return (
    <div className={classes.container}>
      <img src={item.imgUrl} alt={item.name} />
      <div className={classes.title}>
        <div>
          {item.name}
          {quantity > 1 && (
            <span className={classes.quantity}>x{quantity}</span>
          )}
        </div>
        <div className={classes.pricing}>{formatCurrency(item.price)}</div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <button
        className={classes.btn__remove}
        onClick={() => dispatch(removeFromCart(item.id))}
      >
        &times;
      </button>
    </div>
  );
};

export default CartItem;
