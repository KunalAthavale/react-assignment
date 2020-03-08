import React from 'react';
import './styles.scss';

const Spinner = () => (
  <div className="spinner-container d-flex justify-content-center text-center">
    <div class="spinner-grow text-dark" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
);

export default Spinner;
