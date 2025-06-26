import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ControlPanel from './components/ControlPanel';
import RectangleDisplay from './components/RectangleDisplay';
import Header from './components/Header';
import DPICalibration from './components/DPICalibration';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Inter', sans-serif;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const DisplayArea = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px 0 0 0;
  margin: 0 20px 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

function App() {
  const [dimensions, setDimensions] = useState({
    width: 100,
    height: 100,
    unit: 'mm'
  });
  
  const [showRectangle, setShowRectangle] = useState(true);
  const [rectangleColor, setRectangleColor] = useState('#ff6b6b');
  const [opacity, setOpacity] = useState(0.8);
  const [borderWidth, setBorderWidth] = useState(2);
  const [showDimensions, setShowDimensions] = useState(true);
  const [position, setPosition] = useState({ x: 50, y: 50 }); // 百分比位置
  const [showCalibration, setShowCalibration] = useState(false);
  const [customDPI, setCustomDPI] = useState(null);
  
  const displayRef = useRef(null);

  // 监听Electron菜单事件
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onNewRectangle(() => {
        setShowRectangle(true);
        setDimensions({ width: 100, height: 100, unit: 'mm' });
        setPosition({ x: 50, y: 50 });
      });
    }

    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('new-rectangle');
      }
    };
  }, []);

  const handleDimensionChange = (newDimensions) => {
    setDimensions(newDimensions);
  };

  const handleToggleRectangle = () => {
    setShowRectangle(!showRectangle);
  };

  const handleColorChange = (color) => {
    setRectangleColor(color);
  };

  const handleOpacityChange = (newOpacity) => {
    setOpacity(newOpacity);
  };

  const handleBorderWidthChange = (width) => {
    setBorderWidth(width);
  };

  const handleToggleDimensions = () => {
    setShowDimensions(!showDimensions);
  };

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
  };

  const handleOpenCalibration = () => {
    setShowCalibration(true);
  };

  const handleCloseCalibration = () => {
    setShowCalibration(false);
  };

  const handleCalibrationComplete = (dpi) => {
    setCustomDPI(dpi);
    localStorage.setItem('customDPI', dpi.toString());
  };

  // 加载保存的DPI设置
  useEffect(() => {
    const savedDPI = localStorage.getItem('customDPI');
    if (savedDPI) {
      setCustomDPI(parseInt(savedDPI));
    }
  }, []);

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <ControlPanel
          dimensions={dimensions}
          onDimensionChange={handleDimensionChange}
          showRectangle={showRectangle}
          onToggleRectangle={handleToggleRectangle}
          rectangleColor={rectangleColor}
          onColorChange={handleColorChange}
          opacity={opacity}
          onOpacityChange={handleOpacityChange}
          borderWidth={borderWidth}
          onBorderWidthChange={handleBorderWidthChange}
          showDimensions={showDimensions}
          onToggleDimensions={handleToggleDimensions}
          position={position}
          onPositionChange={handlePositionChange}
          onOpenCalibration={handleOpenCalibration}
          customDPI={customDPI}
        />
        <DisplayArea ref={displayRef}>
          <RectangleDisplay
            dimensions={dimensions}
            showRectangle={showRectangle}
            color={rectangleColor}
            opacity={opacity}
            borderWidth={borderWidth}
            showDimensions={showDimensions}
            position={position}
            onPositionChange={handlePositionChange}
            containerRef={displayRef}
            customDPI={customDPI}
          />
        </DisplayArea>
      </MainContent>
      
      {showCalibration && (
        <DPICalibration
          onClose={handleCloseCalibration}
          onCalibrationComplete={handleCalibrationComplete}
        />
      )}
    </AppContainer>
  );
}

export default App;