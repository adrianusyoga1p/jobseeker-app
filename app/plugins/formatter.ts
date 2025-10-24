import dayjs from "dayjs";

export default defineNuxtPlugin(() => {
  const { formatPrice, formatDate, formatFileSize, abbr } = useFormatter();

  return {
    provide: {
      formatPrice,
      formatDate,
      dayjs,
      formatFileSize,
      abbr,
    },
  };
});
