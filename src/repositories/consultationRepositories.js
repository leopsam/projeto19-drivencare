import connectionDb from "../config/database.js";

async function create({ name, email, password, type }) {
  await connectionDb.query(
    `
        INSERT INTO consultations (name, email, password, type)
        VALUES ($1, $2, $3, $4)
    `,
    [name, email, password, type]
  );
}



export default {
  create,
};