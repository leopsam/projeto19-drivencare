import connectionDb from "../config/database.js";

//user's repositories

async function findByEmail(email) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE email=$1
  `,
    [email]
  );
}

async function create({ name, email, password, type }) {
  await connectionDb.query(
    `
        INSERT INTO users (name, email, password, type)
        VALUES ($1, $2, $3, $4)
    `,
    [name, email, password, type]
  );
}

async function findById(id) {
  return await connectionDb.query(
    `    
    SELECT * FROM users WHERE id=$1
  `,
    [id]
  );
}

//session's repositories

async function createSession({ token, user_id }) {
  await connectionDb.query(
    `
        INSERT INTO sessions (token, user_id)
        VALUES ($1, $2)
    `,
    [token, user_id]
  );
}

async function findSessionByToken(token) {

  return await connectionDb.query(
    `
        SELECT * FROM sessions WHERE token = $1
    `,
    [token]
  );
}

//doctor's repositories

async function doctorFindById(id) {
  return await connectionDb.query(
    `    
    SELECT * FROM doctors WHERE id=$1
  `,
    [id]
  );
}

async function createDoctor({ location, user_id, specialty }) {  
await connectionDb.query(
  `
      INSERT INTO doctors (location, user_id, specialty)
      VALUES ($1, $2, $3)
  `,
  [location, user_id, specialty]
);
}

async function doctorFindByIdUser(id) {
return await connectionDb.query(
  `    
  SELECT * FROM doctors WHERE user_id=$1
`,
  [id]
);
}

async function searchDoctorByLocation(location) {
return await connectionDb.query(
  `
  SELECT doctors.id, users.name, doctors.location, doctors.specialty 
  FROM doctors 
  JOIN users ON doctors.user_id = users.id
  WHERE doctors.location = $1
`,
  [location]
);
}

async function searchDoctorByName(name) {
return await connectionDb.query(
  `
  SELECT doctors.id, users.name, doctors.location, doctors.specialty 
  FROM doctors 
  JOIN users ON doctors.user_id = users.id
  WHERE users.name = $1
`,
  [name]
);
}

async function searchDoctorBySpecialty(specialty) {
return await connectionDb.query(
  `
  SELECT doctors.id, users.name, doctors.location, doctors.specialty 
  FROM doctors 
  JOIN users ON doctors.user_id = users.id
  WHERE doctors.specialty = $1
`,
  [specialty]
);
}

async function doctorById(id) {
return await connectionDb.query(
  `    
  SELECT doctors.id, users.name, doctors.location, doctors.specialty 
  FROM doctors 
  JOIN users ON doctors.user_id = users.id
  WHERE doctors.id = $1
`,
  [id]
);
}

//patient's repositories

async function patientFindById(id) {
  return await connectionDb.query(
    `    
    SELECT * FROM patients WHERE id=$1
  `,
    [id]
  );
}

async function createPatient({ user_id }) {  
  await connectionDb.query(
    `
        INSERT INTO patients (user_id)
        VALUES ($1)
    `,
    [user_id]
  );
}

async function patientFindByIdUser(id) {
  return await connectionDb.query(
    `    
    SELECT * FROM patients WHERE user_id=$1
  `,
    [id]
  );
}

export default {
  findByEmail,
  create,
  createSession,
  findById,
  findSessionByToken,
  doctorFindById, 
  createDoctor,
  doctorFindByIdUser,
  searchDoctorByLocation,
  searchDoctorByName,
  searchDoctorBySpecialty,
  doctorById,
  patientFindById,
  createPatient,
  patientFindByIdUser
};