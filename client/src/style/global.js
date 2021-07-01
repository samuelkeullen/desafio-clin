import styled from "styled-components";

export const Container = styled.div
`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  width: 1000px;
  background: #ffffff;
  color:#77886b;
`;

export const AboutStyle = styled.div
`
  display: vertical;
  height: 100%;
  width: 100%;
  padding: 100px;
  background: #ffffff;
  color:#77886b;
`;

export const AboutStyle2 = styled.div
`
display: horizontal;
width: 100%;
background: #ffffff;
color:#77886b;
`

export const Form = styled.form`
  width: 500px;
  background: #ffffff;
  padding: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #77886b;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
    color:#77886b;
  }
  a {
    font-size: 16;
    font-weight: bold;
    text-decoration: bold;
    color:#77886b;
  }
`;