import axios from "axios";
import { get, isArray, isObject } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setCredentials,
  setQueryTables,
  setSelectedTable,
  setTables,
} from "../../state/actions";
import { connection } from "../../utils";
import { styles } from "./styles";

export const Query = ({
  credentials,
  tables,
  setCredentials,
  setTables,
  setSelectedTable,
  selectedTable,
  queryTables,
  setQueryTables,
}) => {
  const { handleSubmit, register, setValue, watch } = useForm();
  const history = useHistory();

  async function query({ query }) {
    try {
      const queryRes = await axios
        .post(`${process.env.REACT_APP_SELF_URL}/apis/auth/query`, {
          credentials,
          query,
        })
        .then((res) => res.data);

      await connection({
        credentials,
        history,
        setTables,
        setSelectedTable,
        setCredentials,
      });

      if (isArray(queryRes)) {
        setQueryTables(queryRes);
      } else if (isObject(queryRes)) {
        setQueryTables([queryRes]);
      } else {
        setQueryTables([]);
      }

      setValue("query", "");

      toast.success("Query was successful!");
    } catch (error) {
      toast.error(get(error, "message", "Connection failed"));
    }
  }

  return (
    <div css={styles.container}>
      <div css={styles.sidebar}>
        {Object.keys(tables).map((tableName) => {
          const tableStyles = [styles.tableContainer];
          if (tableName === selectedTable.tableName)
            tableStyles.push(styles.selectedTable);
          return (
            <div
              key={tableName}
              css={tableStyles}
              onClick={() => setSelectedTable(tables[tableName])}
            >
              <div css={styles.tableName}>{tableName}</div>
              <table css={styles.table}>
                <tbody>
                  {get(tables, `${tableName}.fields`, []).map((field) => (
                    <tr key={tableName + field.name}>
                      <td>{field.name}</td>
                      <td css={styles.secondColumn}>{field.format}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
        <button
          className="btn btn-warning"
          css={styles.disconnectButton}
          onClick={() => {
            setCredentials({});
            setTables({});
            setSelectedTable({});
            setQueryTables([]);
            history.push("/");
          }}
        >
          Disconnect
        </button>
      </div>
      <div css={styles.content}>
        <form css={styles.textareaCont} onSubmit={handleSubmit(query)}>
          <textarea
            placeholder="Enter a Query"
            css={styles.textarea}
            {...register("query", { required: true })}
          />
          <button
            disabled={!watch("query")}
            type="submit"
            className="btn btn-primary"
            css={styles.runButton}
          >
            Run
          </button>
        </form>
        <div css={styles.tableResultsContainer}>
          {queryTables
            .filter((qt) => get(qt, "command", "") === "SELECT")
            .map((qt, i) => {
              return (
                <>
                  SELECT Result #{i + 1}
                  <table key={`queryTable-${i}`} className="table">
                    <thead>
                      <tr>
                        {get(qt, "fields", []).map((field) => (
                          <th key={`${i}-head-${field.name}`}>
                            {get(field, "name", "")}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {get(qt, "rows", []).map((row) => (
                        <tr key={JSON.stringify(row)}>
                          {get(qt, "fields", []).map((field, index) => (
                            <td key={`${index}-${row[field.name]}`}>
                              {row[field.name]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              );
            })}

          {selectedTable.tableName}
          <table className="table" css={styles.selectedTable}>
            <thead>
              <tr>
                {get(selectedTable, "fields", []).map((field) => (
                  <th key={`head-${field.name}`}>{get(field, "name", "")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {get(selectedTable, "rows", []).map((row) => (
                <tr key={`tablerow-${row.name}`}>
                  {get(selectedTable, "fields", []).map((field, i) => (
                    <td key={`${i}-`}>{row[field.name]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Query.propTypes = {
  credentials: PropTypes.object,
  setTables: PropTypes.func,
  setSelectedTable: PropTypes.func,
  setQueryTables: PropTypes.func,
  setCredentials: PropTypes.func,
  queryTables: PropTypes.array,
  tables: PropTypes.object,
};

const mapStateToProps = (state) => ({
  credentials: state.database.credentials,
  tables: state.database.tables,
  selectedTable: state.database.selectedTable,
  queryTables: state.database.queryTables,
});

const mapDispatchToProps = {
  setCredentials,
  setSelectedTable,
  setQueryTables,
  setTables,
};

export default connect(mapStateToProps, mapDispatchToProps)(Query);
