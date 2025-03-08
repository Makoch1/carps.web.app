const getUser = /* async */ (req, res, next) => {
    const userID = req.params.id;

    res.send(`GET USER ${userID}`);
}

const editUser = /* async */ (req, res, next) => {
    const userID = req.params.id;

    res.send(`EDIT USER ${userID}`);
}

const createUser = /* async */ (req, res, next) => {
    res.send("CREATE USER");
}

export { getUser, editUser, createUser };
