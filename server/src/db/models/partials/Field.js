import { Schema } from 'mongoose';
import FieldTypeEnum from '../../../enum/questiontype';

export const TypedField = new Schema(
    {
        text: String,
        type: FieldTypeEnum,
        answers: [{

        }]
    }
);
