import consultationService from "../services/consultationService.js";
import chalk from 'chalk';

async function createrConsultation(req, res) {
  console.log(chalk.blue(`Running creater consultation`)) //delete line after

  const { doctor_id, time } = req.body;  
  const { id } = res.locals.user; 

  try {
    await consultationService.createrConsultation({doctor_id, patient_id: id, time})

    console.log(chalk.yellow(`createrConsultation ok`)) //delete line after
    return res.sendStatus(201);
  } catch (err) {

    console.log(chalk.red(`createrConsultation error`)) //delete line after
    return res.status(500).send(err.message);
  } 
}

export default {
  createrConsultation,
};