import userRepositories from "../repositories/userRepositories.js";
import chalk from 'chalk';

async function authValidation(req, res, next) {
  console.log(chalk.blue(`Passed Authentication Route`))
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("No token");

  try {
    const { rows: [session] } = await userRepositories.findSessionByToken(token);
    if (!session) return res.status(401).send("Session not found");

    const { rows: [user] } = await userRepositories.findById(session.user_id);
    if (!user) return res.status(401).send("User not found");

    res.locals.user = user;
    next();
    
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default { authValidation };