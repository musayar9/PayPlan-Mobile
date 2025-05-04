export const formateDate = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("tr-TR", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
export const formatDates = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");

  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
