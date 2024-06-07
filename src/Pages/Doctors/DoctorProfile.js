import React from 'react';
import './DoctorProfile.css';
import StarRating from '../Shared/StarRating.js';
import AppointmentForm from '../Appointments/AppointmentForm.js';


const DoctorProfile = ({ doctor }) => {
  return (
    <div className="col-xl-3 col-lg-3 col-md-6">
      <div className="card team border-0 rounded shadow overflow-hidden">
        <div className="team-person position-relative overflow-hidden">
          <img src={`${doctor.profilePhoto}`} className="img-fluid" alt=""></img>
          {/* <ul className="list-unstyled team-like">
          <li><a href="#" className="btn btn-icon btn-pills btn-soft-danger"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart icons"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></a></li>
        </ul> */}
        </div>
        <div className="card-body">
          <a href="#" className="title text-dark h5 d-block mb-0"> {doctor.name} </a>
          <small className="text-muted speciality"> {doctor.title}, {doctor.speciality}</small> <br></br>
          <small className="text-muted experience"> {doctor.experience} years of experience</small>
          <StarRating rating={doctor.rating} />
          <ul className="list-unstyled mt-2 mb-0">
            <li className="d-flex">
              <i className="fa-solid fa-location-dot"></i>
              <small className="text-muted ms-2">{doctor.location}, India</small>
            </li>
            <li className="d-flex mt-2">
              <i className="fa-solid fa-clock"></i>
              <small className="text-muted ms-2">{doctor.timing}</small>
            </li>
            <li className="d-flex mt-2">
              <i className="fa-sharp fa-solid fa-indian-rupee-sign"></i>
              <small className="text-muted ms-2">{doctor.fees} {doctor.currency} / Visit</small>
            </li>
          </ul>
          <div className="bookAppointment d-flex mt-2">
            {/* <button type="button" className="btn btn-primary" onClick={bookAppointment}>Book Appointment</button> */}
            <AppointmentForm doctor={doctor}></AppointmentForm>
            <div className="d-flex p-1 mx-auto">
              <i className="fa-regular fa-bookmark"></i>
            </div>
          </div>
          <ul className="social-profiles list-unstyled mt-2 mb-0">
            <li className="mt-2 list-inline-item"><a href="#" className="btn btn-icon btn-pills btn-soft-primary"><i className="fa-brands fa-facebook"></i></a></li>
            <li className="mt-2 list-inline-item"><a href="#" className="btn btn-icon btn-pills btn-soft-primary"><i className="fa-brands fa-linkedin-in"></i></a></li>
            <li className="mt-2 list-inline-item"><a href="#" className="btn btn-icon btn-pills btn-soft-primary"><i className="fa-brands fa-github"></i></a></li>
            <li className="mt-2 list-inline-item"><a href="#" className="btn btn-icon btn-pills btn-soft-primary"><i className="fa-brands fa-x-twitter"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
