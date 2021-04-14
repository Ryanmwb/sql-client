import { css } from "@emotion/react";

export const styles = {
  container: (theme) => css`
    height: 100vh;
    display: flex;
  `,
  sidebar: (theme) => css`
    height: 100%;
    width: 300px;
    overflow: auto;
  `,
  tableContainer: (theme) => css`
    margin: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: #f2f3f4;
    cursor: pointer;
    :hover {
      background: lightgray;
    }
  `,
  selectedTable: (theme) => css`
    background: lightgray;
    border-radius: 0.5rem;
  `,
  disconnectButton: (theme) => css`
    width: calc(100% - 2rem);
    margin: 0rem 1rem 1rem 1rem;
  `,
  tableName: (theme) => css`
    text-align: center;
    font-size: 1.25rem;
  `,
  tableResultsContainer: (theme) => css`
    padding: 1rem;
  `,
  table: (theme) => css`
    width: 100%;
  `,
  secondColumn: (theme) => css`
    text-align: right;
  `,
  content: (theme) => css`
    height: 100%;
    width: calc(100vw - 300px);
    overflow: auto;
  `,
  textareaCont: (theme) => css`
    height: 250px;
    width: 100%;
    position: relative;
  `,
  textarea: (theme) => css`
    height: 100%;
    width: 100%;
    padding: 1rem;
    resize: none;
    background: black;
    color: white;
    border: none;
  `,
  runButton: (theme) => css`
    position: absolute;
    right: 12px;
    bottom: 12px;
  `,
};
