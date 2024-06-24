import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TempGraph from '../graphs/tempGraph';
import TempBtn from '../cards/graphCard';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.css';

const TempModal = ({ data }) => {
  const MySwal = withReactContent(Swal);

  const handleShowTemperature = () => {
    console.log('handleShowTemperature clicked');
    MySwal.fire({
      title: 'Temperature Over Time',
      html: <TempGraph data={data} />,
      width: '80%',
      customClass: 'swal-wide',
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <TempBtn title="Moisture" onClick={handleShowTemperature} />
    </>
  );
};

export default TempModal;
