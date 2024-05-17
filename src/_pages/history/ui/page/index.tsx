import styles from "./styles.module.scss";
import { IProps } from "./props";
import { AuthRequired } from "processes";

const History = (props: IProps) => {
  return (
    <AuthRequired>
      <div>History</div>
    </AuthRequired>
  );
};

export default History;
