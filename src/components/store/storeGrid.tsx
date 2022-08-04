import classes from './storeGrid.module.css';
import storeItems from '../../data/items.json';
import StoreItem from './StoreItem';

const StoreGrid: React.FC = () => {
  return (
    <div className={classes.grid}>
      {storeItems.map((item) => (
        <StoreItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default StoreGrid;
