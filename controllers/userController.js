const model = require("../model/userModel");

const getUserId = async (req, res) => {
  try {
    // const { id } = req.params; // ini
    const { id } = req.query; // ini

    var CryptoJS = require("crypto-js");

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(id, "secret key 123");
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (parseInt(originalText)) {
      const getData = await model.getUserById(originalText);
      res.send({ data: getData.rows, jumlahData: getData.rowCount });
    } else {
      res.status(400).send("angka tidak valid");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const addUser = async (req, res) => {
  try {
    const { id, name, email, password, phone, photo } = req.body;

    const addUser = await model.addUser({ id, name, email, password, phone, photo });
    const addUserDetail = await model.addDetailUser({
      userId: addUser.rows[0]?.id,
    });

    if (addUserDetail) {
      res.send("data berhasil di tambah");
    } else {
      res.status(400).send("data gagal di tambah");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const editUser = async (req, res) => {
  try {
    const { id, name, email, password, phone, photo } = req.body;

    // Check user by id
    const getData = await model.getUserById(id);

    if (getData.rowCount > 0) {
      let inputNama = name || getData?.rows[0]?.name;
      let inputEmail = email || getData?.rows[0]?.email;
      let inputPassword = password || result?.rows[0]?.password;
      let inputPhone = phone || result?.rows[0]?.phone;
      let inputPhoto = photo || result?.rows[0]?.photo;

      let message = "";

      if (name) message += "nama,";
      if (email) message += "email,";
      if (password) message += "password,";
      if (phone) message += "phone,";
      if (photo) message += "photo,";

      const editData = await model.editUser({
        name: inputNama,
        email: inputEmail,
        id,
      });

      if (editData) {
        res.send(`${message} berhasil di ubah`);
      } else {
        res.status(400).send("data gagal di ubah");
      }
    } else {
      res.status(400).send("data tidak di temukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Check user by id
    const getData = await model.getUserById(id);

    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteUser(id);

      if (deleteUser) {
        res.send(`data id ke ${id} berhasil di hapus`);
      } else {
        res.status(400).send("data gagal di hapus");
      }
    } else {
      res.status(400).send("data tidak di temukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = { getUserId, addUser, editUser, deleteUser };