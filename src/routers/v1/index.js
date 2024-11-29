const express = require('express');
const router = express.Router();
const userRouter = require('./userRoutes')
const customerRouter = require('./customerRoutes')
const adminRoutes = require('./adminRoutes')
const categoryRoutes = require('./categoryRoutes')
const itemRoutes = require('./itemRoutes')
const authRoutes = require('./authRoutes')

router.use('/users', userRouter)
router.use('/customers', customerRouter)
router.use('/admins', adminRoutes);
router.use('/categories',categoryRoutes)
router.use('/items', itemRoutes)
router.use('/auth', authRoutes);

module.exports = router