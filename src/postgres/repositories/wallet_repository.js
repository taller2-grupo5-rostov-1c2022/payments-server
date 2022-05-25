const connectionPool = require("../connection_pool");
const WalletMapper = require("../mapping/wallet_mapper");

const TABLE_NAME = "WALLET";

const create = async newWallet => {
  const client = await connectionPool.connectionPool.connect();

  try {
    const { rows } = await client.query(
      "INSERT INTO " + TABLE_NAME + " (USER_ID, PRIVATE_KEY, ADDRESS) VALUES ($1, $2, $3) RETURNING *",
      [newWallet.user_id, newWallet.private_key, newWallet.address],
    );

    return WalletMapper.mapToWallet(rows[0]);
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

    return WalletMapper.mapToWalletArray(rows);
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
    console.log("wallet_repository found ", JSON.stringify(rows));

    if (rows[0]) {
      console.log("wallet_repository will return ", JSON.stringify(WalletMapper.mapToWallet(rows[0])));
      return WalletMapper.mapToWallet(rows[0]);
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

const count = async () => {
  const client = await connectionPool.connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT COUNT(*) FROM " + TABLE_NAME);

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

module.exports = {
  create,
  findAll,
  findById,
  remove,
  count,
};
