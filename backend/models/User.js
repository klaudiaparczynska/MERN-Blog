const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    email: {
        type:'string', 
        lowercase: true, 
        unique: true, 
        required: [true, "Cant be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true
    },
    password: {
        type: 'string',
        match: [/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/, 'at least eight characters, one letter and one number'], 
        required: [true, "Cant be blank"],
    },
    tokens: [],
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost'}]
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    })
    return schema.validate(data)
}

//before saving user - hash password
UserSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password //hide sensitive data
    delete userObject.tokens
    delete userObject.articles
    return userObject

}
UserSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'appSecret')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({email})
    if(!user) throw new Error('Invalid email or password')
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error('Invalid email or password')
    return user
}

const User = mongoose.model('User', UserSchema)
module.exports = User