import {Request, Response } from 'express'
import ToDo, {IToDo} from '../models/ToDoModel'
import { sendError, sendSuccess, toDoValidation, validateRequest } from '../utils/errorUtils';

export const getToDo = async (req: Request, res: Response): Promise<void> => {
    try {
        const toDos: IToDo[] = await ToDo.find();
        res.status(200).json(toDos);
    } catch (error) {
        sendError(res, 500, 'Error fetching To-Do list', error);
    }
};

export const addToDo = async (req: Request, res: Response): Promise<void> => {
    const validation = validateRequest(toDoValidation.add, req.body);
    if (!validation.success) {
        sendError(res, 400, validation.message);
        return;
    }
    
    try {
        const newToDo = new ToDo({ toDo: validation.data.toDo });
        await newToDo.save();
        sendSuccess(res, 201, 'To-do added successfully', newToDo);
    } catch (error) {
        sendError(res, 500, 'Error adding to-do', error);
    }
};

export const updateToDo = async (req: Request, res:Response): Promise<void> => {
    const validation = validateRequest(toDoValidation.update, req.body);
    if (!validation.success) {
        sendError(res, 400, validation.message);
        return;
    }

    try {
        const updateData: any = {};
        if (validation.data.toDo) updateData.toDo = validation.data.toDo;
        if (validation.data.completed !== undefined) updateData.completed = validation.data.completed;
        const updatedToDo: IToDo | null = await ToDo.findByIdAndUpdate(
            validation.data.id,
            updateData,
            { new: true}
        );
        if (!updatedToDo) {
            sendError(res, 404, 'To-do not found');
            return;
        }
        sendSuccess(res, 200, 'To-do updated successfully', updatedToDo);
    } catch (error) {
        sendError(res, 500, 'Error updating to-do', error);
    }
};

export const toggleToDo = async (req: Request<{id: string}>, res: Response): Promise<void> => {
    const validation = validateRequest(toDoValidation.toggle, req.params);
    if (!validation.success) {
        sendError(res, 400, validation.message);
        return;
    }

    try {
        const toDo: IToDo | null = await ToDo.findById(validation.data.id);
        if (!toDo) {
            sendError(res, 404, 'To-do not found');
            return;
        }

        toDo.completed = !toDo.completed;
        await toDo.save();
        sendSuccess(res, 200, 'To-do toggled successfully', toDo);
    } catch (error) {
        sendError(res, 500, 'Error toggling to-do', error);
    }
}

export const deleteToDo = async (req: Request<{id: string}>, res: Response): Promise<void> => {
    const validation = validateRequest(toDoValidation.delete, req.params);
    if (!validation.success) {
        sendError(res, 400, validation.message);
        return;
    }

    try {
        const deletedToDo: IToDo | null = await ToDo.findByIdAndDelete(validation.data.id);
        if (!deletedToDo) {
            sendError(res, 404, 'To-do not found');
            return
        }
        sendSuccess(res, 200, 'To-do deleted successfully', deletedToDo);
    } catch (error) {
        sendError(res, 500, 'Error deleting to-do', error);
    }
};