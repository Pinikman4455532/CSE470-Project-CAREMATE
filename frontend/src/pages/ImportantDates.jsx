import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  fetchImportantDates,
  addImportantDate,
  deleteImportantDate,
} from "../controllers/importantDateController";

function ImportantDates() {
  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [dates, setDates] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      fetchImportantDates(user.email).then((data) =>
        setDates(data.dates || [])
      );
    }
  }, []);

  const onDateClick = (value) => {
    setDate(value);
    setShowPopup(true);
  };

  const handleSave = async () => {
    const payload = {
      userEmail: user.email,
      title,
      date,
    };
    const res = await addImportantDate(payload);
    if (res.date) {
      setDates([...dates, res.date]);
    }
    setTitle("");
    setShowPopup(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this date?")) return;

    const res = await deleteImportantDate(id);
    if (res.message === "Date deleted") {
      setDates(dates.filter((d) => d._id !== id));
      setShowPopup(false);
    } else {
      alert("Failed to delete date.");
    }
  };

  const tileContent = ({ date }) => {
    const matches = dates.filter(
      (d) => new Date(d.date).toDateString() === date.toDateString()
    );

    return matches.length ? (
      <div style={{ fontSize: "10px", color: "red" }}>
        {matches.map((m) => (
          <div
            key={m._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{m.title}</span>
            <button
              type="button"
              style={{ marginLeft: "5px", fontSize: "8px" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(m._id);
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div>
      <h2>Important Dates</h2>
      <Calendar onClickDay={onDateClick} value={date} tileContent={tileContent} />

      {showPopup && (
        <div>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setShowPopup(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ImportantDates;
