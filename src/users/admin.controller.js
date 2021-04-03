const express = require('express');
const router = express.Router();
const users = require('./users.service');
const asyncHandler = require('express-async-handler');
const { Unauthorized } = require('http-errors')
const utils = require('..commons/util')

router.patch('/unlock-user/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    if(req.user.role !== utils.ADMIN_ROLE){
        throw new Unauthorized('Not authorized!')
    }

    const result = await users.update(id, req.body);
    res.json(result);
    res.status(200).json({message:'User has successfully been locked!'});

}))

router.patch('/unlock-user/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    if(req.user.role !== utils.ADMIN_ROLE){
        throw new Unauthorized('Not authorized!')
    }
    const result = await users.update(id, req.body);
    res.json(result);
    res.status(200).json({message:'User has successfully been locked!'});

}))