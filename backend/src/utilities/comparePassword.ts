import bcrypt from 'bcrypt';

const comparePassword = async (input: string, hash: string) => {
    const compare = await bcrypt.compare(input, hash);
    if (compare) console.log(`comparison successful!`);

    return compare;
}

export default comparePassword;
