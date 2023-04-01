import userServices from "../services/userService.js";
import chalk from 'chalk';

async function signup(req, res) {
  console.log(chalk.blue(`Running signup`)) 
  const { name, email, password, type } = req.body;

  try {
    await userServices.signup({name, email, password, type})
    return res.sendStatus(201);

  } catch (err) {
    return res.status(500).send(err.message);
  }  
}

async function signin(req, res) {
  console.log(chalk.blue(`Running signin`)) 
  const { email, password } = req.body;

  try {
    const token = await userServices.signin({ email, password });
    return res.send({ token });

  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function typeUser(req, res) {
  console.log(chalk.blue(`Running typeUser`))
  const { id } = req.params;
  const { location, specialty } = req.body; 

  try {
    await userServices.typeUser({id, location, specialty})
    return res.sendStatus(201);

  } catch (err) {
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
  console.log(chalk.blue(`Running doctorById`)) 
  const { id } = req.params; 

  try {
    const doctor = await userServices.doctorHoraryById({id})
    return res.status(200).send(doctor)

  } catch (err) {
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