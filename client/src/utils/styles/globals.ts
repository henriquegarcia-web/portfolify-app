import styled, { createGlobalStyle } from 'styled-components'

import Colors from '../styles/colors'
// import Fonts from "../styles/fonts";

export const responsiveDesktop = '1000px'
export const responsiveTablet = '760px'
export const responsiveMobile = '480px'

export const adminMenuWidth = '220px'
export const adminHeaderHeight = '60px'
export const adminViewHeader = '50px'

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 14px;

    @media screen and (min-width: 1024px) {
      font-size: 16px;
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    /* font-family: 'Rubik', sans-serif; */
    text-decoration: none;
    user-select: none;
  }

  scroll-behavior: smooth;

  body {
    /* background-color: blue; */
  }

  // ------------------------- SCROLL BAR

  ::-webkit-scrollbar {
    width: 10px;
    z-index: 1000;
  }

  ::-webkit-scrollbar-track {
    background: ${Colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${Colors.elementPrimary};
    border-radius: 10px;
  }

  /* ==================================== */

  input[type='text'], input[type='email'], input[type='password'], input[type='tel'] {
    width: 100%;
    border-radius: 4px;
    padding: 8px 12px;
    

    border: 1px solid gray;
  }

  button {
    width: 100%;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
  }
`

export default GlobalStyle

export const Window = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
`
