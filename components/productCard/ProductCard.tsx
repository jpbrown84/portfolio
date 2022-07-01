import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import css from "styled-jsx/css";
import stylingConfig from "../../stylingConfig";

const styles = css`
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-60px);
    }
    100% {
      transform: translateY(-30px);
    }
  }
  @keyframes opacity {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
  }
  @keyframes spinA {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(720deg);
    }
  }
  @keyframes spinB {
    0% {
      transform: rotateY(-180deg);
    }
    100% {
      transform: rotateY(540deg);
    }
  }
  @keyframes leftRight {
    0% {
      transform: translateX(20px);
    }
    100% {
      transform: translateX(-20px);
    }
  }
  @keyframes rightLeft {
    0% {
      transform: translateX(-20px);
    }
    100% {
      transform: translateX(20px);
    }
  }
  @keyframes translate {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-200px);
    }
  }
  @keyframes opacity2 {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .wrapper {
    width: 100%;
    height: 100vh;
    background-color: #bacbe9;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .boxWrapper {
    height: 260px;
    width: 175px;
    position: relative;
    background-color: #0044b9;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
    font-family: ${stylingConfig.fonts.montserrat};
    font-size: 14px;
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.29);
  }
  .boxWrapper.eco {
  }
  .like {
    position: absolute;
    left: 4px;
    top: 4px;
    z-index: 20;
  }
  .oscillationWrapper {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 10;
    pointer-events: none;
    opacity: 0;
  }
  .oscillationWrapper.active {
    animation: leftRight 0.5s alternate infinite ease-in-out -0.25s,
      opacity2 1.8s linear forwards;
  }
  .oscillationWrapper.o2.active {
    animation: rightLeft 0.5s alternate infinite ease-in-out -0.25s,
      opacity2 1.6s linear forwards 0.3s;
  }
  .oscillationWrapper.o3.active {
    animation: leftRight 0.5s alternate infinite ease-in-out -0.25s,
      opacity2 1.2s linear forwards 0.5s;
  }
  .floatHeart.active {
    animation: translate 1.8s linear;
  }
  .floatHeart.heart2.active {
    animation: translate 1.6s linear 0.3s;
  }
  .floatHeart.heart3.active {
    animation: translate 1.2s linear 0.5s;
  }
  .value {
    font-size: 11px;
    background-color: #ec9266;
    position: absolute;
    right: 4px;
    top: 4px;
    z-index: 5;
    padding: 0 4px;
    height: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding-top: 1px;
    transition: 0.3s;
  }
  .value.hidden {
    opacity: 0;
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .brand {
    margin-top: 8px;
    padding: 0 8px;
  }
  .brand button {
    font-family: ${stylingConfig.fonts.montserrat};
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    transition: all 0.3s;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 1px;
  }
  .brand button:hover {
    text-decoration-color: #fff;
  }
  .desc {
    margin-top: 4px;
    padding: 0 8px;
    font-size: 12px;
  }
  .perTab {
    font-size: 9px;
    padding: 0 8px;
    margin-top: 4px;
  }
  .image {
    height: 120px;
    position: relative;
    background-color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;
  }
  .image img.product {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.6s;
  }
  .image img.product.active {
    opacity: 1;
  }
  .ecoLandscape {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .ecoHill1 {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #40be70;
    height: 20px;
    width: 50px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    z-index: 2;
    transition: all 0.5s;
  }
  .ecoHill1.inactive {
    transform: translateY(20px);
    transition-delay: 0.3s;
  }
  .ecoHill1 .text {
    position: absolute;
    bottom: 3px;
    left: 13px;
    font-size: 11px;
  }
  .image img.ecoTree {
    position: absolute;
    top: -39px;
    right: 10px;
    transition: all 0.5s;
    z-index: 1;
    transition-delay: 0.3s;
  }
  .ecoLandscape.inactive img {
    transform: translateY(40px);
    transition-delay: 0;
  }
  .ecoHill2 {
    width: 28px;
    height: 14px;
    background-color: #7ed29e;
    border-top-right-radius: 14px;
    border-top-left-radius: 14px;
    position: absolute;
    right: 50px;
    bottom: -5px;
    z-index: 1;
    transition: 0.5s;
    transition-delay: 0.2s;
  }
  .ecoHill2.inactive {
    transform: translateY(11px);
  }
  .ecoHill3 {
    width: 28px;
    height: 14px;
    background-color: #bbe5cb;
    border-top-right-radius: 14px;
    border-top-left-radius: 14px;
    position: absolute;
    right: 35px;
    bottom: 0px;
    z-index: 0;
    transition: 0.5s;
    transition-delay: 0.2s;
  }
  .ecoHill3.inactive {
    transform: translateY(14px);
  }
  .optionsWrapper {
    position: relative;
    height: 30px;
    margin-bottom: 5px;
  }
  .options {
    display: flex;
    column-gap: 8px;
    flex-wrap: nowrap;
    overflow-x: scroll;
    height: 30px;
    padding: 3px 0;
  }
  .options::-webkit-scrollbar {
    display: none;
  }
  .fade {
    width: 8px;
    height: 30px;
    position: absolute;
    top: 0;
    pointer-events: none;
  }
  .fade.left {
    left: 0;
    background-image: linear-gradient(to right, #0044b9, transparent);
  }
  .fade.right {
    right: 0;
    background-image: linear-gradient(to left, #0044b9, transparent);
  }
  .option {
    height: 24px;
    padding: 0 8px;
    background-color: #eee;
    color: #000;
    font-size: 11px;
    border-radius: 12px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    position: relative;
    font-family: ${stylingConfig.fonts.montserrat};
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 1px;
  }
  .option.selected {
    text-decoration-color: #000;
  }
  .option:hover {
    transform: translateY(-2px);
  }
  .option:first-child {
    margin-left: 8px;
  }
  .option:last-child {
    margin-right: 8px;
  }
  .buttons {
    display: flex;
    align-items: center;
    column-gap: 8px;
    padding: 0 8px;
    margin-bottom: 8px;
  }
  .amount {
    font-size: 16px;
    width: 14px;
    text-align: center;
  }
  .iconButton {
    height: 30px;
    width: 30px;
    border-radius: 15px;
    cursor: pointer;
    position: relative;
    background-color: ${stylingConfig.decentColors.coconutCream};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
  }
  .iconButton.blue {
    background-color: #3e71c9;
  }
  .iconButton:hover {
    transform: translateY(-2px);
  }
  .priceWrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    overflow: hidden;
    height: 38px;
    width: 70px;
    border-bottom-right-radius: 4px;
  }
  .priceBg {
    background-color: #3e71c9;
    position: absolute;
    right: -8px;
    bottom: 0;
    height: 38px;
    width: 70px;
    border-top-left-radius: 5px;
    transform: skewX(-20deg);
  }
  .price {
    font-size: 18px;
    font-weight: 600;
    padding: 0 8px;
    position: absolute;
    left: 8px;
    bottom: 9px;
  }
  .price .small {
    font-size: 12px;
  }

  .heart {
    opacity: 1;
    transition: 0.3s;
    position: absolute;
  }
  .heart.hidden {
    opacity: 0;
  }

  .coin {
    position: absolute;
    top: 0;
    right: 17px;
    height: 15px;
    width: 15px;
    opacity: 0;
    pointer-events: none;
  }

  .coin.active {
    animation: bounce 0.5s cubic-bezier(0.28, 0.84, 0.42, 1), opacity 0.5s ease;
  }

  .coin .sideA {
    height: 15px;
    width: 15px;
    border-radius: 15px;
    background-color: yellow;
    position: absolute;
    backface-visibility: hidden;
  }

  .coin .sideB {
    height: 15px;
    width: 15px;
    border-radius: 15px;
    background-color: brown;
    position: absolute;
    backface-visibility: hidden;
    transform: rotateY(-180deg);
  }

  .coin.active .sideA {
    animation-name: spinA;
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    animation-duration: 0.5s;
  }

  .coin.active .sideB {
    animation-name: spinB;
    animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    animation-duration: 0.5s;
  }
`;

const ProductCard = () => {
  const [amount, setAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState({
    id: "persil_small",
    img: "persil_small.jpeg",
    size: "15 tabs",
    price: {
      numeric: 5.5,
      perTab: "37p",
    },
    eco: false,
    value: false,
  });

  const [coinAnimationActive, setCoinAnimationActive] = useState(false);

  const [favourite, setFavourite] = useState(false);

  const handleCoinAnimation = useCallback(() => {
    setCoinAnimationActive(true);
    setTimeout(() => {
      setCoinAnimationActive(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (selectedOption.value) {
      handleCoinAnimation();
    }
  }, [selectedOption, handleCoinAnimation]);

  const options = [
    {
      id: "persil_small",
      img: "persil_small.jpeg",
      size: "15 tabs",
      price: {
        numeric: 5.5,
        perTab: "37p",
      },
      eco: false,
      value: false,
    },
    {
      id: "persil_large",
      img: "persil_large.jpeg",
      size: "38 tabs",
      price: {
        numeric: 10.2,
        perTab: "27p",
      },
      eco: false,
      value: true,
    },
    {
      id: "persil_refill",
      img: "persil_refill.jpeg",
      size: "50 tabs",
      price: {
        numeric: 12.2,
        perTab: "24p",
      },
      eco: true,
      value: true,
    },
  ];

  const calculatedPrice = selectedOption.price.numeric;
  let priceInPounds;
  let priceInPence;
  if (Number.isInteger(calculatedPrice)) {
    priceInPounds = calculatedPrice;
    priceInPence = "00";
  } else {
    // eslint-disable-next-line prefer-destructuring
    priceInPounds = calculatedPrice.toString().split(".")[0];
    // eslint-disable-next-line prefer-destructuring
    priceInPence =
      calculatedPrice.toString().split(".")[1].length === 2
        ? calculatedPrice.toString().split(".")[1]
        : `${calculatedPrice.toString().split(".")[1]}0`;
  }

  return (
    <div className="wrapper">
      <div className={`boxWrapper ${selectedOption.eco ? "eco" : ""}`}>
        <div className={`value ${selectedOption.value ? "" : "hidden"}`}>
          VALUE
        </div>
        <div className="like">
          <div className={`oscillationWrapper ${favourite ? "active" : ""}`}>
            <img
              className={`floatHeart heart1 ${favourite ? "active" : ""}`}
              src="/images/heart.png"
              height={20}
              alt=""
            />
          </div>
          <div className={`oscillationWrapper o2 ${favourite ? "active" : ""}`}>
            <img
              className={`floatHeart heart2 ${favourite ? "active" : ""}`}
              src="/images/heart.png"
              height={20}
              alt=""
            />
          </div>
          <div className={`oscillationWrapper o3 ${favourite ? "active" : ""}`}>
            <img
              className={`floatHeart heart3 ${favourite ? "active" : ""}`}
              src="/images/heart.png"
              height={20}
              alt=""
            />
          </div>

          <button
            type="button"
            className="iconButton blue"
            onClick={() => setFavourite(!favourite)}
          >
            <img
              className={favourite ? "heart hidden" : "heart"}
              src="/icons/decent/heart.svg"
              height={20}
              width={20}
              alt="minus"
            />
            <img
              className={favourite ? "heart" : "heart hidden"}
              src="/icons/decent/heart-full.svg"
              height={20}
              width={20}
              alt="minus"
            />
          </button>
        </div>

        {/* <div className="discountBar"></div> */}
        <div className="start">
          <div className="image">
            <div
              className={`ecoLandscape ${selectedOption.eco ? "" : "inactive"}`}
            >
              <img
                className="ecoTree"
                src="/images/pine.png"
                alt=""
                height={20}
              />
              <div
                className={`ecoHill1 ${selectedOption.eco ? "" : "inactive"}`}
              >
                <div className="text">ECO</div>
              </div>
              <div
                className={`ecoHill2 ${selectedOption.eco ? "" : "inactive"}`}
              />
              <div
                className={`ecoHill3 ${selectedOption.eco ? "" : "inactive"}`}
              />
            </div>
            {options.map((option) => (
              <img
                className={
                  selectedOption.id === option.id ? "product active" : "product"
                }
                key={`${option.id}-img`}
                src={`/images/${selectedOption.img}`}
                alt="Some product"
                height={80}
              />
            ))}
          </div>
          <div className="brand">
            <button
              type="button"
              onClick={() => {
                alert("Link out to brand page");
              }}
            >
              Persil
            </button>
          </div>
          <div className="desc">Detergent pods - bio</div>
          <div className="perTab">{selectedOption.price.perTab} per tab</div>
        </div>

        <div className={`coin ${coinAnimationActive ? "active" : ""}`}>
          <div className="sideA" />
          <div className="sideB" />
        </div>
        <div className="end">
          <div className="optionsWrapper">
            <div className="options">
              {options.map((option) => (
                <button
                  type="button"
                  className={`option ${
                    option.id === selectedOption.id ? "selected" : ""
                  }`}
                  key={`${option.id}-size`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option.size}
                </button>
              ))}
            </div>
            <div className="fade left" />
            <div className="fade right" />
          </div>
          <div className="bottom">
            <div className="buttons">
              <button
                className="iconButton"
                type="button"
                aria-label="Click"
                onClick={() => {
                  if (amount > 0) {
                    setAmount(amount - 1);
                  }
                }}
              >
                <img
                  src="/icons/decent/minus.svg"
                  height={20}
                  width={20}
                  alt="minus"
                />
              </button>
              <div className="amount">{amount}</div>
              <button
                className="iconButton"
                type="button"
                aria-label="Click"
                onClick={() => setAmount(amount + 1)}
              >
                <img
                  src="/icons/decent/plus.svg"
                  height={20}
                  width={20}
                  alt="minus"
                />
              </button>
            </div>

            <div className="priceWrapper">
              <div className="priceBg" />
              <div className="price">
                <span className="small">£</span>
                {priceInPounds}.<span className="small">{priceInPence}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </div>
  );
};

export default ProductCard;
