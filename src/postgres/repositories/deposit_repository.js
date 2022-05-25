const connectionPool = require("../connection_pool");
const DepositMapper = require("../mapping/deposit_mapper");

const TABLE_NAME = "DEPOSIT";

const create = async newDeposit => {
  const client = await connectionPool.connectionPool.connect();

  try {
    const { rows } = await client.query(
      "INSERT INTO " +
        TABLE_NAME +
        " (WALLET_ID, SENDER_ADDRESS, AMOUNT, MONTH, YEAR) VALUES ($1, $2, $3, $4) RETURNING *",
      [newDeposit.wallet_id, newDeposit.sender_address, newDeposit.amount, newDeposit.month, newDeposit.year],
    );

    return DepositMapper.mapToDeposit(rows[0]);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

const findAll = async () => {
  const client = await connectionPool.connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT * FROM " + TABLE_NAME);

    return DepositMapper.mapToDepositArray(rows);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

const findById = async id => {
  const client = await connectionPool.connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT * FROM " + TABLE_NAME + " WHERE ID = $1", [id]);

    if (rows[0]) {
      return DepositMapper.mapToDeposit(rows[0]);
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
  const client = await connectionPool.connectionPool.connect();

  try {
    await client.query("DELETE FROM " + TABLE_NAME + " WHERE ID = $1", [id]);
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
  remove,
};
