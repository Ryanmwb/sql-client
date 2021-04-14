import { css } from "@emotion/react";

export const styles = {
  container: (theme) => css`
    height: 100vh;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #f8f8ff;
  `,
  title: (theme) => css`
    font-size: 2rem;
  `,
  input: (theme) => css`
    display: block;
    font-size: 1rem;
  `,
  inputGroup: (theme) => css`
    margin-top: 1rem;
  `,
  error: (theme) => css`
    font-size: 0.75rem;
    color: red;
  `,
};
