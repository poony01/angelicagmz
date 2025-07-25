// backend/utils/authMiddleware.js
export function checkAuth(req, res, next) {
  // exemplo básico (pode ser melhorado com JWT futuramente)
  const auth = req.headers.authorization;
  if (auth) {
    next();
  } else {
    res.status(401).json({ message: 'Não autorizado' });
  }
}
