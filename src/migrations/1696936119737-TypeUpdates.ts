import { MigrationInterface, QueryRunner } from "typeorm";

export class TypeUpdates1696936119737 implements MigrationInterface {
    name = 'TypeUpdates1696936119737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`visible\` \`isPrivate\` tinyint NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`user_following\` (\`userId\` int NOT NULL, \`followingId\` int NOT NULL, INDEX \`IDX_06680b0cdf84b1d8a690e22176\` (\`userId\`), INDEX \`IDX_b88ad49e84034c506d3c0ae742\` (\`followingId\`), PRIMARY KEY (\`userId\`, \`followingId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_following\` ADD CONSTRAINT \`FK_06680b0cdf84b1d8a690e221763\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_following\` ADD CONSTRAINT \`FK_b88ad49e84034c506d3c0ae7422\` FOREIGN KEY (\`followingId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_following\` DROP FOREIGN KEY \`FK_b88ad49e84034c506d3c0ae7422\``);
        await queryRunner.query(`ALTER TABLE \`user_following\` DROP FOREIGN KEY \`FK_06680b0cdf84b1d8a690e221763\``);
        await queryRunner.query(`DROP INDEX \`IDX_b88ad49e84034c506d3c0ae742\` ON \`user_following\``);
        await queryRunner.query(`DROP INDEX \`IDX_06680b0cdf84b1d8a690e22176\` ON \`user_following\``);
        await queryRunner.query(`DROP TABLE \`user_following\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isPrivate\` \`visible\` tinyint NOT NULL`);
    }

}
