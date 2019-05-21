import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import AddAnnouncement from './AddAnnouncement';
import CircularProgress from '@material-ui/core/CircularProgress';


const ClassAnnouncements = (props) => {

  const classID = props.match.params.id;
  const [announcements, setAnnouncements] = useState('');
  const [adding, toggleAdd] = useState(false);

  useEffect(() => {
    return () => {
      return announcements
    };
  }, [announcements])

  useEffect(() => {
    axios.get(`/api/class/getAnnouncements?classid=${classID}`).then(res => {
      setAnnouncements(res.data);
    }).catch(() => console.log('could not get at this time'));
  }, []);

  function showAnnouncements() {
    if (announcements) {

      return announcements.map(announcement => {
        announcement.date = moment(announcement.date).format('M-D-YYYY')
        return (
          <div key={announcement.id} className="announcement-box">
            <AddAnnouncement
              adding={adding}
              toggleAdd={toggleAdd}
              user={props.user}
              classid={classID} />
            <div className="box">
              <p>{announcement.date}</p>
              <h3>{announcement.info}</h3>
            </div>
          </div>
        )
      })
    }
  }

  return (

    props.user.isTeacher ? (

      <div className="home-box">
        <h1 className="title">Announcements</h1>
        <button onClick={() => toggleAdd(true)}>New Announcement</button>
        {announcements.length ? (
          <div>
            {showAnnouncements()}
          </div>
        ) : (
            <div>
              <CircularProgress size={50} color="secondary" />
            </div>
          )}
      </div>
    ) : (
        <div className="home-box">
          <h1 className="title">Announcements</h1>
          {announcements.length ? (
          <div>
            {showAnnouncements()}
          </div>
        ) : (
            <div className="loading-box">
              <CircularProgress size={50} color="secondary" />
            </div>
          )}
        </div>
      )
  )

}

export default withRouter(ClassAnnouncements);