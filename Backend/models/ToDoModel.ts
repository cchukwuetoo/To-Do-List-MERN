import mongoose, {Document, Schema} from 'mongoose';


//Typescript interface for To-Do item
export interface IToDo extends Document {
    toDo: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Mongoose schema for To-Do item
const toDoSchema: Schema<IToDo> = new mongoose.Schema({
    toDo: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, 'To-do item is required'],
        maxlength: [500, 'To-do item must be less than 500 characters']
       
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const ToDo = mongoose.model<IToDo>('ToDo', toDoSchema);
export default ToDo