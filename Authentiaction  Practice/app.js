import 'dotenv/config'
import express from 'express'
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import authMiddleware from './middleware/authMiddleware.js'
import expenseRoute from './routes/expenseRoute.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);
app.use('/api/expense', authMiddleware, expenseRoute);   //yaha se authMiddleware laga lena
app.use('/',(req, res)=>{
    res.status(200).send('server is running')
});

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: 'Request body contains invalid JSON. Please send valid JSON or form data.'
        });
    }

    next(err);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, ()=>{
        console.log(`Server is listening on http://localhost: ${PORT}`);
    });
};

startServer();