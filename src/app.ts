import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from './modules/user/user.route';

const app: Application = express();


//parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', UserRouter)

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: "Server Is Running"
  })
});

export default app;