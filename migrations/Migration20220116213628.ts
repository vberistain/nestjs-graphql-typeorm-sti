import { Migration } from '@mikro-orm/migrations';

export class Migration20220116213628 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            "create table `content` (`id` int unsigned not null auto_increment primary key, `title` varchar(255) not null, `description` varchar(255) null, `type` enum('content', 'movie') not null, `duration` int(11) null) default character set utf8mb4 engine = InnoDB;"
        );
        this.addSql('alter table `content` add index `content_type_index`(`type`);');
    }
}
