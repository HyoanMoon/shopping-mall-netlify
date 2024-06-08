import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const navigate = useNavigate();
  const productDetail = useSelector((state) => state.product.productDetail); // 상태 가져오기

  useEffect(() => {
    // 상품 디테일 정보 가져오기
    dispatch(productActions.getProductDetail(id));
  }, [dispatch, id]);

  const addItemToCart = () => {
    // 사이즈를 아직 선택안했다면 에러
    // 아직 로그인을 안한유저라면 로그인페이지로
    // 카트에 아이템 추가하기
  };

  const selectSize = (value) => {
    // 사이즈 추가하기
    setSize(value);
    setSizeError(false);
  };

  // productDetail이 null이거나 undefined인 경우
  if (!productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img
            src={productDetail.image}
            className="w-100"
            alt={productDetail.name}
          />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{productDetail.name}</div>
          <div className="product-info">₩ {currencyFormat(productDetail.price)}</div>
          <div className="product-info">{productDetail.description}</div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
            >
              {size === "" ? "사이즈 선택" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {Object.keys(productDetail.stock || {}).length > 0 &&
                Object.keys(productDetail.stock).map((item) =>
                  productDetail.stock[item] > 0 ? (
                    <Dropdown.Item eventKey={item} key={item}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item eventKey={item} key={item} disabled={true}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  )
                )}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "사이즈를 선택해주세요."}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
