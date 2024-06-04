import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import { productActions } from "../action/productAction";
import { CATEGORY, STATUS, SIZE } from "../constants/product.constants";
import "../style/adminProduct.style.css";
import * as types from "../constants/product.constants";
import { commonUiActions } from "../action/commonUiAction";
import { image } from "@cloudinary/url-gen/qualifiers/source";

const InitialFormData = {
  name: "",
  sku: "",
  stock: {},
  image: "",
  description: "",
  category: [],
  status: "active",
  price: 0,
};
const NewItemDialog = ({ mode, showDialog, setShowDialog }) => {
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const { error } = useSelector((state) => state.product);

  const [formData, setFormData] = useState(
    mode === "new" ? { ...InitialFormData } : selectedProduct
  );
  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();
  const [stockError, setStockError] = useState(false);
  

  const handleClose = () => {
    //모든걸 초기화시키고;
    // 다이얼로그 닫아주기
    setFormData({ ...InitialFormData });
    setStock([]);
    setStockError(false);
    setShowDialog(false);
   
    

  };

  const handleSubmit = (event) => {
    event.preventDefault();
   

    //재고를 입력했는지 확인, 아니면 에러
    if(stock.length === 0) {
      return setStockError(true);
    }
    // 재고를 배열에서 객체로 바꿔주기
    const totalStock = stock.reduce((total,item)=> {
      return {...total, [item[0]]:parseInt(item[1]) }
    },{}) 
  
    // [['M',2]] 에서 {M:2}로
    if (mode === "new") {
      //새 상품 만들기
      dispatch(productActions.createProduct({...formData,stock:totalStock}));
      setFormData({ ...InitialFormData });
      setStock([]);
      setShowDialog(false)
    
    } else {
      // 상품 수정하기
    }
  };

  const handleChange = (event) => {
    //form에 데이터 넣어주기
    const{id,value} = event.target;
    setFormData({...formData, [id]:value});

  };

  const addStock = () => {
    //재고타입 추가시 배열에 새 배열 추가
    setStock([...stock,[]]);

  };

  const deleteStock = (idx) => {
    //재고 삭제하기
    const newStock = stock.filter((item,index)=> index !== idx) // stock에 있는 인덱스가 내가 삭제하려는 인덱스와 같지 않은것만 추출하여 새로운 배열을 생성
    setStock(newStock);
  };

  const handleSizeChange = (value, index) => {
    //  재고 사이즈 변환하기 => [[s,3], [m,4],[xl,5]] -> [[xl,2], [s,4],[xl,5]] 변경하려면 변경하고 싶은 value와 그게 몇번째 인덱스인지를 알아서 변경하기
    const newStock = [...stock];
    newStock[index][0] = value // 인덱스의 0번째 그게 사이즈!
    setStock(newStock);
    
  };

  const handleStockChange = (value, index) => {
    //재고 수량 변환하기
    const newStock = [...stock];
    newStock[index][1] = value // 인덱스의 0번째 그게 사이즈!
    setStock(newStock);
  };

  const onHandleCategory = (event) => {
    // 카테고리가 이미 추가되어 있으면 제거 
    if (formData.category.includes(event.target.value)) {
      const newCategory = formData.category.filter(
        (item) => item !== event.target.value
      );
      setFormData({
        ...formData,
        category: [...newCategory],
      });
    } else {
      // 아니면 새로 추가 
      setFormData({
        ...formData,
        category: [...formData.category, event.target.value],
      });
    }
  };

  const uploadImage = (url) => {
    //이미지 업로드
    setFormData({...formData, image: url});
  };

  useEffect(() => {
    if (showDialog) {
      if (mode === "edit") {
        // 선택된 데이터값 불러오기 (재고 형태 객체에서 어레이로 바꾸기)
      } else {
        // 초기화된 값 불러오기
      }
    }
  }, [showDialog]);

  //에러나면 토스트 메세지 보여주기

  return (
    <Modal show={showDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        {mode === "new" ? (
          <Modal.Title>Create New Product</Modal.Title>
        ) : (
          <Modal.Title>Edit Product</Modal.Title>
        )}
      </Modal.Header>

      <Form className="form-container" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="sku">
            <Form.Label>Sku</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Enter Sku"
              required
              value={formData.sku}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="string"
              placeholder="Name"
              required
              value={formData.name}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="string"
            placeholder="Description"
            as="textarea"
            onChange={handleChange}
            rows={3}
            value={formData.description}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="stock">
          <Form.Label className="mr-1">Stock</Form.Label>
          {stockError && (
            <span className="error-message">재고를 추가해주세요</span>
          )}
          <Button size="sm" onClick={addStock}>
            Add +
          </Button> 
          <div className="mt-2">
            {stock.map((item, index) => (
              <Row key={`${index}${item[0]}`}>
                <Col sm={4}>
                  <Form.Select
                    onChange={(event) =>
                      handleSizeChange(event.target.value, index)
                    }
                    required
                    defaultValue={item[0] ? item[0].toLowerCase() : ""}
                  >
                    <option value="" disabled selected hidden>
                      Please Choose...
                    </option>
                    {SIZE.map((item, index) => (
                      <option
                        invalid="true"
                        value={item.toLowerCase()}
                        disabled={stock.some(
                          (size) => size[0] === item.toLowerCase()
                        )}
                        key={index}
                      >
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Form.Control
                    onChange={(event) =>
                      handleStockChange(event.target.value, index)
                    }
                    type="number"
                    placeholder="number of stock"
                    value={item[1]}
                    required
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteStock(index)}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Image" required>
          <Form.Label>Image</Form.Label>
          <CloudinaryUploadWidget uploadImage={uploadImage} />

          <img
            id="uploadedimage"
            src={formData.image}
            className="upload-image mt-2"
            alt="uploadedimage"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={formData.price}
              required
              onChange={handleChange}
              type="number"
              placeholder="0"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              multiple
              onChange={onHandleCategory}
              value={formData.category}
              required
            >
              {CATEGORY.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={handleChange}
              required
            >
              {STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        {mode === "new" ? (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Edit
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default NewItemDialog;
