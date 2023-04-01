import consultationService from "../services/consultationService.js";
import chalk from 'chalk';

async function createrConsultation(req, res) {
  console.log(chalk.blue(`Running creater consultation`)) //delete line after

  const { doctor_id, time } = req.body;  
  const { id } = res.locals.user; 
  const status = "scheduled"

  try {
    await consultationService.createrConsultation({doctor_id, patient_id: id, time, status})

    console.log(chalk.yellow(`createrConsultation ok`)) //delete line after
    return res.sendStatus(201);
  } catch (err) {

    console.log(chalk.red(`createrConsultation error`)) //delete line after
    return res.status(500).send(err.message);
  } 
}

async function getConsultationByTypeUser(req, res) {
  console.log(chalk.blue(`Running getConsultation`)) //delete line after
  
  const { type } = res.locals.user; 
  const id = 8 // mudar isso
  const status = "scheduled"
  console.log(id, type)

  try {
    const consultations = await consultationService.getConsultationByDoctorOrPatient({id, status, type})

    console.log(chalk.yellow(`getConsultation ok`)) //delete line after
    return res.status(200).send(consultations)
  } catch (err) {

    console.log(chalk.red(`getConsultation error`)) //delete line after
    return res.status(500).send(err.message);
  } 
}

async function putConsultationById(req, res) {
  console.log(chalk.blue(`Running putConsultationById`)) //delete line after
  const { id } = req.params; 
  const {status} = req.body; 
  console.log(id, status)

  try {
    const consultations = await consultationService.putConsultationById({id, status })

    console.log(chalk.yellow(`getConsultation ok`)) //delete line after
    return res.status(200).send(consultations)
  } catch (err) {

    console.log(chalk.red(`getConsultation error`)) //delete line after
    return res.status(500).send(err.message);
  } 
}

async function getConsultationByFinished(req, res) {
  console.log(chalk.blue(`Running getConsultationByFinished`)) //delete line after
  
  const { type } = res.locals.user; 
  const id = 8 // mudar isso
  const status = "scheduled"
  console.log(id, type, status)

  try {
    const consultations = await consultationService.getConsultationByFinishedDoctorOrPatient({id, status, type})

    console.log(chalk.yellow(`getConsultationByFinished ok`)) //delete line after
    return res.status(200).send(consultations)
  } catch (err) {

    console.log(chalk.red(`getConsultationByFinished error`)) //delete line after
    return res.status(500).send(err.message);
  } 
}

export default {
  createrConsultation,
  getConsultationByTypeUser,
  putConsultationById,
  getConsultationByFinished
};