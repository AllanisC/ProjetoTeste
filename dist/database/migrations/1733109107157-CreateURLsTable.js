"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateURLsTable1733109107157 = void 0;
const typeorm_1 = require("typeorm");
class CreateURLsTable1733109107157 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'urls',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'original_url',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'alias',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'shortened_url',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'access_count',
                    type: 'int',
                    default: 0
                }
            ]
        }));
    }
    async down(queryRunner) {
    }
}
exports.CreateURLsTable1733109107157 = CreateURLsTable1733109107157;
//# sourceMappingURL=1733109107157-CreateURLsTable.js.map