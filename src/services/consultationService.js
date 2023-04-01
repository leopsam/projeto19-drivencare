import consultationRepositories from "../repositories/consultationRepositories.js";
import userRepositories from "../repositories/userRepositories.js";


async function createrConsultation({ doctor_id, patient_id, time, status }) {
    
    const { rows: consultation } = await consultationRepositories.getConsultations(); 
    //console.log(consultation.map((c)=>(c.time))) //delete line after
     console.log(consultation) //delete line after
   
    if (!consultation) throw new Error("consultation exists")

    const { rows: [doctor] } = await consultationRepositories.doctorFindById(doctor_id); 
    console.log(doctor) //delete line after
    if (!doctor) throw new Error("Doctor not exists")

    const { rows: [patient] } = await consultationRepositories.patientFindById(patient_id); 
    console.log(patient) //delete line after
    if (!patient) throw new Error("patient not exists")
   
    await consultationRepositories.create({ doctor_id, patient_id, time, status });  

}

async function getConsultationByDoctorOrPatient({ id, status, type }) {
  if(type === 1){

    const { rows: consultation } = await consultationRepositories.getConsultationByPatient(id, status);   
    console.log("sou medico")
    console.log(consultation)

    return consultation   

  }else if(type === 2){

    const { rows: consultation } = await consultationRepositories.getConsultationByDoctor(id, status);   
    console.log("sou paciente")
    console.log(consultation) 

    return consultation   
  }
}

async function putConsultationById({ id, status }) {

    const { rows: consultation } = await consultationRepositories.putConsultationById(id, status);   
    
    console.log(consultation)

}

async function getConsultationByFinishedDoctorOrPatient({ id, status, type }) {
  if(type === 1){

    const { rows: consultation } = await consultationRepositories.getConsultationByFinished(id, status);   
    console.log("sou medico finisherrrrrrrrrrrrrr")
    console.log(status)
    console.log(consultation)

    return consultation   

  }else if(type === 2){

    const { rows: consultation } = await consultationRepositories.getConsultationByFinished(id, status);   
    console.log("sou paciente finisherrrrrrrrrrrrrr")
    console.log(status)
    console.log(consultation) 

    return consultation   
  }
}

export default {
  createrConsultation,
  getConsultationByDoctorOrPatient,
  putConsultationById,
  getConsultationByFinishedDoctorOrPatient
};