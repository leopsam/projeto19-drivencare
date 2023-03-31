import consultationRepositories from "../repositories/consultationRepositories.js";
import userRepositories from "../repositories/userRepositories.js";


  async function createrConsultation({ doctor_id, patient_id, time }) {
    
    const { rows: [doctor] } = await consultationRepositories.doctorFindById(doctor_id); 
    console.log(doctor) //delete line after
    if (!doctor) throw new Error("Doctor not exists")

    const { rows: [patient] } = await consultationRepositories.patientFindById(patient_id); 
    console.log(patient) //delete line after
    if (!patient) throw new Error("patient not exists")
   
    await consultationRepositories.create({ doctor_id, patient_id, time });  

  }


export default {
  createrConsultation,
};