import React from 'react';
import './DoctorProfile.css';
import StarRating from '../Shared/StarRating.js';

const bookAppointment = () => {
  console.log('Booking appointment button pressed');
  // Add your functionality here
};

const DoctorProfile = ({ doctor }) => {
  return (
    <div class="col-xl-3 col-lg-3 col-md-6">
      <div class="card team border-0 rounded shadow overflow-hidden">
        <div class="team-person position-relative overflow-hidden">
          <img src={`${doctor.profilePhoto}`} class="img-fluid" alt=""></img>
          {/* <ul class="list-unstyled team-like">
          <li><a href="#" class="btn btn-icon btn-pills btn-soft-danger"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart icons"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></a></li>
        </ul> */}
        </div>
        <div class="card-body">
          <a href="#" class="title text-dark h5 d-block mb-0"> {doctor.name} </a>
          <small class="text-muted speciality"> {doctor.title}, {doctor.speciality}</small> <br></br>
          <small class="text-muted experience"> {doctor.experience} years of experience</small>
          <StarRating rating={doctor.rating} />
          <ul class="list-unstyled mt-2 mb-0">
            <li class="d-flex">
              <i class="fa-solid fa-location-dot"></i>
              <small class="text-muted ms-2">{doctor.location}, India</small>
            </li>
            <li class="d-flex mt-2">
              <i class="fa-solid fa-clock"></i>
              <small class="text-muted ms-2">{doctor.timing}</small>
            </li>
            <li class="d-flex mt-2">
              <i class="fa-sharp fa-solid fa-indian-rupee-sign"></i>
              <small class="text-muted ms-2">{doctor.fees} {doctor.currency} / Visit</small>
            </li>
          </ul>
          <div class="bookAppointment d-flex mt-2">
            <button type="button" class="btn btn-primary" onClick={bookAppointment}>Book Appointment</button>
            <div class="d-flex p-1 mx-auto">
              <i class="fa-regular fa-bookmark"></i>
            </div>
          </div>
          <ul class="social-profiles list-unstyled mt-2 mb-0">
            <li class="mt-2 list-inline-item"><a href="#" class="btn btn-icon btn-pills btn-soft-primary"><i class="fa-brands fa-facebook"></i></a></li>
            <li class="mt-2 list-inline-item"><a href="#" class="btn btn-icon btn-pills btn-soft-primary"><i class="fa-brands fa-linkedin-in"></i></a></li>
            <li class="mt-2 list-inline-item"><a href="#" class="btn btn-icon btn-pills btn-soft-primary"><i class="fa-brands fa-github"></i></a></li>
            <li class="mt-2 list-inline-item"><a href="#" class="btn btn-icon btn-pills btn-soft-primary"><i class="fa-brands fa-x-twitter"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
