import bcrypt from 'bcrypt';

const hashData = (password: string) => {
    const hashedPassword = bcrypt.hash(password, 10);

    return hashedPassword;
}

export default hashData;