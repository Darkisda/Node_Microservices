import mongoose from 'mongoose'

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
    },
})

userSchema.statics.build = ({ email, password }: UserAttrs) => {
    return new User({
        email,
        password,
    })
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }