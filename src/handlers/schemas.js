const Role = {
  type: "object",
  properties: {
    role: { type: "string", enum: ["admin", "listener", "artist"] },
  },
};

module.exports = { Role };
