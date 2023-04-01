import consultationRepositories from "../repositories/consultationRepositories.js";
import userRepositories from "../repositories/userRepositories.js";
import moment from 'moment';

async function createrConsultation({ doctor_id, patient_id, time, status }) { 
  const parsedDate = moment(time, "DD/MM/YYYY - HH:mm").toDate();

  const { rows: [doctor] } = await userRepositories.doctorFindById(doctor_id); 
  if (!doctor) throw new Error("Doctor not exists")

  const { rows: consultation } = await consultationRepositories.getConsultationsByTime({time: parsedDate});  
  if (consultation.length !== 0) throw new Error("consultation exists") 

  const { rows: [patientByUser] } = await userRepositories.patientFindByIdUser(patient_id); 
  if (!patientByUser) throw new Error("patient not exists")
   
  await consultationRepositories.create({ doctor_id, patient_id:patientByUser.id, time: parsedDate, status }); 
}

async function getConsultationByDoctorOrPatient({ id, status, type }) {
  console.log(id, status, type)
  if(type === 1){
    const { rows: [doctorByUser] } = await userRepositories.doctorFindByIdUser(id);    
    const idUser = JSON.stringify(doctorByUser.id)
    const { rows: consultation } = await consultationRepositories.getConsultationByPatient({id:idUser, status});   
    return consultation
    
  }else if(type === 2){
    const { rows: [patientByUser] } = await userRepositories.patientFindByIdUser(id);    
    const idUser = JSON.stringify(patientByUser.id)
    const { rows: consultation } = await consultationRepositories.getConsultationByDoctor({id:idUser, status});   
    return consultation   
  }
}

async function putConsultationById({ id, status }) {
    if(!status) throw new Error("add a status to edit")
    await consultationRepositories.putConsultationById(id, status); 
}

async function getConsultationByFinishedDoctorOrPatient({ id, status, type }) {
  if(type === 1){
    const { rows: [doctorByUser] } = await userRepositories.doctorFindByIdUser(id);    
    const idUser = JSON.stringify(doctorByUser.id)
    const { rows: consultation } = await consultationRepositories.getConsultationByDoctorFinished({id:idUser, status});   
    return consultation   

  }else if(type === 2){
    const { rows: [patientByUser] } = await userRepositories.patientFindByIdUser(id);    
    const idUser = JSON.stringify(patientByUser.id)
    const { rows: consultation } = await consultationRepositories.getConsultationByPatientFinished({id:idUser, status});   
    return consultation   
  }
}

export default {
  createrConsultation,
  getConsultationByDoctorOrPatient,
  putConsultationById,
  getConsultationByFinishedDoctorOrPatient
};