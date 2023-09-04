export const datetimeTransform = (datetime, type = "all") => {
  const [date, time] = datetime.split(" ");
  const [year, month, day] = date.split("-");
  const [hour, minute, second] = time.split(":");

  const transform = new Date(Date.UTC(year, month, day, hour, minute, second));

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
        hour: "2-digit",
        minute: "2-digit",
      });
  }
};
