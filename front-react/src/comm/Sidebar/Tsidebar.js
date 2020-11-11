import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, withRouter } from "react-router-dom";
import logoImg from "./sideImg/logo.png";
import tableImg from "./sideImg/tables.png";
import storeImg from "./sideImg/storeInfo.png";
import salesImg from "./sideImg/sales.png";
import scheduleImg from "./sideImg/schedule.png";
import tableWhiteImg from "./sideImg/tablesWhite.png";
import storeWhiteImg from "./sideImg/storeInfoWhite.png";
import salesWhiteImg from "./sideImg/salesWhite.png";
import scheduleWhiteImg from "./sideImg/scheduleWhite.png";

import MenuImage from "./MenuImage";

import Sidebar from "react-sidebar";
import { Button, Row, Col } from "react-bootstrap";

const TsideContainer = styled.div`
  height: 100vh;
  width: 140px;
  overflow: hidden;
`;

const Tside = styled.div`
  overflow-y: scroll;
  width: 157px;
  height: 100%;
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

// const MenuImage = styled.img`
//     margin: 0 auto;
//     display: block;

// `;

const OpenBtn = styled.p`
  position: absolute;
  top: 0;
  color: white;
  cursor: pointer;
  z-index: 1;
  border-radius: 10px 10px;
  padding: 5px;
`;

const mql = window.matchMedia(`(min-width: 995px)`);

function Tsidebar({ children, location }) {
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
        <TsideContainer>
          <Tside className="">
            <div className="TsideLogo">
              <img src={logoImg} />
            </div>
            <TsideMenu>
              <Link>
                <div className="TsideMenus mt-5">
                  <MenuImage selImg={tableImg} hoverImg={tableWhiteImg} />
                  테이블
                </div>
              </Link>
              <Link to="/scheduler">
                <div className="TsideMenus mt-5">
                  <MenuImage
                    selImg={scheduleImg}
                    hoverImg={scheduleWhiteImg}
                    pageMenu={(() => {
                      if (location.pathname === "/scheduler") {
                        return true;
                      } else {
                        return false;
                      }
                    })()}
                  />
                  스케줄
                </div>
              </Link>
              <Link to="/storeinvoice">
                <div className="TsideMenus mt-5">
                  <MenuImage
                    selImg={salesImg}
                    hoverImg={salesWhiteImg}
                    pageMenu={(() => {
                      if (location.pathname === "/storeinvoice") {
                        return true;
                      } else {
                        return false;
                      }
                    })()}
                  />
                  거래 내역
                </div>
              </Link>
              <Link to="/store/storeinfo">
                <div className="TsideMenus mt-5">
                  <MenuImage
                    selImg={storeImg}
                    hoverImg={storeWhiteImg}
                    pageMenu={(() => {
                      if (location.pathname === "/store/storeinfo") {
                        return true;
                      } else {
                        return false;
                      }
                    })()}
                  />
                  가게정보
                </div>
              </Link>
              <Link className="TsideMenus Logout">로그아웃</Link>
            </TsideMenu>
          </Tside>
        </TsideContainer>
      }
      open={sidebarOpen}
      docked={sidebarDocked}
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          background: "rgb(61,74,89)",
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

export default withRouter(Tsidebar);
