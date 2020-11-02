import React from 'react';
import styled from 'styled-components';
import tableO from './tableImg/tableO.png';
import tableX from './tableImg/tableX.png';

const TtableContainer = styled.div`
    display: block;
    width: 1600px;
    height: 1080px;
    float: left;
`

const TtableInbox = styled.div`
    width: 70%;
    height: 80%;
    margin: 150px auto;

    .tableBoxCon {
        width: 260px;
        height: 260px;
        background-image: url('${tableO}');
        margin: 0 10px 25px;
        float: left;
    }

    .tableBoxCon h2 {
        color: white;
        text-align: center;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .tableBoxCon .tableBoxMenus {
        color: white;
        text-align: center;
        margin: 5px 10px 5px 0;
    }

    .tableBoxCon .tableBoxUptime {
        color: white;
        text-align: center;
        margin-right: 10px;
        position: relative;
        top: 20%;
    }

`

function Ttables({children}) {
    return(
        <TtableContainer>
            <TtableInbox>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                    <p className="tableBoxMenus">메뉴 이름 (1개)</p>
                    <p className="tableBoxMenus">메뉴 이름 (1개)</p>
                    <p className="tableBoxMenus">메뉴 이름 (1개)</p>
                    <p className="tableBoxUptime">00:00</p>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
                <div className="tableBoxCon">
                    <h2>테이블</h2>
                </div>
            </TtableInbox>
        </TtableContainer>
    )
}

export default Ttables;