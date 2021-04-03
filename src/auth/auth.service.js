const User = require('../users/user.entity');
const { Unauthorized } = require('http-errors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async validate(username, password) {
        const user = await User.findOne({ username });
        const attempts= user.failedAttempts;
        if (!user || !bcrypt.compareSync(password, user.password)) {
                    if(attempts>=3){
                            user.locked= true;
                            await user.save();
                            throw new Locked('The user is locked!');
                        }
                      
                        await user.save();
        
            throw new Unauthorized();
            }
        user.failedAttempts=0;
        await user.save();

        return user;
    }

    async login(username, password) {
        const user = await this.validate(username, password);

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        return token;
    }

    validateToken(token) {
        const obj = jwt.verify(token, process.env.JWT_SECRET, {
            ignoreExpiration: false
        })

        return { userId: obj.userId, username: obj.username };
    }
}

module.exports = new AuthService();