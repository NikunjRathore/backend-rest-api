const User = require("../module/usermodule")

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) return res.json("No user exists")
        return res.json(users)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.json("No such id user exists")
        return res.json(user)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

exports.delUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.json("No such id user exists")
        return res.json("user deleted")
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email_id, gender } = req.body
    if (!first_name || !email_id) {
      return res.status(400).json({ msg: "first_name and email_id are required" })
    }
    const user = await User.create({
      first_name,
      last_name,
      email_id,
      gender,
    })
    res.status(201).json({
      msg: "User created successfully",
      user,
    })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ msg: "Email already exists" })
    }
    res.status(500).json({ msg: err.message })
  }
}