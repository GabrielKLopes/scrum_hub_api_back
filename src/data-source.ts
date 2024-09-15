import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'



export const AppDataSource = new DataSource({
    type:"postgres",
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE,
    username: process.env.USER,
    password: process.env.PASSWORD,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    
    subscribers: [],
})
