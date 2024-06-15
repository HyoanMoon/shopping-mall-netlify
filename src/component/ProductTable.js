import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../utils/number";

const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeleteButtonClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedItem) {
      deleteItem(selectedItem._id);
      setShowModal(false);
      setSelectedItem(null);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.sku}</td>
                <td style={{ minWidth: "100px" }}>{item.name}</td>
                <td>{currencyFormat(item.price)}</td>
                <td>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size]}
                    </div>
                  ))}
                </td>
                <td>
                  <img src={item.image} width={100} alt="image" />
                </td>
                <td>{item.status}</td>
                <td style={{ minWidth: "100px" }}>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteButtonClick(item)}
                    className="mr-1"
                  >
                    Remove
                  </Button>
                  <Button size="sm" onClick={() => openEditForm(item)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={header.length}>No Data to show</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && `${selectedItem.name}을 삭제하시겠습니까?`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductTable;
