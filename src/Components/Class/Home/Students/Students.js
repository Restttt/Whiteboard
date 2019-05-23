import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { CalculateAverage } from '../../../shared/MathCalculations';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment'
import Student from './Student/Student';


const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const Students = (props) => {

  const classID = props.match.params.id;
  const { classes } = props;

  const [students, setStudents] = useState([]);

  useEffect(() => {
    return () => {
      return students
    }
  }, [students])

  useEffect(() => {

    axios.get(`/api/class/classStudents?id=${classID}`).then((res) => {
      return setStudents(res.data)
    }).catch(() => console.log('could not get at this time'))
  }, [])

  let mappedStudents = students.map(item => {
    for (let i = 0; i < item.duedate.length; i++) {
      let date = moment(new Date()).format('YYYY-DD-MM')
      let duedate = moment(item.duedate[i]).format('YYYY-DD-MM')
      if (duedate > date) {
        delete item.duedate[i]
        delete item.outof[i]
        delete item.points[i]
      }
    }
    console.log(item);
    let pointsArr = [];
    let outOfArr = [];
    for (let i = 0; i < item.assignmentname.length; i++) {
      if (item.submitted[i] && item.points[i] != null) {
        pointsArr.push(item.points[i])
        outOfArr.push(item.outof[i])
      }
    }
    let grade = CalculateAverage(outOfArr, pointsArr)
    if (grade) {
      return (
        <>
        <li>{item.firstname} {item.lastname} {grade[0]} {grade[1]}% </li>
        <Student 
          id={item.id}
          classID={classID}
          student={item}
        />
        </>
      )
    }
    return 

  })
  // console.log(mappedStudents)
  return (
    <div style={{ marginLeft: '100px', minHeight: '100vh' }}>
      {mappedStudents.length ? (
        <ul>
          {mappedStudents}
        </ul>
      ) : (

          <div>
            <CircularProgress className={classes.progress} size={50} color="secondary" />
          </div>
        )}

    </div>
  )

}

export default withRouter(withStyles(styles)(Students));