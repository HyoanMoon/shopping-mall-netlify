import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const { productList, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const searchQuery = query.get("name") || "";
  const category = query.get("category") || "";

  // 처음 로딩하거나 URL 파라미터가 변경될 때 상품 리스트 다시 불러오기
  useEffect(() => {
    dispatch(productActions.getProductList({ name: searchQuery, category }));
  }, [searchQuery, category, dispatch]);

  // 필터링된 상품 리스트
  const filteredProductList = productList.filter(
    (product) => product.status !== "disactive"
  );

  return (
    <Container>
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="my-3">
          {error}
        </Alert>
      )}
      {filteredProductList.length === 0 && !loading && (
        <Alert variant="info" className="my-3">
          검색 결과가 없습니다.
        </Alert>
      )}
      <Row xs={1} md={4} className="g-4">
        {filteredProductList.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;
