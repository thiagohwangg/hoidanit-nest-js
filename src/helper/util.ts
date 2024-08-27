const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
    try {
        const hashedPassword = await bcrypt?.hash(plainPassword, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        return undefined; // Hoặc xử lý lỗi theo cách khác
    }
}

export const comparePasswordHelper = async (plainPassword: string, hashPassword: string) => {
    try {
        const hashedPassword = await bcrypt.compare(plainPassword, hashPassword);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        return undefined; // Hoặc xử lý lỗi theo cách khác
    }
}