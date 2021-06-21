import mongoose from 'mongoose'
import { Password } from '../services/password'

// An Interface that describes the properties
// that a User Attribute has
interface UserAttrs {
    email: string
    password: string
}

// An Interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc, any, any> {
    build({ email, password }: UserAttrs): UserDoc
}

// An Interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    },
})

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

userSchema.statics.build = ({ email, password }: UserAttrs) => {
    return new User({
        email,
        password,
    })
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }