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

const getFormatDate = (dateString: string) => {
  const date = new Date(dateString);

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const day = date.getDate(); // 1-31
  const monthName = months[date.getMonth()]; // getMonth() 0-11

  return { day, monthName };
};

console.log(getFormatDate("2025-05-26")); // 26 Mayıs
console.log(getFormatDate("2025-11-02")); // 2 Kasım

 export const getFullDate = (dateString: string) => {
  const date = new Date(dateString);

  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  return { dayName, day, month };
};

console.log(getFullDate("2025-05-26")); // Pazartesi, 26 Mayıs


export const getTime = (dateString:string)=>{
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}