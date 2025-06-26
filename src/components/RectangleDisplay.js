import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: ${props => props.isDragging ? 'grabbing' : 'default'};
`;

const Rectangle = styled.div`
  position: absolute;
  background-color: ${props => props.color};
  opacity: ${props => props.opacity};
  border: ${props => props.borderWidth}px solid ${props => props.color};
  border-radius: 4px;
  cursor: grab;
  transition: ${props => props.isDragging ? 'none' : 'all 0.2s ease'};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  
  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
  }
  
  &:active {
    cursor: grabbing;
  }
`;

const DimensionLabel = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 10;
`;

const WidthLabel = styled(DimensionLabel)`
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
`;

const HeightLabel = styled(DimensionLabel)`
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
`;

const CenterGuide = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  pointer-events: none;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.2s ease;
`;

const InfoPanel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-size: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 200px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
`;

const InfoValue = styled.span`
  font-weight: 500;
`;

function RectangleDisplay({
  dimensions,
  showRectangle,
  color,
  opacity,
  borderWidth,
  showDimensions,
  position,
  onPositionChange,
  containerRef,
  customDPI
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showGuide, setShowGuide] = useState(false);
  const rectangleRef = useRef(null);

  // 单位转换函数
  const convertToPixels = useCallback((value, unit) => {
    // 使用自定义DPI或系统估算DPI
    const dpi = customDPI || (window.devicePixelRatio * 96);
    
    switch (unit) {
      case 'mm':
        return (value / 25.4) * dpi;
      case 'cm':
        return (value / 2.54) * dpi;
      case 'inch':
        return value * dpi;
      case 'px':
      default:
        return value;
    }
  }, [customDPI]);

  // 计算像素尺寸
  const pixelWidth = convertToPixels(dimensions.width, dimensions.unit);
  const pixelHeight = convertToPixels(dimensions.height, dimensions.unit);

  // 计算实际物理尺寸（英寸）
  const currentDPI = customDPI || (window.devicePixelRatio * 96);
  const physicalWidth = convertToPixels(dimensions.width, dimensions.unit) / currentDPI;
  const physicalHeight = convertToPixels(dimensions.height, dimensions.unit) / currentDPI;

  // 鼠标事件处理
  const handleMouseDown = useCallback((e) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setShowGuide(true);
    
    const rectRect = rectangleRef.current.getBoundingClientRect();
    
    setDragStart({
      x: e.clientX - rectRect.left,
      y: e.clientY - rectRect.top
    });
    
    e.preventDefault();
  }, [containerRef]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = ((e.clientX - dragStart.x - containerRect.left) / containerRect.width) * 100;
    const newY = ((e.clientY - dragStart.y - containerRect.top) / containerRect.height) * 100;
    
    // 限制在容器范围内
    const clampedX = Math.max(0, Math.min(100 - (pixelWidth / containerRect.width) * 100, newX));
    const clampedY = Math.max(0, Math.min(100 - (pixelHeight / containerRect.height) * 100, newY));
    
    onPositionChange({ x: clampedX, y: clampedY });
  }, [isDragging, dragStart, pixelWidth, pixelHeight, onPositionChange, containerRef]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setShowGuide(false);
  }, []);

  // 添加全局鼠标事件监听
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 格式化显示值
  const formatValue = (value, unit) => {
    if (unit === 'px') {
      return `${Math.round(value)}${unit}`;
    }
    return `${value.toFixed(1)}${unit}`;
  };

  if (!showRectangle) {
    return (
      <DisplayContainer>
        <CenterGuide show={true} />
        <InfoPanel>
          <InfoRow>
            <InfoLabel>状态:</InfoLabel>
            <InfoValue>矩形已隐藏</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>设定尺寸:</InfoLabel>
            <InfoValue>{formatValue(dimensions.width, dimensions.unit)} × {formatValue(dimensions.height, dimensions.unit)}</InfoValue>
          </InfoRow>
        </InfoPanel>
      </DisplayContainer>
    );
  }

  return (
    <DisplayContainer isDragging={isDragging}>
      <CenterGuide show={showGuide} />
      
      <Rectangle
        ref={rectangleRef}
        color={color}
        opacity={opacity}
        borderWidth={borderWidth}
        isDragging={isDragging}
        style={{
          width: `${pixelWidth}px`,
          height: `${pixelHeight}px`,
          left: `${position.x}%`,
          top: `${position.y}%`
        }}
        onMouseDown={handleMouseDown}
      >
        {showDimensions && (
          <>
            <WidthLabel>
              {formatValue(dimensions.width, dimensions.unit)}
            </WidthLabel>
            <HeightLabel>
              {formatValue(dimensions.height, dimensions.unit)}
            </HeightLabel>
          </>
        )}
      </Rectangle>
      
      <InfoPanel>
        <InfoRow>
          <InfoLabel>设定尺寸:</InfoLabel>
          <InfoValue>{formatValue(dimensions.width, dimensions.unit)} × {formatValue(dimensions.height, dimensions.unit)}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>像素尺寸:</InfoLabel>
          <InfoValue>{Math.round(pixelWidth)} × {Math.round(pixelHeight)} px</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>物理尺寸:</InfoLabel>
          <InfoValue>{physicalWidth.toFixed(2)}" × {physicalHeight.toFixed(2)}"</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>位置:</InfoLabel>
          <InfoValue>{position.x.toFixed(1)}%, {position.y.toFixed(1)}%</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>当前DPI:</InfoLabel>
          <InfoValue style={{color: customDPI ? '#4a90e2' : 'inherit'}}>
            {currentDPI.toFixed(0)} {customDPI ? '(已校准)' : '(估算)'}
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>状态:</InfoLabel>
          <InfoValue>{isDragging ? '拖拽中' : '可拖拽'}</InfoValue>
        </InfoRow>
      </InfoPanel>
    </DisplayContainer>
  );
}

export default RectangleDisplay;