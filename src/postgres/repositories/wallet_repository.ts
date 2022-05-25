import { Wallet } from "../../models/wallet";
import { connectionPool } from "../connection_pool";
import * as WalletMapper from "../entities/wallet";

const TABLE_NAME = "WALLET";

export const create = async (newWallet: Wallet): Promise<Wallet> => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query(
      "INSERT INTO " + TABLE_NAME + " (USER_ID, PRIVATE_KEY, ADDRESS) VALUES ($1, $2, $3) RETURNING *",
      [newWallet.user_id, newWallet.privateKey, newWallet.address],
    );

    return WalletMapper.mapToWallet(rows[0]);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

export const findAll = async (): Promise<Wallet[]> => {
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

export const findById = async (id: number): Promise<Wallet | null> => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT * FROM " + TABLE_NAME + " WHERE ID = $1", [id]);

    if (rows[0]) {
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

export const remove = async (id: number): Promise<void> => {
  const client = await connectionPool.connect();

  try {
    await client.query("DELETE FROM " + TABLE_NAME + " WHERE ID = $1", [id]);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

export const count = async (): Promise<any | null> => {
  const client = await connectionPool.connect();

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
