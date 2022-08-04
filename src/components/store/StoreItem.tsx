import { formatCurrency } from '../../utils/formatCurrency';
import classes from './StoreItem.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
} from '../../../store/index';

interface StoreItemProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

const StoreItem: React.FC<StoreItemProps> = ({ id, name, price, imgUrl }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const quantity = cartItems.find((item) => item.id === id)?.quantity || 0;
  console.log(quantity);
  return (
    <div className={classes.card}>
      <div className={classes.imgContainer}>
        <img src={imgUrl} alt={name} />
      </div>
      <div className={classes.body}>
        <div className={classes.title}>
          <span className={classes.name}>{name}</span>
          <span className={classes.price}>{formatCurrency(price)}</span>
        </div>
        <div className={classes.action}>
          {quantity === 0 ? (
            <button
              className={classes.buttonWide}
              onClick={() => {
                dispatch(increaseCartQuantity(id));
              }}
            >
              + Add to cart
            </button>
          ) : (
            <div className={classes.btns}>
              <div className={classes.actionButtons}>
                <button
                  className={classes.btn}
                  onClick={() => {
                    dispatch(decreaseCartQuantity(id));
                  }}
                >
                  -
                </button>
                <div>
                  <span className={classes.quantity}>{quantity}</span> in cart
                </div>
                <button
                  className={classes.btn}
                  onClick={() => {
                    dispatch(increaseCartQuantity(id));
                  }}
                >
                  +
                </button>
              </div>
              <button
                className={classes.btn_danger}
                onClick={() => {
                  dispatch(removeFromCart(id));
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
