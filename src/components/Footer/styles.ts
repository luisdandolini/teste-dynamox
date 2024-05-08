import styled from "styled-components";

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  text-align: center;
  padding: 2.5rem 0rem 2rem 0rem;
  font-size: 1.875rem;
`;

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
`;

export const Input = styled.input`
  width: 426px;
  height: 41px;
  text-align: center;
  border-radius: 5px;
  border: none;
`;

export const Button = styled.button`
  margin: 1.75rem 0rem 2.5rem 0rem;
  padding: 0.3rem 2rem;

  border-radius: 5px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
  color: ${({ theme }) => theme.COLORS.WHITE};

  border: none;
`;