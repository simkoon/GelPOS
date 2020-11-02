import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import logoImg from './sideImg/logo.png';
import tableImg from './sideImg/tables.png';
import storeImg from './sideImg/storeInfo.png';
import salesImg from './sideImg/sales.png';
import scheduleImg from './sideImg/schedule.png';
import tableWhiteImg from './sideImg/tablesWhite.png';
import storeWhiteImg from './sideImg/storeInfoWhite.png';
import salesWhiteImg from './sideImg/salesWhite.png';
import scheduleWhiteImg from './sideImg/scheduleWhite.png';

import Sidebar from 'react-sidebar';
import { Button, Row, Col } from 'react-bootstrap';

const Tside = styled.div`
    width: 140px;
    height: 100vh;
    .TsideLogo img {
        margin-left: 20px;
        margin-top: 50px;
    }
`;

const TsideMenu = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    flex-direction: column;
    .TsideMenus {
        text-align: center;
        font-size: 15px !important;
        color: white;
        line-height: 40px;
    }

    .TsideMenus MenuImage:first-child {
        display: block;
        margin: 40px auto 20px;
    }

    .TsideMenus:last-child {
        margin-top: auto;
    }
`;

const MenuImage = styled.img`
    margin: 0 auto;
    display: block;

    ${(props) => {
        const selImg = props;
        console.log(selImg);
    }}
`;

const OpenBtn = styled.p`
    bottom: 0;
    color: white;
    cursor: pointer;
`;

const mql = window.matchMedia(`(min-width: 995px)`);

function Tsidebar({ children }) {
    const [sidebarDocked, setSidebarDocked] = useState(mql.matches);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onSetSidebarOpen = (open) => {
        setSidebarOpen((prev) => open);
    };
    const mediaQueryChanged = () => {
        console.log(mql.matches);
        setSidebarDocked((prev) => mql.matches);
        setSidebarOpen((prev) => !prev);
    };

    useEffect(() => {
        mql.addListener(mediaQueryChanged);

        return () => {
            mql.removeListener(mediaQueryChanged);
        };
    }, []);
    return (
        <Sidebar
            sidebar={
                <Tside className="">
                    <div className="TsideLogo">
                        <img src={logoImg} />
                    </div>
                    <TsideMenu>
                        <a href="#">
                            <div className="TsideMenus mt-5">
                                <MenuImage
                                    selImg={tableWhiteImg}
                                    src={tableImg}
                                />
                                테이블
                            </div>
                        </a>
                        <a href="#">
                            <div className="TsideMenus mt-5">
                                <MenuImage
                                    selImg={scheduleWhiteImg}
                                    src={scheduleImg}
                                />
                                스케줄
                            </div>
                        </a>
                        <a href="#">
                            <div className="TsideMenus mt-5">
                                <MenuImage
                                    selImg={salesWhiteImg}
                                    src={salesImg}
                                />
                                매출현황
                            </div>
                        </a>
                        <a href="#">
                            <div className="TsideMenus mt-5">
                                <MenuImage
                                    selImg={storeWhiteImg}
                                    src={storeImg}
                                />
                                가게정보
                            </div>
                        </a>
                        <div className="TsideMenus Logout">로그아웃</div>
                    </TsideMenu>
                </Tside>
            }
            open={sidebarOpen}
            docked={sidebarDocked}
            onSetOpen={onSetSidebarOpen}
            styles={{
                sidebar: {
                    height: '100vh',
                    background: 'rgb(61,74,89)',
                },
            }}
        >
            <OpenBtn
                className="btn_color_purple position-absolute d-lg-none d-sm-block d-md-block"
                onClick={() => onSetSidebarOpen(true)}
            >
                Open sidebar
            </OpenBtn>
            {children}
        </Sidebar>
    );
}

export default Tsidebar;
