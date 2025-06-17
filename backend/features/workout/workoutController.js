// import userService from './workoutService.js'
import express from 'express'
import prisma from '../../config/prisma.js'

const workoutController = {
    store: async (req, res) => {
        try {
            
        } catch (e) {
            return res.status(400).json({message: "Invalid Input"})
        }
    },

    show: async (req, res) => {

    },

    update: async (req, res) => {

    },

    destroy: async (req, res) => {

    }
}

export default workoutController;