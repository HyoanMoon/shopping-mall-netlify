import React, { useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const {productList} = useSelector( (state)=> state.product)
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  const [query] = useSearchParams();

  const searchQuery = query.get("name") || "";

  // 처음 로딩하면 상품리스트 불러오기
  useEffect(()=> {
    dispatch(productActions.getProductList({ name: searchQuery }))
  },[searchQuery])

  return (
    <Container>
      <Row xs={1} md={4} className="g-4">
        {productList && productList.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;


