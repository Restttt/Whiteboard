import React, { useState, useEffect } from 'react';

import './ProfileCard.css';

const ProfileCard = (props) => {

  const [edit, toggleEdit] = useState(false);

  useEffect(() => {
    return () => {
      return edit
    };
  }, [edit])

  return (
    <div className="profilecard-container">
      <div className="profile-personal-image-box">
        <img src={props.img} className="profile-personal-image"/>
      </div>
    </div>
  )
}

export default ProfileCard;