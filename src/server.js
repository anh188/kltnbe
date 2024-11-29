const express = require('express');
require('dotenv').config();
const { connect } = require('./config/mongodb/index');
connect();
const app = express();
const port = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser")
const API_V1 = require('./routers/v1');
const errorHandle = require('./middlewares/errorHandler');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const upload = multer(); 

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Domain client
    credentials: true,              // Cho phép gửi cookie hoặc credentials
}));
app.use(cookieParser());
app.use(express.json());
app.use(upload.none());
// Sử dụng API_V1 cho các route `/v1`
app.use('/v1', API_V1);
app.use(express.urlencoded({ extended: true })); 
app.use(errorHandle)
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
