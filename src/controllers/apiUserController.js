import userService from "../services/userService";

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.checkLoginCustomer(username, password);
    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
}

const handleRegister = async (req, res) => {
    const { username, password, fullname, address, phonenumber, email, role } = req.body;
    const user = await userService.createNewCustomer(username, password, fullname, address, phonenumber, email, role);
    return res.status(200).json(user);
}

const handleLogout = async (req, res) => {
    req.session.destroy();
    return res.status(200).json({ message: "Logout successful" });
}



export default { handleLogin, handleRegister, handleLogout }