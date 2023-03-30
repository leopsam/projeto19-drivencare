import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories.js";
import { v4 as uuidV4 } from "uuid";
import chalk from 'chalk';

async function signup({ name, email, password, type }) {
  const { rowCount } = await userRepositories.findByEmail(email);
  if (rowCount) throw new Error("User already exists");

  const hashPassword = await bcrypt.hash(password, 10);
  await userRepositories.create({ name, email, password: hashPassword, type });
}

async function signin({ email, password }) {
  const { rowCount, rows: [user] } = await userRepositories.findByEmail(email);
  if (!rowCount) throw new Error("Incorrect email or password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Incorrect email or password");

  const token = uuidV4();
  await userRepositories.createSession({ token, user_id: user.id });

  return token;
}

async function typeUser({ id, location, specialty }) {
  const { rowCount, rows: [user] } = await userRepositories.findById(id);
  if (!rowCount) throw new Error(`User does not exist, id - ${id} not found`);

  if (user.type === 2){
      console.log(chalk.magenta(`patient type user - id = ${id}`)) //delete line after 

      const { rows: [patient] } = await userRepositories.patientFindById(id);   
      if (patient) throw new Error("Patient already exists")  

      await userRepositories.createPatient({ user_id: id });  

  } else  if (user.type === 1){
      console.log(chalk.magenta(`medical type user - id = ${id}`)) //delete line after

      const { rows: [doctor] } = await userRepositories.doctorFindById(id); 
      if (doctor) throw new Error("Doctor already exists")

      await userRepositories.createDoctor({ location, user_id: id, specialty });

  } else{
    throw new Error("user type error");
  }  
}

export default {
  signup,
  signin,
  typeUser
};