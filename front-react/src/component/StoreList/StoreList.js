import React from 'react';
import {Link} from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap';

function StoreList({ user }) {
console.log(user)
  return (
    <div
      style={{ height: '100%', maxWidth: '1024px' }}
      className="row w-100 justify-content-center align-items-center mx-auto"
    >
      <Row className="w-100">
        <Col className="w-100">
          <h4 className="text-center mb-5" style={{ color: 'rgb(62,78,93)' }}>
            {user.username}님의 가게 목록
          </h4>
          <Row className="w-100 justify-content-center align-items-center m-0">
            {user.store.map((i) => {
              return (
                <Col md={2} className="text-center mb-2">
                  <Button
                    className="btn_color_purple"
                    style={{
                      height: '15vh',
                      width: '100%',
                      fontSize: '0.8em',
                    }}
                  >
                    <p className="mb-1">{i.name}</p>
                    <p
                      style={{
                        color: 'rgb(220,220,220)',
                        display: 'block',
                        padding: 0,
                        margin: 0,
                        fontSize: '0.5em',
                        lineHeight: '100%',
                      }}
                    >
                   {new Date(i.publishedDate).getFullYear()+"."+
                        (new Date(i.publishedDate).getMonth()+1)+"."+
                        new Date(i.publishedDate).getDate()
                      }
                    </p>

                    <p
                      style={{
                        color: 'rgb(180,180,180)',
                        display: 'block',
                        padding: 0,
                        margin: 0,
                        fontSize: '0.5em',
                        lineHeight: '100%',
                      }}
                    >
                      ({new Date(i.expiredDate).getFullYear()+"."+
                        (new Date(i.expiredDate).getMonth()+1)+"."+
                        new Date(i.expiredDate).getDate()
                      })
                    </p>
                  </Button>
                </Col>
              );
            })}
            <Col md={2} className="text-center mb-2 ">
              <Link to="/storeAdd">
                <Button
                  className=""
                  style={{
                    boxShadow: '5px 5px 10px 1px rgb(190,190,190)',
                    borderRadius: '10px 10px',
                    border: 'none',
                    backgroundColor: 'rgb(222,222,231)',
                    height: '15vh',
                    width: '100%',
                  }}
                >
                  +
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default StoreList;
