import { useState } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const Wrapper = styled.section`
  background: papayawhip;
  width: 70vw;
  height: 480px;
  top: 50%;
  left: 50%;
  position: relative;
  display: block;
  transform: translate(-50%, 10%);
`;

const ResultText = styled.span.attrs((props: { marginValue: string }) => props)`
  width: 280px;
  text-align: center;
  position: relative;
  display: block;
  margin: ${props => props.marginValue} auto 1rem auto;
`;

const BoxLayer = styled.div.attrs((props: { color: string, index: number, id: string }) => props)`
  width: 200px;
  height: 200px;
  background-color: ${props => props.color};
  z-index: ${props => props.index}
`;

const App = () => {
  const [isIntersection, setIsIntersection] = useState(false);
  const [intersectionPercent, setIntersectionPercent] = useState(0);

  const handleDragOnStop = () => {
    if (document.getElementById("1") !== null) {
      const rect1 = document.getElementById("1")?.getBoundingClientRect() ?? false;
      const rect2 = document.getElementById("2")?.getBoundingClientRect() ?? false;
      if (rect1 && rect2) {
        const rect1Corners = {
          x1: rect1.left,
          y1: rect1.top,
          x2: rect1.right,
          y2: rect1.bottom
        }
        const rect2Corners = {
          x1: rect2.left,
          y1: rect2.top,
          x2: rect2.right,
          y2: rect2.bottom
        }
        const rect1Center = {
          x: rect1Corners.x1 + (rect1Corners.x2 - rect1Corners.x1) / 2, 
          y: rect1Corners.y2 + (rect1Corners.y1 - rect1Corners.y2) / 2
        };
        const rect2Center = {
          x: rect2Corners.x1 + (rect2Corners.x2 - rect2Corners.x1) / 2, 
          y: rect2Corners.y2 + (rect2Corners.y1 - rect2Corners.y2) / 2
        };
        const distance = Math.sqrt(((rect2Center.x - rect1Center.x) ** 2) + ((rect2Center.y - rect1Center.y) ** 2));
        const distanceLeftTopCorners = Math.sqrt(((rect2Corners.x2 - rect1Corners.x1) ** 2) + ((rect2Corners.y2 - rect1Corners.y1) ** 2));
        console.info('Distance: ', distance, distanceLeftTopCorners);
        if (distance >= 200 && distanceLeftTopCorners > 561) {
          setIsIntersection(false);
          setIntersectionPercent(0);
        } else if (100 - ((distance * 100) / 200) >= 0) {
          setIsIntersection(true);
          setIntersectionPercent(100 - ((distance * 100) / 200));
        } else {
          setIsIntersection(false);
          setIntersectionPercent(0);
        }
      }
    }
  };

  return (
    <>
    <Wrapper>
      <Draggable bounds="parent" onStop={handleDragOnStop}>
        <BoxLayer id={"1"} color={"red"} index={1}></BoxLayer>
      </Draggable>

      <Draggable bounds="parent" onStop={handleDragOnStop}>
        <BoxLayer id={"2"} color={"green"} index={2}></BoxLayer>
      </Draggable>
    </Wrapper>
    <ResultText marginValue={'4rem'}>{isIntersection ? 'Пересекаются' : 'Не пересекаются'}</ResultText>
    <ResultText marginValue={'0.5rem'}>Процент пересечения: {intersectionPercent}</ResultText>
    </>
  )
}

export default App
