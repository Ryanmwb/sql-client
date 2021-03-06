import { get, isEmpty, startCase } from "lodash";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setCredentials,
  setSelectedTable,
  setTables,
} from "../../state/actions";
import { connection } from "../../utils";
import { styles } from "./styles";

export const Home = ({ setCredentials, setSelectedTable, setTables }) => {
  const {
    formState: { errors, touchedFields },
    handleSubmit,
    register,
  } = useForm({
    reValidateMode: "onChange",
  });
  const history = useHistory();

  function inputGroup({ label, type }) {
    const name = label.toLowerCase();
    return (
      <div css={styles.inputGroup}>
        <label htmlFor={name}>{startCase(label)}</label>
        <input
          id={name}
          {...register(name, { required: true })}
          type={type}
          css={styles.input}
        />
        {errors[name] && <div css={styles.error}>*Required</div>}
      </div>
    );
  }

  async function submit(credentials) {
    try {
      await connection({
        credentials,
        history,
        setTables,
        setSelectedTable,
        setCredentials,
        toast,
      });
      toast.success("Successfully connected!");
    } catch (error) {
      toast.error(get(error, "message", "Connection failed"));
    }
  }

  return (
    <form css={styles.container} onSubmit={handleSubmit(submit)}>
      <div css={styles.title}>Connect to Postgres Database</div>
      {inputGroup({ label: "host", type: "text" })}
      {inputGroup({ label: "port", type: "number" })}
      {inputGroup({ label: "user", type: "text" })}
      {inputGroup({ label: "password", type: "password" })}
      {inputGroup({ label: "database", type: "text" })}
      <div css={styles.inputGroup}>
        <button
          disabled={!isEmpty(errors) || isEmpty(touchedFields)}
          className="btn btn-primary"
          type="submit"
        >
          Connect
        </button>
      </div>
    </form>
  );
};

Home.propTypes = {
  setTables: PropTypes.func,
  setSelectedTable: PropTypes.func,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setCredentials,
  setTables,
  setSelectedTable,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
