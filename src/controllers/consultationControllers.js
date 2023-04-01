import consultationService from "../services/consultationService.js";
import chalk from 'chalk';

async function createrConsultation(req, res) {
  console.log(chalk.blue(`Running createrConsultation`))
  const { doctor_id, time } = req.body;  
  const { id } = res.locals.user; 
  const status = "scheduled"

  try {
    await consultationService.createrConsultation({doctor_id, patient_id: id, time, status})
    return res.sendStatus(201);

  } catch (err) {
    return res.status(500).send(err.message);
  } 
}

async function getConsultationByTypeUser(req, res) {
  console.log(chalk.blue(`Running getConsultationByTypeUser`))
  
  const { id, type } = res.locals.user; 
  const status = "scheduled"

  try {
    const consultations = await consultationService.getConsultationByDoctorOrPatient({id, status, type})
    return res.status(200).send(consultations)

  } catch (err) {
    return res.status(500).send(err.message);
  } 
}

async function putConsultationById(req, res) {
  console.log(chalk.blue(`Running putConsultationById`))
  const { id } = req.params; 
  const {status} = req.body; 

  try {
    const consultations = await consultationService.putConsultationById({id, status })
    return res.status(200).send(consultations)

  } catch (err) {
    return res.status(500).send(err.message);
  } 
}

async function getConsultationByFinished(req, res) {
  console.log(chalk.blue(`Running getConsultationByFinished`))  
  const { id, type } = res.locals.user; 
  const status = "finished"

  try {
    const consultations = await consultationService.getConsultationByFinishedDoctorOrPatient({id, status, type})
    return res.status(200).send(consultations)

  } catch (err) {
    return res.status(500).send(err.message);
  } 
}

export default {
  createrConsultation,
  getConsultationByTypeUser,
  putConsultationById,
  getConsultationByFinished
};