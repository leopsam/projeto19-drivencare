import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories.js";
import consultationRepositories from "../repositories/consultationRepositories.js";
import { v4 as uuidV4 } from "uuid";
import horary from '../utils/constantes.js'
import moment from 'moment';

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
      const { rows: [patient] } = await userRepositories.patientFindByIdUser(id);   
      if (patient) throw new Error("Patient already exists")  

      await userRepositories.createPatient({ user_id: id });  

  } else  if (user.type === 1){
      const { rows: [doctor] } = await userRepositories.doctorFindByIdUser(id); 
      if (doctor) throw new Error("Doctor already exists")

      await userRepositories.createDoctor({ location, user_id: id, specialty });

  } else{
    throw new Error("user type error");
  }  
}

async function searchDotor({ name, location, specialty }) {

  if(name) {

    const {rowCount, rows: doctor} = await userRepositories.searchDoctorByName(name);
    if (!rowCount) throw new Error("There is no information on the doctor with that name");
    return doctor;

  }else if(location){

    const {rowCount, rows: doctor} = await userRepositories.searchDoctorByLocation(location);
    if (!rowCount) throw new Error("There is no information from the doctor with this location");
    return doctor;

  }else if(specialty){
    
    const {rowCount, rows: doctor} = await userRepositories.searchDoctorBySpecialty(specialty);
    if (!rowCount) throw new Error("there is no information on the doctor with this specialty");
    return doctor;

  }else{
    throw new Error("No search parameter found");
  }  
}

async function doctorHoraryById({ id }) {
  const { rowCount, rows: [doctor] } = await userRepositories.doctorById(id); 
  
  if (!rowCount) throw new Error("doctor id does not exist");
  return ([doctor, horary]);
}

export default {
  signup,
  signin,
  typeUser,
  searchDotor,
  doctorHoraryById
};