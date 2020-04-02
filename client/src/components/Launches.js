import React, { Fragment } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      details
    }
  }
`;

const Launches = ({ match }) => {
  const { loading, error, data, fetchMore } = useQuery(LAUNCHES_QUERY, {
    variables: null
  });

  if (loading) return <div>Space X is launching....</div>;
  if (error) return `Error: ${error}`;

  const launch = data.launches.map((launch, index) => {
    return <LaunchItem key={index} launch={launch} />;
  });

  return (
    <Fragment>
      Test
      <h2 className="title">Launches</h2>
      <div className="container">
        <MissionKey />
      </div>
      <div className="section">{launch}</div>
    </Fragment>
  );
};

export default Launches;
