import express from 'express';
import { AppDataSource } from './data-source';
import { routes } from './routes/index.routes';
import cors from 'cors';

AppDataSource.initialize().then(() =>{
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) =>{
        return res.json('aplicação rodando na porta 3000');
    })

    app.use(routes);
    return app.listen(process.env.PORT);
})