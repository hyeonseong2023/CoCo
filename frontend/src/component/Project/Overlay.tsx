import React, { useContext } from 'react';
import styled from 'styled-components';
import { OverlayContext } from './context/PageContext';

const Overlay = () => {
  const overlayContext = useContext(OverlayContext);
  if (!overlayContext) {
    throw new Error('Context must be used within a PageProvider');
  }
  const { overlayRef, overlayIndex, overlayXY } = overlayContext;
  const itemList = ['기본', '페이지', '제목1', '제목2', '할 일 목록', '구분선'];
  const TextItemList = styled.ul`
    transform: translate(
      0px,
      ${overlayIndex <= overlayRef.current?.childElementCount - 2
        ? overlayIndex * -38.4
        : -38.4 * (overlayRef.current?.childElementCount - 2)}px
    );

    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  `;
  const TextItem = styled.li<{ isfocus: string }>`
    list-style-type: none;
    padding: 10px 8px;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    z-index: 4;
    letter-spacing: 2px;
    &:hover {
      background-color: #edf5f5;
      cursor: pointer;
    }
    background-color: ${(props) =>
      props.isfocus === 'true' ? '#edf5f5' : '#fff'};
    position: relative;
    img {
      position: absolute;
      right: 5px;
      width: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
  `;

  return (
    <div style={{ pointerEvents: 'auto', position: 'relative', zIndex: 0 }}>
      <div
        style={{
          position: 'fixed',
          left: overlayXY.x + 'px',
          top: overlayXY.y + 'px',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              position: 'relative',
              pointerEvents: 'auto',
              bottom: '100%',
            }}
          >
            <div
              style={{
                width: '200px',
                height: '200px',
                backgroundColor: '#fff',
                border: '2px solid',
                padding: '15px',
                overflow: 'hidden',
              }}
            >
              <TextItemList ref={overlayRef}>
                {itemList.map((name: string, idx: number) => (
                  <TextItem
                    key={name}
                    isfocus={overlayIndex === idx ? 'true' : 'false'}
                  >
                    {name}
                  </TextItem>
                ))}
              </TextItemList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
