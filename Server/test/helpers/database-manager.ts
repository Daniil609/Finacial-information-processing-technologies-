import { exec as childProcessExec } from 'child_process';
import { Sequelize, Op } from 'sequelize';
import { promisify } from 'util';
import { TEST_USER_ID } from '../constants';
import { models } from './dependencies';

const exec = promisify(childProcessExec);

export class DatabaseManager {
  sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      dialect: 'postgres',
      logging: false,
    });
  }

  async connect() {
    await this.sequelize.authenticate();
  }

  async disconnect(): Promise<void> {
    await this.sequelize.close();
  }

  async undoAllMigrations() {
    const commandToExecute = 'npm run migrate:undo:all';
    try {
      await exec(commandToExecute);
      console.log('DatabaseManager undoAllMigrations - done');
    } catch (error) {
      console.error('DatabaseManager undoAllMigrations error:');
      throw error;
    }
  }

  async applyAllMigrations() {
    const commandToExecute = 'npm run migrate';
    try {
      await exec(commandToExecute);
      console.log('DatabaseManager applyAllMigrations - done');
    } catch (error) {
      console.error('DatabaseManager applyAllMigrations error:');
      throw error;
    }
  }

  /**
   * Deletes all data from database except test user and it's permissions
   */
  async truncateAll() {
    await this.destroyModel(models.UserPermission, {
      where: { userId: { [Op.ne]: TEST_USER_ID } },
    });
    await this.destroyModel(models.User, {
      where: { id: { [Op.ne]: TEST_USER_ID } },
    });
  }

  private destroyModel(model, options: { where?: any } = {}) {
    const { where } = options;
    const destroyOptions = { where, force: true, logging: false };
    return model.destroy(destroyOptions);
  }
}
