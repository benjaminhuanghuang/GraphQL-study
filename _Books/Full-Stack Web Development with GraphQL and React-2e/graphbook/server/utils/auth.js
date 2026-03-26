export async function getUserFromReq(req) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return null;

  try {
    const user = verifyJwt(token);
    return user;
  } catch {
    return null;
  }
}
