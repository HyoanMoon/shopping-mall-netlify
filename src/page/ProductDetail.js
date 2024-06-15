import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";
import { cartActions } from "../action/cartAction";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const productDetail = useSelector((state) => state.product.productDetail); // 상태 가져오기
  const [size, setSize] = useState("");
  const { user } = useSelector((state) => state.user);

  // ∙상품 디테일 정보 가져오기
  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
  }, [dispatch, id]);

  // ∙사이즈 추가하기
  const selectSize = (value) => {
    setSize(value);
    // 사이즈 에러가 true면 에러를 false
    if (sizeError) setSizeError(false);
  };

  // ∙카트에 추가 버튼
  const addItemToCart = () => {
    // 1.사이즈를 아직 선택안했다면 에러
    if (size === "") {
      setSizeError(true);
      return;
    }
    // 2. 아직 로그인을 안한유저라면 로그인페이지로
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    // 3. 카트에 아이템 추가하기
    dispatch(cartActions.addToCart({ id, size }));
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
          <div className="product-info">
            ₩ {currencyFormat(productDetail.price)}
          </div>
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
                Object.keys(productDetail.stock).map((item) => {
                  const stockCount = productDetail.stock[item];
                  const isDisabled = stockCount <= 0;
                  const stockText =
                    stockCount <= 5 && stockCount > 0
                      ? ` - 재고 ${stockCount}개 남음`
                      : "";

                  return (
                    <Dropdown.Item
                      eventKey={item}
                      key={item}
                      disabled={isDisabled}
                    >
                      {item.toUpperCase()}
                      {stockText && (
                        <div className="warning-message">
                          재고 {stockCount}개 남음
                        </div>
                      )}
                    </Dropdown.Item>
                  );
                })}
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

      {/* 로그인 필요 모달 */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>로그인 필요</Modal.Title>
        </Modal.Header>
        <Modal.Body>이 작업을 수행하려면 로그인이 필요합니다.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/login");
              setShowLoginModal(false);
            }}
          >
            로그인
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductDetail;
