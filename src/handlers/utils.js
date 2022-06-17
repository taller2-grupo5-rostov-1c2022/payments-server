const verify_role_header = (req, reply) => {
  if (!req.headers.role || req.headers.role !== "admin") {
    reply.code(403).send({ message: "Unauthorized, role is not admin" });
  }
};

module.exports = { verify_role_header };
