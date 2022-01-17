import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1642416249710 implements MigrationInterface {
    name = 'Init1642416249710';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`content\` (\`id\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`type\` enum ('movie', 'playlist', 'bundle', 'livestream') NOT NULL, \`duration\` int NULL, \`ctype\` varchar(255) NOT NULL, INDEX \`IDX_552d0204d1c654b991f3b69567\` (\`ctype\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_552d0204d1c654b991f3b69567\` ON \`content\``);
        await queryRunner.query(`DROP TABLE \`content\``);
    }
}
