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
import { useDispatch } from "react-redux";

import MenuImage from "./MenuImage";

import Sidebar from "react-sidebar";
import { Button, Row, Col } from "react-bootstrap";
import { logout } from "../../modules/user";

const LogoutButton = styled.div`
  cursor: pointer;
`;

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
  position: fixed;
  top: 1px;
  left: 1px;
  color: white;
  cursor: pointer;
  z-index: 1;
  border-radius: 7px 7px;
  padding: 5px;
  opacity: 0.7;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background-color: rgba(61, 74, 89, 0.3);
`;

const mql = window.matchMedia(`(min-width: 1295px)`);

function Tsidebar({ children, location, history }) {
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

  // 로그아웃
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Sidebar
      sidebar={
        <TsideContainer>
          <Tside className="">
            <div className="TsideLogo">
              <Link to="/">
                <img src={logoImg} />
              </Link>
            </div>
            <TsideMenu>
              <Link to="/store/table">
                <div className="TsideMenus mt-5">
                  <MenuImage
                    selImg={tableImg}
                    hoverImg={tableWhiteImg}
                    pageMenu={(() => {
                      if (location.pathname === "/store/table") {
                        return true;
                      } else {
                        return false;
                      }
                    })()}
                  >
                    테이블
                  </MenuImage>
                </div>
              </Link>
              <Link to="/store/scheduler">
                <div className="TsideMenus mt-5">
                  <MenuImage
                    selImg={scheduleImg}
                    hoverImg={scheduleWhiteImg}
                    pageMenu={(() => {
                      if (location.pathname === "/store/scheduler") {
                        return true;
                      } else {
                        return false;
                      }
                    })()}
                  >
                    스케줄
                  </MenuImage>
                </div>
              </Link>
              <Link to="/store/invoice">
                <div className="TsideMenus mt-5">
                  <MenuImage
                    selImg={salesImg}
                    hoverImg={salesWhiteImg}
                    pageMenu={(() => {
                      if (location.pathname === "/store/invoice") {
                        return true;
                      } else {
                        return false;
                      }
                    })()}
                  >
                    거래 내역
                  </MenuImage>
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
                  >
                    가게정보
                  </MenuImage>
                </div>
              </Link>
              <LogoutButton className="TsideMenus Logout" onClick={onLogout}>
                로그아웃
              </LogoutButton>
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
        className="navbar-light navbar-toggler collapsed d-sm-block d-md-block"
        onClick={() => onSetSidebarOpen(true)}
      >
        <span className="navbar-toggler-icon"></span>
      </OpenBtn>
      {children}
    </Sidebar>
  );
}

export default withRouter(Tsidebar);
