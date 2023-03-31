import connectionDb from "../config/database.js";

async function create({ doctor_id, patient_id, time }) {
  await connectionDb.query(
    `
        INSERT INTO consultations (doctor_id, patient_id, time)
        VALUES ($1, $2, $3)
    `,
    [doctor_id, patient_id, time]
  );
}

async function doctorFindById(id) {
  return await connectionDb.query(
    `    
    SELECT * FROM doctors WHERE id=$1
  `,
    [id]
  );
}

async function patientFindById(id) {
  return await connectionDb.query(
    `    
    SELECT * FROM patients WHERE id=$1
  `,
    [id]
  );
}

export default {
  create,
  doctorFindById,
  patientFindById
};