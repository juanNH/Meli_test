import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import "./Item.scss";
export const Item = ({id, picture, price, title, condition, free_shipping }) => {
  const navigate = useNavigate();

  return (
    <div className="product-item" onClick={()=>navigate(`/items/${id}`)}>
      <div className="product-image">
        <img src={picture} alt="Producto 1" />
      </div>
      <div className="product-details">
        <div className="product-title">${price}{free_shipping}</div>
        <div className="product-description">{title}</div>
      </div>
      <div className="product-price">{condition}</div>
    </div>
  );
};

Item.propTypes = {
  id:PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  free_shipping: PropTypes.bool.isRequired,
};
