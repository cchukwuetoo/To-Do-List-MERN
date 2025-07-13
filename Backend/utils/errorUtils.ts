import {Response } from 'express';
import { z } from 'zod';

export const sendError = (res: Response, statusCode: number, message: string, error?: any) => {
    res.status(statusCode).json({
        success: false,
        message,
        error: error?.message || error
    });
}

export const sendSuccess = (res: Response, statusCode: number, message: string, data?: any ) => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const toDoValidation = {
    add: z.object({
        toDo: z.string().min(1, 'To-do item is required').max(500, 'To-do item must be less than 500 characters')
    }),
    update: z.object({
        id: z.string().min(1, 'ID is required'),
        toDo: z.string().min(1, 'To-do item is required').max(500, 'To-do item must be less than 500 characters')
    }),
    delete: z.object({
        id: z.string().min(1, 'ID is required')
    })
};

export const validateRequest = <T>(schema: z.ZodSchema<T>, data: any) => {
    try {
        return { success: true as const, data: schema.parse(data) };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false as const,
                message: error.issues[0].message
            }
        }
        return {
            success: false as const,
            message: 'Validation error'
        }
    }
}