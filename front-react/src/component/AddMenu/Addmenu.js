import React, { useReducer, useState } from "react";
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import Sidebar from '../../comm/Sidebar/Tsidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import * as menuAPI from "../../lib/api/menu";

const AddCon = styled.div`
    h2 {
        text-align: center;
        font-weight: bold;
    }

    .AddConInput {
        border: none;
        border-bottom: 1px solid gray;
        padding-bottom: 0.5rem;
        outline: none;
        width: 100%;
        margin-top: 3rem;
    }

    .categoryBtn {
        background-color: skyblue;
        margin-top: 0.5rem;
        color: white;
        border: none;
        &:hover {
            background-color: deepskyblue;
        }
    }

    .menuAddBtn {
        background-color: skyblue;
        width: 100%;
        margin-top: 1.5rem;
        padding: 10px;
        color: white;
        border: none;
        &:hover {
            background-color: deepskyblue;
        }
    }
`;

function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value
    }
}

function AddMenu() {
    // function SelectItem(eventKey) {
    //     // console.log(document.querySelector('#dropdown-basic-button').innerHTML=eventKey)
    //     setCategory(e=>eventKey);
    //     console.log(eventKey);
    // }
    
    const changeCat = (eventKey) => {
        setCategory(e=>eventKey);
        console.log(eventKey);
    }

    const [menuCategory, setCategory] = useState("카테고리 선택");
    const [state, dispatch] = useReducer(reducer, {
        menuName: "",
        menuPrice: "",
        categoryName: ""    
    });

    const {
        menuName,
        menuPrice,
        categoryName
    } = state;

    const onChange = e => {
        dispatch(e.target);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = {
                menuCategory,
                menuName,
                menuPrice
            };
            const result = await menuAPI.addMenu(formData);
            console.log(formData);
        }catch (e) {
            const resulterror = e.response.status;
            console.log(resulterror);
        }
    }
    
    // const onCategory = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const formData = {
    //             categoryName
    //         };
    //         const result = await menuAPI.addCategory(formData);
    //         console.log(formData);
    //     }catch (e) {
    //         const resulterror = e.response.status; 
    //         console.log(resulterror);
    //     }
    // }

    return(
        <AddCon>
            <Sidebar>
                <Container fluid className="h-100 w-50 justify-content-center" style={{boxSizing: 'border-box', padding: '0px', margin: '0px',flex: 1}}> 
                    <Row className="p-4 m-1 pt-0 h-100" style={{ flex: 1 }}>
                        <Col className="addMenuCol" md={{ span:8, offset: 8}}>
                            <h2>메뉴추가</h2>
                            <form onSubmit={onSubmit}>
                                <DropdownButton id="dropdown-basic-button" title={menuCategory} name="menuCategory" onSelect={changeCat} onChange={onChange} value={menuCategory}> 
                                    <Dropdown.ItemText>메인</Dropdown.ItemText>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item eventKey="치킨" value="치킨">치킨</Dropdown.Item>
                                    <Dropdown.Item eventKey="피자">피자</Dropdown.Item>
                                    <Dropdown.Item eventKey="햄버거">햄버거</Dropdown.Item>
                                    <Dropdown.Item eventKey="초밥">초밥</Dropdown.Item>
                                    <br/>
                                    <Dropdown.ItemText>사이드</Dropdown.ItemText>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item eventKey="음료">음료</Dropdown.Item>
                                    <Dropdown.Item eventKey="간식">간식</Dropdown.Item>
                                </DropdownButton>
                            
                                <input type="text" placeholder="카테고리 추가" name="categoryName" className="AddConInput" onChange={onChange} value={categoryName}></input><button type="submit" className="categoryBtn">카테고리 추가</button><br/>
                            
                            <input type="text" placeholder="메뉴 이름" name="menuName" className="AddConInput" onChange={onChange} value={menuName}></input><br/>
                            <input type="text" placeholder="메뉴 가격" name="menuPrice" className="AddConInput" onChange={onChange} value={menuPrice}></input><br/>
                            <button className="menuButton" className="menuAddBtn">메뉴 추가</button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </Sidebar>
        </AddCon>
    )
}

export default AddMenu;