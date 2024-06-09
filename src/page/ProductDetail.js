import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";
import { cartActions } from "../action/cartAction";

  const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const navigate = useNavigate();
  const productDetail = useSelector((state) => state.product.productDetail); // 상태 가져오기
  const [size, setSize] = useState("");
  const {user} = useSelector((state) => state.user);

  // ∙상품 디테일 정보 가져오기
  useEffect(() => {
      dispatch(productActions.getProductDetail(id));
  }, [dispatch, id]);

  // ∙사이즈 추가하기
  const selectSize = (value) => {
    setSize(value);
    // 사이즈 에러가 true면 에러를 false
    if(sizeError) setSizeError(false);
    // console.log(value) => 누르는 대로 s, m, l...
  };

  // ∙카드에 추가 버튼
  const addItemToCart = () => {
    // 1.사이즈를 아직 선택안했다면 에러
    if( size === ""){
      setSizeError(true)
      return
    }
    // 2. 아직 로그인을 안한유저라면 로그인페이지로
    if(!user) {
      alert("로그인이 필요합니다")
      navigate("/login")
    };
    // 3. 카트에 아이템 추가하기
    dispatch(cartActions.addToCart({ id,size }))
  };

  // ❕productDetail이 null이거나 undefined인 경우
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
