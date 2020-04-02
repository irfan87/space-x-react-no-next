import React, { Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Moment from "react-moment";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = ({ match }) => {
  let { flight_number } = match.params;

  flight_number = parseInt(flight_number);

  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number: flight_number }
  });

  if (loading) return <div>Space X's mission is loading...</div>;
  if (error) return `Error:${error}`;

  const {
    mission_name,
    launch_year,
    launch_date_local,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type }
  } = data.launch;

  return (
    <Fragment>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <div className="card-header-title">
              <h1 className="title">{mission_name}</h1>
            </div>
          </div>
          <div className="card-content">
            <div className="content">
              <p>Launch Year: {launch_year}</p>
              <p>
                Launch Date:{" "}
                <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
              </p>
              <p
                className={classNames({
                  "tag is-large is-success": launch_success,
                  "tag is-large is-danger": !launch_success
                })}
              >
                Status: {launch_success ? "Success" : "Fails"}
              </p>
            </div>
          </div>
        </div>
        <br />
        <div className="card">
          <div className="card-header">
            <div className="card-header-title">
              <div className="subtitle">
                <h2>
                  <strong>Rocket Details</strong>
                </h2>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="content">
              <p>
                ID: <strong>{rocket_id}</strong>
              </p>
              <p>
                Rocket Name: <strong>{rocket_name}</strong>
              </p>
              <p>
                Type: <strong>{rocket_type}</strong>
              </p>
            </div>
          </div>
        </div>
        <br />
        <Link to="/" className="button is-info">
          Back
        </Link>
      </div>
    </Fragment>
  );
};

export default Launch;
