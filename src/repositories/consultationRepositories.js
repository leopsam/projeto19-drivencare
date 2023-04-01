import connectionDb from "../config/database.js";

async function create({ doctor_id, patient_id, time, status }) {
  await connectionDb.query(
    `
        INSERT INTO consultations (doctor_id, patient_id, time, status)
        VALUES ($1, $2, $3, $4)
    `,
    [doctor_id, patient_id, time, status]
  );
}

async function getConsultationsByTime({time}) {
  return await connectionDb.query(
    `    
    SELECT * FROM consultations WHERE time = $1;
  `,
  [time]
  );
}

async function getConsultationByDoctor({id, status}) {
  return await connectionDb.query(
    `    
    SELECT consultations.id, consultations.status, consultations.time, users.name, doctors.specialty
    FROM consultations
    JOIN doctors ON consultations.doctor_id = doctors.id
    JOIN users ON doctors.user_id = users.id
    WHERE patient_id = $1 AND status = $2;
  `,
    [id, status]
  );
}

async function getConsultationByPatient({id}) {
  return await connectionDb.query(
    `    
    SELECT c.id, c.status, c.time, u.name, d.specialty
    FROM consultations c
    JOIN patients p ON c.patient_id = p.id
    JOIN users u ON p.user_id = u.id
    JOIN doctors d ON c.doctor_id = d.id
    WHERE doctor_id = $1;
  `,
    [id]
  );
}

async function putConsultationById(id, status) {
  return await connectionDb.query(
    `    
    UPDATE consultations
    SET status = $2
    WHERE id = $1;
    
  `,
    [id, status]
  );
}

async function getConsultationByDoctorFinished({id, status}) {
  return await connectionDb.query(
    `    
    SELECT c.status, c.time, u1.name as patient_name, u2.name as doctor_name, d.specialty
    FROM consultations c
    JOIN patients p ON c.patient_id = p.id
    JOIN users u1 ON p.user_id = u1.id
    JOIN doctors d ON c.doctor_id = d.id
    JOIN users u2 ON d.user_id = u2.id
    WHERE d.id = $1 AND c.status = $2  
  `,
  [id, status]
  );
}

async function getConsultationByPatientFinished({id, status}) {
  return await connectionDb.query(
    `    
    SELECT c.status, c.time, u1.name as patient_name, u2.name as doctor_name, d.specialty
    FROM consultations c
    JOIN patients p ON c.patient_id = p.id
    JOIN users u1 ON p.user_id = u1.id
    JOIN doctors d ON c.doctor_id = d.id
    JOIN users u2 ON d.user_id = u2.id
    WHERE p.id = $1 AND c.status = $2  
  `,
  [id, status]
  );
}

export default {
  create,
  getConsultationsByTime,
  getConsultationByDoctor,
  getConsultationByPatient,
  putConsultationById,
  getConsultationByDoctorFinished,
  getConsultationByPatientFinished
};