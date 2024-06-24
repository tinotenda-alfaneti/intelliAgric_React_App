import React from 'react';
import { useFarm } from '../context/farmContext';

const AnotherComponent = () => {
  const { farmData } = useFarm();

  return (
    <div>
      <h1>{farmData?.farm_name || "Farm Name Not Available"}</h1>
      {/* Use farmData as needed */}
    </div>
  );
};

export default AnotherComponent;
