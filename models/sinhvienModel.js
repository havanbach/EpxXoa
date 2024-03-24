const mongooes = require('mongoose');
const SinhVienChema = new mongooes.Schema({
    name: {
        type:String,
        require:true
    },
    picture:{
        type:String,
        require:true
    }
});
const SinhVien = mongooes.model('SinhVien',SinhVienChema);
module.exports = SinhVien;