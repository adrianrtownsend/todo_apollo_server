import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696055518855 implements MigrationInterface {
    name = 'InitialMigration1696055518855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`visible\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`visible\``);
    }

}
