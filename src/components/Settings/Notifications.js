import React, { useState } from "react";

const Notifications = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [dailySummary, setDailySummary] = useState(true);

  const handleSave = () => {
    alert("Notification Preferences Saved!");
  };

  return (
    <div className="card">
      <h2>Notification Preferences</h2>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
          />
          Email Notifications
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={pushNotif}
            onChange={() => setPushNotif(!pushNotif)}
          />
          Push Notifications
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={dailySummary}
            onChange={() => setDailySummary(!dailySummary)}
          />
          Daily Summary Reports
        </label>
      </div>
      <button className="save-btn" onClick={handleSave}>Save</button>
    </div>
  );
};

export default Notifications;
