import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateURLsTable1733109107157 } from "./migrations/1733109107157-CreateURLsTable";
//import URL from "src/app/entities/URL";
import URL from "../app/entities/URL";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "encurtador",
    synchronize: true,
    logging: false,
    entities: [URL],
    migrations: [CreateURLsTable1733109107157],
    subscribers: [],
})
