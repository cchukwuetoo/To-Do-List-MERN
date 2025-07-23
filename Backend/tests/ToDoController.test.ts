import { Request, Response } from 'express';
import { getToDo } from '../controller/ToDoController';
import ToDo from '../models/ToDoModel';
import { validateRequest, sendError } from '../utils/utils';

jest.mock('../models/ToDoModel');
jest.mock('../utils/utils');
const mockToDo = ToDo as jest.Mocked<typeof ToDo>;
const mockValidateRequest = validateRequest as jest.MockedFunction<typeof validateRequest>;
const mockSendError = sendError as jest.MockedFunction<typeof sendError>;

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
        })
    })
})