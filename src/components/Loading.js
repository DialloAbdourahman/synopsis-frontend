import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Wrapper>
      <h1>Loading...</h1>
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000000000;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);

  h1 {
    font-size: 50px;
  }
`;
