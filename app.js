const fs = require('fs')
const express = require('express');
const morgan = require('morgan');


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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


//  2. Routes handler
const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        result: tours.length, 
        data: {
            tours,
        }
    })
}

const getTourById = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    const tour = tours.find(el => el.id === id);
    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        }
    })
}

const createTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
        data: {
            tours: newTour,
        }
        })
    })
}

const updateTour = (req, res) => {
    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here>'
        }
    })
}

const deleteTour =  (req, res) => {
    if(req.params.id * 1 > tours.length) {
        return res.status(204).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}

const getAllUsers = (req, res) => {
    res.status(500).json( {
        status: 'error',
        message: 'Server Error'
    })
}

const createUser = (req, res) => {
    res.status(500).json( {
        status: 'error',
        message: 'Server Error'
    })
}
const getUserById = (req, res) => {
    res.status(500).json( {
        status: 'error',
        message: 'Server Error'
    })
}
const updateUser = (req, res) => {
    res.status(500).json( {
        status: 'error',
        message: 'Server Error'
    })
}
const deleteUser = (req, res) => {
    res.status(500).json( {
        status: 'error',
        message: 'Server Error'
    })
}

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTourById)
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3. Route
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
.route('/')
.get(getAllTours)
.post(createTour)

tourRouter
.route('/:id')
.get(getTourById)
.patch(updateTour)
.delete(deleteTour);
userRouter.route('/')
.get(getAllUsers)
.post(createUser);
userRouter.route('/:id')
.get(getUserById)
.patch(updateUser)
.delete(deleteUser);

// Mount the routers on specific routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4. Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
