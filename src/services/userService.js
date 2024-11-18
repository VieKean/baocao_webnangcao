import bcrypt from 'bcryptjs';
import db from '../models/index';

const saltRounds = 10;

const getAllAccounts = async () => {
    try {
        const accounts = await db.Account.findAll();
        return accounts;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        throw error;
    }
};

const hashPassword = (userPassword) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(userPassword, salt);
};

const createNewAccount = async (username, password, fullname, address, phonenumber, email, role) => {
    try {
        const hashedPassword = hashPassword(password);
        const newAccount = await db.Account.create({
            username,
            password: hashedPassword,
            full_name: fullname,
            address,
            phone_number: phonenumber,
            email,
            role,
            creation_date: new Date()
        });
        return newAccount;
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
};

const deleteAccount = async (id) => {
    try {
        await db.Account.destroy({ where: { id } });
    } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
    }
};

const getAccountById = async (id) => {
    try {
        const account = await db.Account.findOne({ where: { id } });
        return account;
    } catch (error) {
        console.error('Error fetching account:', error);
        throw error;
    }
};

const updateAccount = async (id, username, fullname, address, phonenumber, email, role) => {
    try {
        await db.Account.update(
            { username, full_name: fullname, address, phone_number: phonenumber, email, role },
            { where: { id } }
        );
    } catch (error) {
        console.error('Error updating account:', error);
        throw error;
    }
};

const checkLogin = async (username, password) => {
    try {
        const account = await db.Account.findOne({ where: { username } });
        if (account) {
            const isPasswordValid = bcrypt.compareSync(password, account.password);
            return isPasswordValid ? account : null;
        }
        return null;
    } catch (error) {
        console.error('Error checking login:', error);
        throw error;
    }
};

export default { getAllAccounts, createNewAccount, deleteAccount, getAccountById, updateAccount, checkLogin };