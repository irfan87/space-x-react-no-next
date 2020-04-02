import React from "react";
import classNames from "classnames";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const LaunchItem = ({
  launch: {
    flight_number,
    mission_name,
    launch_date_local,
    launch_success,
    details
  }
}) => {
  return (
    <div className="card" key={flight_number}>
      <div className="card-header">
        <div className="card-header-title">
          <h4 className="title">
            <span
              className={classNames({
                " tag is-large is-success is-pulled-right": launch_success,
                " tag is-large is-danger is-pulled-right": !launch_success
              })}
            >
              {mission_name}
            </span>
          </h4>
        </div>
      </div>
      <div className="card-content">
        <div className="content">
          <p>{details ? details : "No Details Provided"}</p>
          <p>
            Date Launch:{" "}
            <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
          </p>
          <div className="level-right">
            <Link
              to={`/launch/${flight_number}`}
              className="button is-light level-item"
            >
              Launch Detail
            </Link>
          </div>
        </div>
      </div>
      <div className="is-clearfix"></div>
      <hr />
    </div>
  );
};

export default LaunchItem;
