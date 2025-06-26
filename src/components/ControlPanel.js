import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  width: 320px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 8px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #2a2a2a;
    color: white;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? 'linear-gradient(45deg, #ff6b6b, #ee5a52)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(45deg, #ee5a52, #dd4b39)' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ColorInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  
  &::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
  }
  
  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border: none;
    border-radius: 6px;
  }
`;

const RangeInput = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff6b6b, #ee5a52);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff6b6b, #ee5a52);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ValueDisplay = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  min-width: 40px;
  text-align: right;
`;

function ControlPanel({
  dimensions,
  onDimensionChange,
  showRectangle,
  onToggleRectangle,
  rectangleColor,
  onColorChange,
  opacity,
  onOpacityChange,
  borderWidth,
  onBorderWidthChange,
  showDimensions,
  onToggleDimensions,
  position,
  onPositionChange,
  onOpenCalibration,
  customDPI
}) {
  const handleWidthChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    onDimensionChange({ ...dimensions, width: value });
  };

  const handleHeightChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    onDimensionChange({ ...dimensions, height: value });
  };

  const handleUnitChange = (e) => {
    onDimensionChange({ ...dimensions, unit: e.target.value });
  };

  const handlePositionXChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    onPositionChange({ ...position, x: Math.max(0, Math.min(100, value)) });
  };

  const handlePositionYChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    onPositionChange({ ...position, y: Math.max(0, Math.min(100, value)) });
  };

  return (
    <PanelContainer>
      <Section>
        <SectionTitle>尺寸设置</SectionTitle>
        <InputGroup>
          <Label>宽度</Label>
          <Input
            type="number"
            value={dimensions.width}
            onChange={handleWidthChange}
            min="0"
            step="0.1"
            placeholder="输入宽度"
          />
        </InputGroup>
        
        <InputGroup>
          <Label>高度</Label>
          <Input
            type="number"
            value={dimensions.height}
            onChange={handleHeightChange}
            min="0"
            step="0.1"
            placeholder="输入高度"
          />
        </InputGroup>
        
        <InputGroup>
          <Label>单位</Label>
          <Select value={dimensions.unit} onChange={handleUnitChange}>
            <option value="mm">毫米 (mm)</option>
            <option value="cm">厘米 (cm)</option>
            <option value="inch">英寸 (inch)</option>
            <option value="px">像素 (px)</option>
          </Select>
        </InputGroup>
      </Section>

      <Section>
        <SectionTitle>位置设置</SectionTitle>
        <InputGroup>
          <Label>水平位置 (%)</Label>
          <Input
            type="number"
            value={position.x}
            onChange={handlePositionXChange}
            min="0"
            max="100"
            step="1"
          />
        </InputGroup>
        
        <InputGroup>
          <Label>垂直位置 (%)</Label>
          <Input
            type="number"
            value={position.y}
            onChange={handlePositionYChange}
            min="0"
            max="100"
            step="1"
          />
        </InputGroup>
      </Section>

      <Section>
        <SectionTitle>外观设置</SectionTitle>
        <InputGroup>
          <Label>颜色</Label>
          <ColorInput
            type="color"
            value={rectangleColor}
            onChange={(e) => onColorChange(e.target.value)}
          />
        </InputGroup>
        
        <InputGroup>
          <Label>透明度</Label>
          <FlexRow>
            <RangeInput
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
            />
            <ValueDisplay>{Math.round(opacity * 100)}%</ValueDisplay>
          </FlexRow>
        </InputGroup>
        
        <InputGroup>
          <Label>边框宽度</Label>
          <FlexRow>
            <RangeInput
              type="range"
              min="0"
              max="10"
              step="1"
              value={borderWidth}
              onChange={(e) => onBorderWidthChange(parseInt(e.target.value))}
            />
            <ValueDisplay>{borderWidth}px</ValueDisplay>
          </FlexRow>
        </InputGroup>
      </Section>

      <Section>
        <SectionTitle>显示选项</SectionTitle>
        <Button
          active={showRectangle}
          onClick={onToggleRectangle}
        >
          {showRectangle ? '隐藏矩形' : '显示矩形'}
        </Button>
        
        <Button
          active={showDimensions}
          onClick={onToggleDimensions}
        >
          {showDimensions ? '隐藏尺寸标注' : '显示尺寸标注'}
        </Button>
      </Section>

      <Section>
        <SectionTitle>DPI 校准</SectionTitle>
        <InputGroup>
          <Label>当前 DPI</Label>
          <ValueDisplay style={{
            fontSize: '16px',
            color: customDPI ? '#4a90e2' : 'rgba(255, 255, 255, 0.7)',
            fontWeight: '600',
            textAlign: 'left',
            minWidth: 'auto'
          }}>
            {customDPI || Math.round(window.devicePixelRatio * 96)} 
            {customDPI ? ' (已校准)' : ' (系统估算)'}
          </ValueDisplay>
        </InputGroup>
        
        <Button
          onClick={onOpenCalibration}
          style={{
            background: 'linear-gradient(45deg, #4a90e2, #357abd)',
            border: '1px solid rgba(74, 144, 226, 0.3)'
          }}
        >
          精确校准 DPI
        </Button>
        
        {customDPI && (
          <InputGroup>
            <Label style={{fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)'}}>
              提示：精确的DPI设置可以确保尺寸显示的准确性
            </Label>
          </InputGroup>
        )}
      </Section>
    </PanelContainer>
  );
}

export default ControlPanel;