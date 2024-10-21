import styled, { css } from "styled-components";
import { primary } from "@/lib/colors";

// Definir los estilos del botón utilizando css de styled-components
export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 15px;

  svg {
    height: 16px;
    margin-right: 5px;
  }

  // Estilo para cuando la propiedad 'block' es verdadera
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}

  // Estilo para cuando la propiedad 'white' es verdadera
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}

  // Estilo para cuando la propiedad 'white' y 'outline' son verdaderas
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  // Estilo para cuando la propiedad 'black' es verdadera
  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}

  // Estilo para cuando la propiedad 'black' y 'outline' son verdaderas
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}

  // Estilo para cuando la propiedad 'primary' es verdadera
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
    `}

  // Estilo para cuando la propiedad 'primary' y 'outline' son verdaderas
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}

  // Estilo para cuando la propiedad 'size' es 'l' (large)
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;

      svg {
        height: 20px;
      }
    `}
`;

// Estilizar el botón utilizando styled-components
const StyledButton = styled.button`
  ${ButtonStyle}
`;

// Componente Button que desestructura las props y las aplica de manera condicional
export default function Button({
  children,
  block,
  white,
  black,
  outline,
  primary,
  size,
  ...rest
}) {
  return (
    // Pasar las propiedades necesarias al botón estilizado, asegurándonos de que 'block' no se envíe al DOM
    <StyledButton
      {...rest}
      block={block ? "true" : undefined}
      white={white}
      black={black}
      outline={outline}
      primary={primary}
      size={size}
    >
      {children}
    </StyledButton>
  );
}
