
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


const app = express();


//  1. Middleware
app.use(morgan('dev'))
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware!');
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})



//  2. Routes handler



// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTourById)
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// // 3. Route
// const tourRouter = express.Router();
// const userRouter = express.Router();




// Mount the routers on specific routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4. Start Server
module.exports = app;