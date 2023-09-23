

import User from '../models/use.model.js'
import bcrypt from 'bcryptjs';

import {createAccessToken} from '../libs/jwt.js'
import { now } from 'mongoose';
import jwt from 'jsonwebtoken';

import {TOKEN_SECRET} from '../config.js'


export const register= async (req, res)=>{

    const {email, password, username}= req.body
    
    try{

        const userFound = await User.findOne({email});
        if(userFound) 
        return res.status(400).json( ["the email address in use"])

        const passwordHash= await bcrypt.hash(password, 10)
        const newUser= new User({
            username,
            email,
            password: passwordHash,

        })
        const userSaved= await newUser.save();
        const token = await createAccessToken({id: userSaved._id})
        res.cookie("token", token);
        
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
            
        })
        

    } catch(error){
        res.status(500).json({message: error.message})
        

    }
    

    
    
};




export const login= async (req, res)=>{

    const {email, password}= req.body
    
    try{

        const UserFound = await User.findOne({email})
        if(!UserFound) return res.status(404).json({message: "user not found)"})

        const isMatch= await bcrypt.compare(password, UserFound.password)
        if(!isMatch) return res.status(404).json({message: "Incorrect password"})

        const token = await createAccessToken({id: UserFound._id})
        res.cookie('token', token);
        
        // const userSaved= await newUser.save();
        
        
        
        res.json({
            id: UserFound._id,
            username: UserFound.username,
            email: UserFound.email,
            createdAt: UserFound.createdAt,
            updatedAt: UserFound.updatedAt
            
        })
        

    } catch(error){
        res.status(500).json({message: error.message})
        

    }
    

    
    
};


export const logout= (req, res)=>{
    res.cookie('token', "",{
        expires: new Date(0)
    })

    return res.sendStatus(200)

}

export const profile=  async (req, res)=>{
    const userFound= await User.findById(req.user.id)
    if(!userFound) return res.sendStatus(400).json({message: "User not found"})

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })

    res.send('profile')

    
}

export const verifyToken = async (req, res) => {
    const {token}= req.cookies

    if(!token) return res.status(401).json({message: "Unathorized"})

    jwt.verify(token,  TOKEN_SECRET, async (err, res)=>{
        if(err) return res.status(401).json({message: "unathorized"})

        const userFound= await User.findById(User.id)

        
        if(!userFound) return res.status(401).json({message: "Unathorized"})

        return res.json({
            id: userFound.user.id,
            username: userFound.username,
            email: userFound.email


        })
    })

    
}