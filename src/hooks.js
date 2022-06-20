const verifyRoleHeader = (req, reply, done) => {
  if (req.headers.role !== "admin") {
    reply.code(403).send({ message: "Unauthorized, role is not admin" });
  }
  done();
};

module.exports = verifyRoleHeader;
