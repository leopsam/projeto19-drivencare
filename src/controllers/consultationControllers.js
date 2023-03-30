import consultationService from "../services/consultationService.js";
import chalk from 'chalk';

async function createrConsultation(req, res) {
  console.log(chalk.blue(`Running creater consultation`)) //delete line after
  return "ok"
}

export default {
  createrConsultation,
};