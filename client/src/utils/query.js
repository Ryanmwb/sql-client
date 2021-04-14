import axios from "axios";
import { get } from "lodash";

export async function connection({
  credentials,
  history,
  setTables,
  setSelectedTable,
  setCredentials,
}) {
  const res = await axios.post(
    `${process.env.REACT_APP_SELF_URL}/apis/auth/connect`,
    {
      credentials,
    }
  );
  const tables = get(res, "data", {});
  setTables(tables);
  setSelectedTable(Object.values(tables)[0]);
  setCredentials(credentials);
  history.push("/query");
}
