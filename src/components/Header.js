import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  -webkit-app-region: drag;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin: 0;
  opacity: 0.8;
  font-weight: 300;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  -webkit-app-region: no-drag;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  opacity: 0.7;
`;

const InfoValue = styled.span`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
`;

const InfoLabel = styled.span`
  font-weight: 300;
`;

function Header() {
  // 获取屏幕DPI信息
  const dpi = window.devicePixelRatio * 96; // 估算DPI
  const screenWidth = Math.round(window.screen.width * window.devicePixelRatio);
  const screenHeight = Math.round(window.screen.height * window.devicePixelRatio);

  return (
    <HeaderContainer>
      <TitleSection>
        <Title>WhatSize</Title>
        <Subtitle>精确尺寸显示工具</Subtitle>
      </TitleSection>
      
      <InfoSection>
        <InfoItem>
          <InfoValue>{Math.round(dpi)}</InfoValue>
          <InfoLabel>DPI</InfoLabel>
        </InfoItem>
        <InfoItem>
          <InfoValue>{screenWidth}×{screenHeight}</InfoValue>
          <InfoLabel>物理分辨率</InfoLabel>
        </InfoItem>
        <InfoItem>
          <InfoValue>{window.devicePixelRatio}×</InfoValue>
          <InfoLabel>像素比</InfoLabel>
        </InfoItem>
      </InfoSection>
    </HeaderContainer>
  );
}

export default Header;