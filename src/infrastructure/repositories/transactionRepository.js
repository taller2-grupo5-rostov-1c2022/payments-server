const connectionPool = require("../connectionPool");

const TABLE_NAME = "TRANSACTION";

const create = async newTransaction => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query(
      "INSERT INTO " +
        TABLE_NAME +
        " (ID, USER_ID, RECEIVER_ADDRESS, SENDER_ADDRESS, AMOUNT, DAY, MONTH, YEAR) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        newTransaction.id,
        newTransaction.user_id,
        newTransaction.receiver_address,
        newTransaction.sender_address,
        newTransaction.amount,
        newTransaction.day,
        newTransaction.month,
        newTransaction.year,
      ],
    );

    return rows;
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

const findAll = async () => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT * FROM " + TABLE_NAME);

    return rows;
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

const findById = async id => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT * FROM " + TABLE_NAME + " WHERE ID = $1", [id]);

    if (rows[0]) {
      return rows[0];
    } else {
      return null;
    }
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

const remove = async id => {
  const client = await connectionPool.connect();

  try {
    await client.query("DELETE FROM " + TABLE_NAME + " WHERE ID = $1", [id]);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

const findByUserId = async ({ userId }) => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT * FROM " + TABLE_NAME + " WHERE USER_ID = $1", [userId]);
    return rows;
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

module.exports = {
  create,
  findAll,
  findById,
  findByUserId,
  remove,
};
