import React from "react";
import styled from "styled-components";

export default function MainButton({
  children,
  color,
  onPhoneCall,
  onFormulaNavigate,
}) {
  return (
    <ButtonWrapper
      color={color}
      onPress={
        onFormulaNavigate ? () => onFormulaNavigate() : () => onPhoneCall()
      }
    >
      <ButtonText>{children}</ButtonText>
    </ButtonWrapper>
  );
}

MainButton.defaultProps = {
  color: "#2a88ff",
};

const ButtonWrapper = styled.TouchableOpacity`
  display: flex;
  border-radius: 30px;
  height: 45px;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.color};
`;
const ButtonText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`;
