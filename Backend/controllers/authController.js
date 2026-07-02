let users = [];

exports.register = (req, res) => {
    const { name, email, password, role } = req.body;
    users.push({ name, email, password, role });
    console.log("New user registered:", name);
    res.json({ message: "Account Created!" });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if(user) {
        res.json({ message: "Login successful", role: user.role });
    } else {
        res.status(401).json({ message: "Wrong Password or Email!" });
    }
};