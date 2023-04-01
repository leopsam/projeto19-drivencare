import userServices from "../services/userService.js";
import chalk from 'chalk';

async function signup(req, res) {
  console.log(chalk.blue(`Running signup user`)) //delete line after

  const { name, email, password, type } = req.body;

  try {
    await userServices.signup({name, email, password, type})

    console.log(chalk.yellow(`Signup user ok`)) //delete line after
    return res.sendStatus(201);
  } catch (err) {

    console.log(chalk.red(`Signup user error`)) //delete line after
    return res.status(500).send(err.message);
  }  
}

async function signin(req, res) {
  console.log(chalk.blue(`Running signin user`)) //delete line after

  const { email, password } = req.body;

  try {
    const token = await userServices.signin({ email, password });

    console.log(chalk.yellow(`Signin user ok`)) //delete line after
    return res.send({ token });
  } catch (err) {

    console.log(chalk.red(`Signin user error`)) //delete line after
    return res.status(500).send(err.message);
  }
}

async function typeUser(req, res) {
  console.log(chalk.blue(`Running typeUser user`)) //delete line after

  const { id } = req.params;
  const { location, specialty } = req.body; 

  try {
    await userServices.typeUser({id, location, specialty})

    console.log(chalk.yellow(`typeUser user ok`)) //delete line after
    return res.sendStatus(201);
  } catch (err) {

    console.log(chalk.red(`typeUser user error`)) //delete line after
    return res.status(500).send(err.message);
  }  
}

async function searchDotor(req, res) {
  console.log(chalk.blue(`Running searchDotor user`)) //delete line after

  const { name, location, specialty } = req.body; 

  try {
   const search = await userServices.searchDotor({name, location, specialty})

    console.log(chalk.yellow(`searchDotor user ok`)) //delete line after
    return res.status(200).send(search)
  } catch (err) {

    console.log(chalk.red(`searchDotor user error`)) //delete line after
    return res.status(500).send(err.message);
  }  
}

async function doctorById(req, res) {
  console.log(chalk.blue(`Running doctorById user`)) //delete line after

  const { id } = req.params; 

  try {
   const doctor = await userServices.doctorHoraryById({id})

    console.log(chalk.yellow(`doctorById user ok`)) //delete line after
    return res.status(200).send(doctor)
  } catch (err) {

    console.log(chalk.red(`doctorById user error`)) //delete line after
    return res.status(500).send(err.message);
  }  
}

export default {
  signup,
  signin,
  typeUser,
  searchDotor,
  doctorById
};