import React from 'react';

const StarRating = ({ rating }) => {
  // Fill stars array based on rating
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    } else {
      stars.push(<i key={i} className="fa-regular fa-star"></i>);
    }
  }

  return (
    <div className="d-flex justify-content-between align-items-center mt-2">
      <ul className="list-unstyled mb-0">
        {stars}
      </ul>
      {/* <p className="text-muted mb-0">{rating} Star</p> */}
    </div>
  );
};

export default StarRating;
