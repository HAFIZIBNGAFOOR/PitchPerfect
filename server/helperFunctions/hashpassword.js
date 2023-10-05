const bcrypt = require("bcrypt");

const hashPassword = async (password)=>{
    try {
        const hashPassword = await bcrypt.hash(password,10);
        return hashPassword
    } catch (error) {
        console.log('hashing password error ', error);
    }

}
module.exports = hashPassword