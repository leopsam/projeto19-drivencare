import consultationRepositories from "../repositories/consultationRepositories.js";
import userRepositories from "../repositories/userRepositories.js";


async function createrConsultation({ doctor_id, patient_id, time, status }) {    
    const { rows: consultation } = await consultationRepositories.getConsultations();   
    if (!consultation) throw new Error("consultation exists")

    const { rows: [doctor] } = await consultationRepositories.doctorFindById(doctor_id); 
    if (!doctor) throw new Error("Doctor not exists")

    const { rows: [patient] } = await consultationRepositories.patientFindById(patient_id); 
    if (!patient) throw new Error("patient not exists")
   
    await consultationRepositories.create({ doctor_id, patient_id, time, status }); 
}

async function getConsultationByDoctorOrPatient({ id, status, type }) {
  if(type === 1){
    const { rows: consultation } = await consultationRepositories.getConsultationByPatient(id, status);   
    return consultation
    
  }else if(type === 2){
    const { rows: consultation } = await consultationRepositories.getConsultationByDoctor(id, status);   
    return consultation   
  }
}

async function putConsultationById({ id, status }) {
    const { rows: consultation } = await consultationRepositories.putConsultationById(id, status); 
    console.log(consultation) // rever
}

async function getConsultationByFinishedDoctorOrPatient({ id, status, type }) {
  if(type === 1){
    const { rows: consultation } = await consultationRepositories.getConsultationByFinished(id, status);   
    return consultation   

  }else if(type === 2){
    const { rows: consultation } = await consultationRepositories.getConsultationByFinished(id, status);   
    return consultation   
  }
}

export default {
  createrConsultation,
  getConsultationByDoctorOrPatient,
  putConsultationById,
  getConsultationByFinishedDoctorOrPatient
};