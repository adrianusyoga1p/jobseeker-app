import type { ConfigType } from "dayjs";

import dayjs from "dayjs";

export default () => {
  const formatDate = (date: ConfigType, format: string) =>
    dayjs(date).format(format);

  const formatPrice = (price?: number | string | null) => {
    if (typeof price == "string")
      return formatPrice(Number.parseFloat(price));
    if (!price || Number.isNaN(price) || price == null)
      return formatPrice(0);

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatFileSize = (bytes: number, decimals = 1) => {
    if (bytes === 0)
      return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const size = Number.parseFloat((bytes / k ** i).toFixed(dm));
    return `${size} ${sizes[i]}`;
  };

  const abbr = (name: string) => {
    return name
      .split(" ")
      .map(x => x[0])
      .join("")
      .substring(0, 2);
  };

  return { formatDate, formatPrice, formatFileSize, abbr };
};
