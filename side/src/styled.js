import styled from 'styled-components'
import colors from './colors'
export const H3 = styled.h3`
    font-size: 20px;
    font-family: 'Work Sans', sans-serif;
    font-weight: 300;
    margin: 20px 0 20px 10px;
    background: #f9f9f9;
    border-image-source: radial-gradient(...);
    border-image-slice: 0 0 100% 0;
    border-image-width: var(--separator-size);
    border-image-outset: var(--separator-size);
    --separator-size: 75px;
    --separator-shadow: 0.35;
    --separator-shadow-color: rgba(0, 0, 0, 0.35);
    --separator-shape: curve-left;
`

export const H2 = styled.h2`
    font-size: 46px;
    font-weight: bold;
    background: white;
    font-family: 'Work Sans', sans-serif;
    font-weight: 100;
    span:before {
        content: '';
        border-bottom: solid 20px #fdca36;
        width: 200px;
        display: block;
        position: relative;
        top: 70px;
    }
`

export const H1 = styled.h1`
    font-size: 320px;
    line-height: 0.67;
    top: 0;
    margin: 0;
    font-weight: 900;
    font-family: 'Eczar', serif;
    z-index: -1;
    position: fixed;
    background: rgb(24, 0, 148);
    background: linear-gradient(
            to bottom right,
            #fc5a96,
            transparent 50%,
            #180094
        ),
        linear-gradient(to top right, #fdca36, transparent 70%, rgb(24, 0, 148))
            #9c27b042;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
`

export const Cell = styled.div`
    background: white;
    background: linear-gradient(
        135deg,
        rgba(252, 90, 150, 1) 0%,
        rgba(252, 90, 150, 1) 50px,
        rgba(255, 255, 255, 1) 50px,
        rgba(233, 233, 233, 1) 100%
    );
    div {
        margin: auto;
    }
`
export const CodeBlock = styled.div`
    padding: 10px;
    border-top: solid 1px #fdca36;
    > pre {
        font-size: 0.7em;
        background: none !important;
    }
`
export const Description = styled.div`
    padding: 10px;
    background: #fff;
    font-family: 'Work Sans', sans-serif;
    pre {
        display: inline-block;
        color: ${colors.primary};
        line-height: 0;
        font-size: 16px;
        margin: 0;
    }
`
