import mongoose from 'mongoose';

jest.mock('mongoose', () => ({
    connect: jest.fn(),
    connection: {
        close: jest.fn()
    },
    Schema: jest.fn().mockImplementation(() => ({})),
    odel: jest.fn()
}));

global.console ={
    ...console,
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
}

jest.setTimeout(30000);