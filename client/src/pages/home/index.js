import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { styles } from "./styles";

export const Home = (props) => {
  const {
    control,
    errors,
    formState: { isDirty, touched },
    handleSubmit,
    reset,
  } = useForm();

  return (
    <div css={styles.container}>
      <div>Connect to Database</div>

      <label for="host">Host</label>
      <input id="host" type="text" placeholder="Host" css={styles.input} />
    </div>
  );
};

Home.propTypes = {
  props: PropTypes,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
