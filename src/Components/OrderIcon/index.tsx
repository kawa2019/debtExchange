import { FC } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

interface OrderIconProps {
  sortField: string;
  field: string;
  order: string;
}

const OrderIcon: FC<OrderIconProps> = ({ sortField, field, order }) => {
  const isOrderIconSortField = sortField === field;

  return (
    <>
      {order === 'asc' ? (
        <TiArrowSortedDown
          className={`TableHead-OrderIcon ${isOrderIconSortField && 'TableHead-OrderIcon--active'}`}
          size={16}
        />
      ) : (
        <TiArrowSortedUp
          className={`TableHead-OrderIcon ${isOrderIconSortField && 'TableHead-OrderIcon--active'}`}
          size={16}
        />
      )}
    </>
  );
};

export default OrderIcon;
