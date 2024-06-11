import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/paymentPage.style.css";

const OrderCompletePage = () => {
  const {orderNum} = useSelector((state) => state.order)
  //만약 주문번호가 없는상태로 이페이지에 왔다면 다시 메인페이지로 돌아가기
  if(orderNum === "") {
    return <Container className="confirmation-page">
      <h1>We could not complete your order</h1>
      <div>
        Return to Home page
        <Link to={"/"}> Home page</Link>
      </div>

    </Container>
  }
  return (
    <Container className="confirmation-page">
      <img
        src="/image/greenCheck.png"
        width={100}
        className="check-image"
        alt="greenCheck.png"
      />
      <h1>Thank you for order!</h1>
      <div>Order Number: {orderNum}</div>
      <div>
      To confirm your order, please check the My account.
        <div className="text-align-center">
          <Link to={"/account/purchase"}>My account</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletePage;
