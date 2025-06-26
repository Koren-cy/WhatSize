import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CalibrationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 350px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const CalibrationArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
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

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 15px;
  backdrop-filter: blur(10px);
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`;

const InfoValue = styled.span`
  font-weight: 500;
  font-size: 14px;
`;

const CalibrationMethod = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  &.active {
    background: rgba(74, 144, 226, 0.2);
    border-color: rgba(74, 144, 226, 0.5);
  }
`;

const MethodTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`;

const MethodDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
`;

const RulerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Ruler = styled.div`
  width: ${props => props.width}px;
  height: 60px;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  border: 2px solid #333;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const RulerMark = styled.div`
  position: absolute;
  top: 0;
  width: 1px;
  background: #333;
  height: ${props => props.major ? '30px' : '20px'};
  left: ${props => props.position}px;
`;

const RulerLabel = styled.div`
  position: absolute;
  top: 35px;
  left: ${props => props.position}px;
  transform: translateX(-50%);
  font-size: 12px;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  width: 100%;
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

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.primary ? 'linear-gradient(45deg, #4a90e2, #357abd)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  
  &:hover {
    background: ${props => props.primary ? 'linear-gradient(45deg, #357abd, #2968a3)' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CreditCard = styled.div`
  width: 85.6mm;
  height: 53.98mm;
  background: linear-gradient(45deg, #1e3c72, #2a5298);
  border-radius: 8px;
  border: 2px solid #fff;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px dashed rgba(255, 255, 255, 0.5);
    border-radius: 12px;
  }
`;

const CalibrationInstructions = styled.div`
  text-align: center;
  max-width: 600px;
  margin-bottom: 30px;
`;

const InstructionText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 15px 0;
`;

const HistoryList = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const HistoryItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 8px;
  font-size: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const HistoryDate = styled.div`
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
`;

const HistoryValue = styled.div`
  font-weight: 500;
`;

function DPICalibration({ onClose, onCalibrationComplete }) {
  const [activeMethod, setActiveMethod] = useState('ruler');
  const [measuredLength, setMeasuredLength] = useState('');
  const [calculatedDPI, setCalculatedDPI] = useState(null);
  const [calibrationHistory, setCalibrationHistory] = useState([]);
  const [systemInfo] = useState({
    screenWidth: Math.round(window.screen.width * window.devicePixelRatio),
    screenHeight: Math.round(window.screen.height * window.devicePixelRatio),
    devicePixelRatio: window.devicePixelRatio,
    estimatedDPI: Math.round(window.devicePixelRatio * 96)
  });
  
  const rulerRef = useRef(null);
  const [rulerWidth] = useState(300); // 默认300像素

  // 加载校准历史
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('dpiCalibrationHistory') || '[]');
    setCalibrationHistory(history);
  }, []);

  // 保存校准历史
  const saveCalibration = (dpi, method) => {
    const newRecord = {
      dpi,
      method,
      date: new Date().toLocaleString('zh-CN'),
      screenInfo: systemInfo
    };
    
    const updatedHistory = [newRecord, ...calibrationHistory.slice(0, 9)]; // 保留最近10条
    setCalibrationHistory(updatedHistory);
    localStorage.setItem('dpiCalibrationHistory', JSON.stringify(updatedHistory));
  };

  // 计算DPI
  const calculateDPI = () => {
    if (!measuredLength || measuredLength <= 0) return;
    
    let actualLength;
    switch (activeMethod) {
      case 'ruler':
        actualLength = parseFloat(measuredLength); // 厘米
        break;
      case 'creditCard':
        actualLength = 8.56; // 信用卡标准宽度 8.56cm
        break;
      case 'coin':
        actualLength = 2.5; // 一元硬币直径 2.5cm
        break;
      default:
        return;
    }
    
    const pixelLength = activeMethod === 'ruler' ? rulerWidth : 85.6 * (96 / 2.54); // 信用卡像素宽度
    const dpi = Math.round((pixelLength / actualLength) * 2.54);
    
    setCalculatedDPI(dpi);
    saveCalibration(dpi, activeMethod);
  };

  // 应用校准结果
  const applyCalibration = () => {
    if (calculatedDPI && onCalibrationComplete) {
      onCalibrationComplete(calculatedDPI);
      onClose();
    }
  };

  // 自动检测DPI
  const autoDetectDPI = () => {
    // 基于常见显示器尺寸和分辨率的启发式检测
    const commonDPIs = [96, 120, 144, 168, 192, 216, 240, 288, 320];
    const estimatedDPI = window.devicePixelRatio * 96;
    const closestDPI = commonDPIs.reduce((prev, curr) => 
      Math.abs(curr - estimatedDPI) < Math.abs(prev - estimatedDPI) ? curr : prev
    );
    
    setCalculatedDPI(closestDPI);
    saveCalibration(closestDPI, 'auto');
  };

  // 渲染标尺刻度
  const renderRulerMarks = () => {
    const marks = [];
    
    for (let i = 0; i <= 100; i++) { // 100毫米 = 10厘米
      const position = (i / 100) * rulerWidth;
      const isMajor = i % 10 === 0; // 每厘米一个主刻度
      
      marks.push(
        <RulerMark key={i} position={position} major={isMajor} />
      );
      
      if (isMajor) {
        marks.push(
          <RulerLabel key={`label-${i}`} position={position}>
            {i / 10}
          </RulerLabel>
        );
      }
    }
    
    return marks;
  };

  const calibrationMethods = [
    {
      id: 'ruler',
      title: '物理标尺校准',
      description: '使用真实的标尺或直尺测量屏幕上显示的标尺长度，这是最精确的方法。'
    },
    {
      id: 'creditCard',
      title: '信用卡校准',
      description: '使用标准信用卡（85.6mm × 53.98mm）作为参考物进行校准。'
    },
    {
      id: 'auto',
      title: '自动检测',
      description: '基于系统信息和常见显示器规格进行智能估算，快速但可能不够精确。'
    }
  ];

  return (
    <CalibrationContainer>
      <Header>
        <Title>DPI 精确校准</Title>
        <CloseButton onClick={onClose}>关闭校准</CloseButton>
      </Header>
      
      <MainContent>
        <Sidebar>
          <Section>
            <SectionTitle>系统信息</SectionTitle>
            <InfoCard>
              <InfoRow>
                <InfoLabel>物理分辨率:</InfoLabel>
                <InfoValue>{systemInfo.screenWidth} × {systemInfo.screenHeight}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>设备像素比:</InfoLabel>
                <InfoValue>{systemInfo.devicePixelRatio}×</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>估算DPI:</InfoLabel>
                <InfoValue>{systemInfo.estimatedDPI}</InfoValue>
              </InfoRow>
              {calculatedDPI && (
                <InfoRow>
                  <InfoLabel>校准DPI:</InfoLabel>
                  <InfoValue style={{color: '#4a90e2', fontWeight: 'bold'}}>{calculatedDPI}</InfoValue>
                </InfoRow>
              )}
            </InfoCard>
          </Section>

          <Section>
            <SectionTitle>校准方法</SectionTitle>
            {calibrationMethods.map(method => (
              <CalibrationMethod
                key={method.id}
                className={activeMethod === method.id ? 'active' : ''}
                onClick={() => setActiveMethod(method.id)}
              >
                <MethodTitle>{method.title}</MethodTitle>
                <MethodDescription>{method.description}</MethodDescription>
              </CalibrationMethod>
            ))}
          </Section>

          {activeMethod === 'ruler' && (
            <Section>
              <SectionTitle>测量设置</SectionTitle>
              <Input
                type="number"
                placeholder="输入测量长度（厘米）"
                value={measuredLength}
                onChange={(e) => setMeasuredLength(e.target.value)}
                step="0.1"
                min="0"
              />
              <Button onClick={calculateDPI} disabled={!measuredLength}>
                计算DPI
              </Button>
            </Section>
          )}

          {activeMethod === 'auto' && (
            <Section>
              <SectionTitle>自动检测</SectionTitle>
              <Button onClick={autoDetectDPI}>
                开始自动检测
              </Button>
            </Section>
          )}

          {calculatedDPI && (
            <Section>
              <SectionTitle>应用校准</SectionTitle>
              <Button primary onClick={applyCalibration}>
                应用 DPI 设置 ({calculatedDPI})
              </Button>
            </Section>
          )}

          <Section>
            <SectionTitle>校准历史</SectionTitle>
            <HistoryList>
              {calibrationHistory.length === 0 ? (
                <InfoCard>
                  <InfoLabel>暂无校准记录</InfoLabel>
                </InfoCard>
              ) : (
                calibrationHistory.map((record, index) => (
                  <HistoryItem key={index}>
                    <HistoryDate>{record.date}</HistoryDate>
                    <HistoryValue>DPI: {record.dpi} ({record.method})</HistoryValue>
                  </HistoryItem>
                ))
              )}
            </HistoryList>
          </Section>
        </Sidebar>

        <CalibrationArea>
          {activeMethod === 'ruler' && (
            <RulerContainer>
              <CalibrationInstructions>
                <InstructionText>
                  <strong>步骤 1:</strong> 使用真实的标尺或直尺测量下方显示标尺的实际长度
                </InstructionText>
                <InstructionText>
                  <strong>步骤 2:</strong> 在左侧输入框中输入测量到的长度（厘米）
                </InstructionText>
                <InstructionText>
                  <strong>步骤 3:</strong> 点击"计算DPI"按钮获得精确的DPI值
                </InstructionText>
              </CalibrationInstructions>
              
              <Ruler ref={rulerRef} width={rulerWidth}>
                {renderRulerMarks()}
              </Ruler>
              
              <div style={{textAlign: 'center', marginTop: '20px'}}>
                <InfoLabel>显示长度: 10 厘米 ({rulerWidth} 像素)</InfoLabel>
              </div>
            </RulerContainer>
          )}

          {activeMethod === 'creditCard' && (
            <RulerContainer>
              <CalibrationInstructions>
                <InstructionText>
                  <strong>步骤 1:</strong> 将真实的信用卡放在屏幕上的卡片图像上
                </InstructionText>
                <InstructionText>
                  <strong>步骤 2:</strong> 调整浏览器缩放比例，使屏幕上的卡片与真实卡片完全重合
                </InstructionText>
                <InstructionText>
                  <strong>步骤 3:</strong> 点击"计算DPI"按钮完成校准
                </InstructionText>
              </CalibrationInstructions>
              
              <CreditCard>
                <div style={{fontSize: '16px', marginBottom: '8px'}}>标准信用卡</div>
                <div style={{fontSize: '12px', opacity: 0.8}}>85.6mm × 53.98mm</div>
              </CreditCard>
              
              <Button onClick={() => calculateDPI()} style={{maxWidth: '200px', marginTop: '20px'}}>
                计算DPI
              </Button>
            </RulerContainer>
          )}

          {activeMethod === 'auto' && (
            <RulerContainer>
              <CalibrationInstructions>
                <InstructionText>
                  <strong>自动检测模式</strong>
                </InstructionText>
                <InstructionText>
                  系统将基于您的屏幕分辨率、设备像素比和常见显示器规格
                  自动估算最合适的DPI值。
                </InstructionText>
                <InstructionText>
                  这种方法快速便捷，但精确度可能不如手动校准。
                  建议在需要高精度测量时使用物理标尺校准。
                </InstructionText>
              </CalibrationInstructions>
              
              <InfoCard style={{maxWidth: '400px', textAlign: 'center'}}>
                <InfoRow style={{justifyContent: 'center', marginBottom: '15px'}}>
                  <InfoValue style={{fontSize: '24px', color: '#4a90e2'}}>
                    {calculatedDPI || systemInfo.estimatedDPI} DPI
                  </InfoValue>
                </InfoRow>
                <InfoLabel>
                  {calculatedDPI ? '检测完成' : '点击左侧按钮开始检测'}
                </InfoLabel>
              </InfoCard>
            </RulerContainer>
          )}
        </CalibrationArea>
      </MainContent>
    </CalibrationContainer>
  );
}

export default DPICalibration;