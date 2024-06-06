import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
  };

  return (
    <div className="card" onClick={() => showProduct(product._id)}>
      <img src={product.image} alt={product.name} />
      <div>{product.name}</div>
      <div>{currencyFormat(product.price)}</div>
    </div>
  );
};

export default ProductCard;