import { Request, Response } from 'express';
import { getToDo, addToDo, updateToDo, toggleToDo, CompletedToDos, IncompleteToDos, deleteToDo } from '../controller/ToDoController';
import ToDo from '../models/ToDoModel';
import { validateRequest, sendError, sendSuccess } from '../utils/utils';

jest.mock('../models/ToDoModel');
jest.mock('../utils/utils');
const mockToDo = ToDo as jest.Mocked<typeof ToDo>;
const mockValidateRequest = validateRequest as jest.MockedFunction<typeof validateRequest>;
const mockSendError = sendError as jest.MockedFunction<typeof sendError>;
const mockSendSuccess = sendSuccess as jest.MockedFunction<typeof sendSuccess>;

describe('ToDo Controller', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('getToDo', () => {
        it('should get all todos successfully', async () => {
            const mockTodos = [
                { _id: '1', toDo: 'Test todo', completed: false },
                { _id: '2', toDo: 'Another todo', completed: true }
            ];
            mockToDo.find.mockResolvedValue(mockTodos) as any;
            await getToDo(mockReq as Request, mockRes as Response);
            expect(mockToDo.find).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                data: mockTodos
            });
        });
        it('should handle errors when getting todos', async () => {
            const error = new Error('Database error');
            mockToDo.find.mockRejectedValue(error);
            await getToDo(mockReq as Request, mockRes as Response);
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 500, 'Error fetching To-Do list', error);
        });
    });

    describe('addToDo', () => {
        it('should add a todo successfully', async () => {
           const mockNewTodo = { _id: '1', toDo: 'New todo', completed: false };
           const mockSave = jest.fn().mockResolvedValue(mockNewTodo);
           
           mockValidateRequest.mockReturnValue({
                success: true,
                data: { toDo: 'New todo'}
           });
           (ToDo as any).mockImplementation(() => ({save: mockSave}));

           mockReq.body = {toDo: 'New to do'};
           await addToDo(mockReq as Request, mockRes as Response);

           expect(mockValidateRequest).toHaveBeenCalled();
           expect(mockSave).toHaveBeenCalled();
           expect(mockSendSuccess).toHaveBeenCalledWith(mockRes, 201, 'To-do added successfully', {save: mockSave});
           
        });
        it('should handle validation errors when adding todo', async () => {
            mockValidateRequest.mockReturnValue({
                success: false,
                message: 'Invalid request data'
            });
            mockReq.body = {};
            await addToDo(mockReq as Request, mockRes as Response);
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 400, 'Invalid request data');
        });
        it('should handle database errors when adding todo', async () => {
            const error = new Error('Database error');
            const mockSave = jest.fn().mockRejectedValue(error);

            mockValidateRequest.mockReturnValue({ success: true, data: { toDo: 'New todo'}});
            (ToDo as any).mockImplementation(() => ({ save: mockSave }));

            mockReq.body = { toDo: 'New todo' };
            await addToDo(mockReq as Request, mockRes as Response);

            expect(mockSendError).toHaveBeenCalledWith(mockRes, 500, 'Error adding to-do', error);
        });
    });

    describe('updateToDo', () => {
        it('should update a todo successfully', async () => {
            const mockUpdatedTodo = { _id: '1', toDo: 'Updated todo', completed: true };
            mockValidateRequest.mockReturnValue({
                success: true,
                data: { id: '1', toDo: 'Updated todo', completed: true }
            });
            mockToDo.findByIdAndUpdate.mockResolvedValue(mockUpdatedTodo as any);
            mockReq.body = { id: '1', toDo: 'Updated todo', completed: true };
            await updateToDo(mockReq as Request, mockRes as Response);

            expect(mockToDo.findByIdAndUpdate).toHaveBeenCalledWith('1',
                { toDo: 'Updated todo', completed: true },
                { new: true }
            );
            expect(mockSendSuccess).toHaveBeenCalledWith(mockRes, 200, 'To-do updated successfully', mockUpdatedTodo);
        });
        it('should handle validation errors when updating todo', async () => {
            mockValidateRequest.mockReturnValue({
                success: false,
                message: 'Validation error'
            });
            mockReq.body = {};
            await updateToDo(mockReq as Request, mockRes as Response);
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 400, 'Validation error');
        });
        it('should handle todo not found in update', async () => {
            mockValidateRequest.mockReturnValue({
                success: true,
                data: { id: '1', toDo: 'Updated todo' }
            });
            mockToDo.findByIdAndUpdate.mockResolvedValue(null);
            mockReq.body = { id: '1', toDo: 'Updated todo' };
            await updateToDo(mockReq as Request, mockRes as Response);
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 404, 'To-do not found');
        });
        it('should handle database errors in update', async () => {
            const error = new Error('Database error');
            mockValidateRequest.mockReturnValue({
                success: true,
                data: { id: '1', toDo: 'Updated todo'}
            });
            mockToDo.findByIdAndUpdate.mockRejectedValue(error);
            mockReq.body = { id: '1', toDo: 'Updated todo'}
            await updateToDo(mockReq as Request, mockRes as Response);
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 500, 'Error updating to-do', error);
        });

    });

    describe('toggleToDo', () => {
        it('should toggle a todo successfully', async () => {
            const mockTodo = { _id: '1', toDo: 'Test todo', completed: false, save: jest.fn() };
            mockValidateRequest.mockReturnValue({ success: true, data: { id: '1'} });
            mockToDo.findById.mockResolvedValue(mockTodo as any);
            mockTodo.save.mockResolvedValue(mockTodo);
    
            // Use the correct type for mockReq to satisfy the controller's parameter type
            const mockToggleReq = { params: { id: '1' } } as Request<{ id: string }>;
            await toggleToDo(mockToggleReq, mockRes as Response);
    
            expect(mockToDo.findById).toHaveBeenCalledWith('1');
            expect(mockTodo.completed).toBe(true);
            expect(mockTodo.save).toHaveBeenCalled();
            expect(mockSendSuccess).toHaveBeenCalledWith(mockRes, 200, 'To-do toggled successfully', mockTodo)
        });
        it('should handle validation error in toggle', async () => {
            mockValidateRequest.mockReturnValue({
                success: false,
                message: 'Validation error'
            })
            const mockToggleReq = { params: { id: '1' } } as Request<{ id: string }>;
            await toggleToDo(mockToggleReq, mockRes as Response);
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 400, 'Validation error')
        });
        it('should handle database error in toggle', async () => {
            const error = new Error('Database error');
            mockValidateRequest.mockReturnValue({ success: true, data: { d: '1' }});
            mockToDo.findById.mockRejectedValue(error);

            const mockToggleReq = { params: { id: '1' } } as Request<{ id: string }>;
            await toggleToDo(mockToggleReq, mockRes as Response);
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 500, 'Error toggling to-do', error);
        });
    });

    describe('CompletedToDos', () => {
        it('should get completed todos successfully', async () => {
            const mockCompletedTodos = [
                { _id: '1', toDo: 'Completed todo 1', completed: true },
                { _id: '2', toDo: 'Completed todo 2', completed: true }
            ];
            
            mockToDo.find.mockResolvedValue(mockCompletedTodos as any);
            
            await CompletedToDos(mockReq as Request, mockRes as Response);
            
            expect(mockToDo.find).toHaveBeenCalledWith({ completed: true });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockCompletedTodos);
        });

        it('should handle errors when getting completed todos', async () => {
            const error = new Error('Database error');
            mockToDo.find.mockRejectedValue(error);
            
            await CompletedToDos(mockReq as Request, mockRes as Response);
            
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 500, 'Error fetching completed to-dos', error);
        });
    });

    describe('IncompleteToDos', () => {
        it('should get incomplete todos successfully', async () => {
            const mockIncompleteTodos = [
                { _id: '1', toDo: 'Incomplete todo 1', completed: false },
                { _id: '2', toDo: 'Incomplete todo 2', completed: false }
            ];
            
            mockToDo.find.mockResolvedValue(mockIncompleteTodos as any);
            
            await IncompleteToDos(mockReq as Request, mockRes as Response);
            
            expect(mockToDo.find).toHaveBeenCalledWith({ completed: false });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockIncompleteTodos);
        });

        it('should handle errors when getting incomplete todos', async () => {
            const error = new Error('Database error');
            mockToDo.find.mockRejectedValue(error);
            
            await IncompleteToDos(mockReq as Request, mockRes as Response);
            
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 500, 'Error fetching incomplete to-dos', error);
        });
    });

     describe('deleteToDo', () => {
        it('should delete a todo successfully', async () => {
            const mockDeletedTodo = { _id: '1', toDo: 'Deleted todo', completed: false };
            
            mockValidateRequest.mockReturnValue({ success: true, data: { id: '1' } });
            mockToDo.findByIdAndDelete.mockResolvedValue(mockDeletedTodo as any);
            
            const mockDeleteReq = { params: {id: '1' } } as Request<{ id: string }>;
            await deleteToDo(mockDeleteReq, mockRes as Response);
            
            expect(mockToDo.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(mockSendSuccess).toHaveBeenCalledWith(mockRes, 200, 'To-do deleted successfully', mockDeletedTodo);
        });

        it('should handle validation errors in delete', async () => {
            mockValidateRequest.mockReturnValue({ success: false, message: 'Invalid request data' });
            const mockDeleteReq = { params: {id: '1' } } as Request<{ id: string }>;
            
            await deleteToDo(mockDeleteReq, mockRes as Response);
            
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 400, 'Invalid request data');
        });

        it('should handle todo not found in delete', async () => {
            mockValidateRequest.mockReturnValue({ success: true, data: { id: '1' } });
            mockToDo.findByIdAndDelete.mockResolvedValue(null);
            
            const mockDeleteReq = { params: {id: '1' } } as Request<{ id: string }>;
            await deleteToDo(mockDeleteReq, mockRes as Response);
            
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 404, 'To-do not found');
        });

        it('should handle database errors in delete', async () => {
            const error = new Error('Database error');
            
            mockValidateRequest.mockReturnValue({ success: true, data: { id: '1' } });
            mockToDo.findByIdAndDelete.mockRejectedValue(error);
            
            const mockDeleteReq = { params: {id: '1' } } as Request<{ id: string }>;
            await deleteToDo(mockDeleteReq, mockRes as Response);
            
            expect(mockSendError).toHaveBeenCalledWith(mockRes, 500, 'Error deleting to-do', error);
        });
    });
})