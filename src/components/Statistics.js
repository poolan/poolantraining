import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Text } from "recharts";

const _ = require("lodash");

const CustomizedLabel = () => {
  return (
    <Text x={100} y={-20} dx={-300} dy={40} transform="rotate(-90)">
      Minutes
    </Text>
  );
};

function Statistic() {
  const [training, setTraining] = useState([]);

  useEffect(() => fetchTrainings(), []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) =>
        setTraining(
          data.map((data) => ({
            training: data.activity,
            duration: data.duration,
          }))
        )
      )
      .catch((err) => console.error(err));
  };

  const result = _(training)
    .groupBy((x) => x.training)
    .map((value, key) => ({
      training: key,
      total: _.sumBy(value, "duration"),
    }))
    .value();

  return (
    <BarChart width={1200} height={450} data={result}>
      <XAxis dataKey="training" />
      <YAxis label={<CustomizedLabel />} />
      <Bar dataKey="total" fill="#b0cfa9" />
    </BarChart>
  );
}

export default Statistic;
