export const datetimeTransform = (datetime, type = "all") => {
  const transform = new Date(datetime);

  switch (type) {
    case "all":
      return transform.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    case "date":
      return transform.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "time":
      return transform.toLocaleString("en-US", {
        minute: "2-digit",
        hour: "2-digit",
        hour12: true,
      });
  }
};
