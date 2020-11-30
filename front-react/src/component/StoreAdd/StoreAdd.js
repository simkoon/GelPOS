import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Form } from 'react-bootstrap';

function StoreAdd({ onChange, onSubmit, inputs }) {
  const { storename, regnumber, address } = inputs;
  return (
    <Row
      className="w-100 h-100 justify-content-center align-items-center mx-auto px-3"
      style={{
        maxWidth: '512px',
      }}
    >
      <Form
        className="w-100 p-5"
        style={{
          backgroundColor: 'white',
          borderRadius: '20px 20px',
        }}
      >
        <h2
          className="text-center mb-5"
          style={{
            color: 'rgb(67,86,103)',
          }}
        >
          +가게추가
        </h2>
        <Form.Group controlId="formBasicStoreName">
          <Form.Label
            style={{
              color: 'rgb(67,86,103)',
            }}
          >
            ● 가게 상호
          </Form.Label>
          <Form.Control
            name="storename"
            className="mb-4"
            type="text"
            placeholder="내용을 입력해주세요."
            style={{
              borderColor: 'rgb(67,86,103)',
              borderRadius: '20px 20px',
              color: 'rgb(67,86,103)',
            }}
            onChange={onChange}
            value={storename}
          />
        </Form.Group>
        <Form.Group controlId="formBasicStoreName">
          <Form.Label
            style={{
              color: 'rgb(67,86,103)',
            }}
          >
            ● 사업자 등록 번호
          </Form.Label>
          <Form.Control
            className="mb-4"
            name="regnumber"
            type="text"
            placeholder="내용을 입력해주세요."
            style={{
              borderColor: 'rgb(67,86,103)',
              borderRadius: '20px 20px',
              color: 'rgb(67,86,103)',
            }}
            onChange={onChange}
            value={regnumber}
          />
        </Form.Group>
        <Form.Group controlId="formBasicStoreName">
          <Form.Label
            style={{
              color: 'rgb(67,86,103)',
            }}
          >
            ● 가게 주소
          </Form.Label>
          <Form.Control
            className="mb-4"
            type="text"
            name="address"
            placeholder="내용을 입력해주세요."
            style={{
              borderColor: 'rgb(67,86,103)',
              borderRadius: '20px 20px',
              color: 'rgb(67,86,103)',
            }}
            onChange={onChange}
            value={address}
          />
          <p className="text-center">관리자 승인 후 사용 가능합니다.</p>
        </Form.Group>
        <Form.Row className=" mx-auto">
          <Link to="/storeList">
            <Button className="btn_color_purple" variant="primary">
              이전으로
            </Button>
          </Link>
          <Button
            className="ml-auto btn_color_purple"
            variant="primary"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Form.Row>
      </Form>
    </Row>
  );
}
export default StoreAdd;
