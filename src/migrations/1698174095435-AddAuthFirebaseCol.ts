import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthFirebaseCol1698174095435 implements MigrationInterface {
    name = 'AddAuthFirebaseCol1698174095435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`auth_firebase_uid\` \`auth_firebase_uid\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`auth_firebase_uid\` \`auth_firebase_uid\` varchar(255) NOT NULL`);
    }

}
