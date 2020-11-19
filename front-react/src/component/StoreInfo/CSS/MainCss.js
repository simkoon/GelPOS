import styled from "styled-components";

export const InfoTextBox = styled.div`
  font-weight: bold;
  line-height: 30px;

  hr {
    margin-left: 1px;
    color: black;
    width: 40vh;
  }
`;

export const InfoText = styled.span`
  color: rgb(0, 0, 0);
  font-weight: bold;
  margin-right: 20px;
  font-size: 20px;
`;

export const StoreTextBox = styled.div`
  color: rgb(66, 84, 102);
  margin-top: 15vh;
  line-height: 8px;
  @media (max-width: 993px) {
    margin-left: 150px;
  }
`;
export const InfoTitle = styled.div`
  font-size: 25px !important;
  margin-bottom: 80px;
  right: 50px;
  img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }
`;
export const InfoIcon = styled.span`
  margin-left: 3vh;
  font-size: 25px !important;
`;
