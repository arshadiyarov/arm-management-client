import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("en");
export const convertTimestampToTime = (timestamp: any) => {
  const date = dayjs(timestamp);
  return date.format("HH:mm:ss");
};
export const convertTimestampToDate = (timestamp: any) => {
  const date = dayjs(timestamp);
  const day = date.date();
  const formattedDate = date.format("MMMM, YYYY");
  return `${day} ${formattedDate}`;
};
