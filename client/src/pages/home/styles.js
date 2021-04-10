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
    background: lightgray;
  `,
  input: (theme) => css`
    display: block;
    font-size: 1rem;
  `,
};
