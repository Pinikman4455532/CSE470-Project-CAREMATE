const ImportantDate = require("../models/ImportantDate");
const dayjs = require("dayjs");

const getDatesByUser = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const dates = await ImportantDate.find({ userEmail });
    res.status(200).json({ dates });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dates" });
  }
};//

const addDate = async (req, res) => {
  try {
    const { userEmail, title, date, type } = req.body;
    const newDate = new ImportantDate({ userEmail, title, date, type });
    await newDate.save();
    res.status(201).json({ message: "Date saved", date: newDate });
  } catch (err) {
    res.status(500).json({ error: "Failed to save date" });
  }
};

const getUpcomingNotifications = async (req, res) => {
  try {
    const { email } = req.params;
    const today = dayjs().startOf("day");
    const dates = await ImportantDate.find({ userEmail: email });

    const notifications = dates
      .map((event) => {
        const eventDate = dayjs(event.date).startOf("day");
        const diff = eventDate.diff(today, "day");

        if ([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].includes(diff)) {
          switch (diff) {
            case 10: return { message: `10 days left for ${event.title} (${event.type}) on ${eventDate.format("MMM DD")}` };
            case 9: return { message: `9 days left for ${event.title} (${event.type}) on ${eventDate.format("MMM DD")}` };
            case 8: return { message: `8 days left for ${event.title} (${event.type}) on ${eventDate.format("MMM DD")}` };
            case 7: return { message: `7 days left for ${event.title} (${event.type}) on ${eventDate.format("MMM DD")}` };
            case 6: return { message: `6 days left for ${event.title} (${event.type}) on ${eventDate.format("MMM DD")}` };
            case 5: return { message: `5 days left for ${event.title} (${event.type}) on ${eventDate.format("MMM DD")}` };
            case 4: return { message: `4 days left for ${event.title} (${event.type}) on ${eventDate.format("MMM DD")}` };
            case 3: return { message: `3 days left for ${event.title} (${event.type}) on ${eventDate.format("MMM DD")}` };
            case 2: return { message: `2 days left for ${event.title} (${event.type}) on ${eventDate.format("MMM DD")}` };
            case 1: return { message: `Tomorrow is ${event.title} (${event.type})!` };
            case 0: return { message: `Today is ${event.title} (${event.type})!` };
          }
        }
        return null;
      })
      .filter(Boolean);

    res.status(200).json({ notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get notifications" });
  }
};

const deleteDate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ImportantDate.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).json({ message: "Date deleted" });
    } else {
      res.status(404).json({ error: "Date not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete date" });
  }
};

module.exports = {
  getDatesByUser,
  addDate,
  getUpcomingNotifications,
  deleteDate,
};
