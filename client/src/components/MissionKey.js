import React from "react";

export default function MissionKey() {
  return (
    <div className="columns is-variable">
      <div className="column is-half">
        <span className="tag is-normal is-success" /> Success
        <br />
        <span className="tag is-normal is-danger" /> Failures
      </div>
    </div>
  );
}
