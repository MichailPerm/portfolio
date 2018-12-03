import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    &:before {
        content: '';
        position:absolute;
        width: 130px;
        height: 30px;
        border-left: 1px dashed rgba(0, 0, 0, 0.1);
        border-right: 1px dashed rgba(0, 0, 0, 0.1);
        background: rgba(0, 0, 0, 0.1);
        background: -webkit-gradient(linear, 555% 20%, 0% 92%, from(rgba(0, 0, 0, 0.1)), to(rgba(0, 0, 0, 0.0)), color-stop(.1,rgba(0, 0, 0, 0.2)));
        background: -moz-linear-gradient(555% 0 180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.0));
        -webkit-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
        -webkit-transform:translate(-50px,10px)
                          skew(10deg,10deg)
                          rotate(-50deg);
        -moz-transform:translate(-50px,10px)
                       skew(10deg,10deg)
                       rotate(-50deg);
        -o-transform:translate(-50px,10px)
                     skew(10deg,10deg)
                     rotate(-50deg);
        transform:translate(-50px,10px)
                     skew(10deg,10deg)
                     rotate(-50deg);
    }
    & {
        font-family: 'Marck Script';
        color: darkblue;
        margin: 50px auto 50px auto;
        width: 60%;
        padding: 0 0 1px 0;
        position:relative;
        background: #FFEB3B;
        /* background: -webkit-gradient(linear, 0% 20%, 0% 92%, from(#FFEB3B), to(#f9f10261), color-stop(.1,#FFEB3B)); */
        background: -webkit-gradient(linear,0% 20%,0% 92%,from(#ffe50042),to(#f9f10261),color-stop(.1,#ffeb3b4f));
        background: -moz-linear-gradient(0 0 270deg, #fff, #fff 10%, #FFEB3B);
        border-top: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        -webkit-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    }
    &:after {
        content: '';
        position:absolute;
        right:0;
        bottom:0;
        width: 130px;
        height: 30px;
        background: rgba(0, 0, 0, 0.1);
        background: -webkit-gradient(linear, 555% 20%, 0% 92%, from(rgba(0, 0, 0, 0.1)), to(rgba(0, 0, 0, 0.0)), color-stop(.1,rgba(0, 0, 0, 0.2)));
        background: -moz-linear-gradient(555% 0 180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.0));
        border-left: 1px dashed rgba(0, 0, 0, 0.1);
        border-right: 1px dashed rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
        -webkit-transform: translate(50px,-20px)
                           skew(10deg,10deg)
                           rotate(-50deg);
        -moz-transform: translate(50px,-20px)    
                        skew(10deg,10deg)
                        rotate(-50deg);
        -o-transform: translate(50px,-20px)
                      skew(10deg,10deg)
                      rotate(-50deg);
        transform: translate(50px,-20px)
                   skew(10deg,10deg)
                   rotate(-50deg)
    }
`;

const Paragraph = styled.p`
    padding: 10px;
    margin-block-start: 0px;
    margin-block-end: 10px;
`;

const Header4 = styled.h3`
    text-align: center;
    color: #3c1b61;
    margin-block-start: 10px;
    margin-block-end: 5px;
`;

const News = (props) => {
    const { News } = props;

    return (
        <div>
            {News.map((newsElement) => 
                <Box key = {newsElement.id}>
                    <Header4>{newsElement.title}</Header4>
                    <Paragraph>{newsElement.text}</Paragraph>
                </Box>
            )}
        </div>
    );
};

export default News;