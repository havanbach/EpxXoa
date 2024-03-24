// //tham chiếu thư viện
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const  SinhVien = require('../models/sinhvienModel');
// //Viết các route
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads/');
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
//     }
// });
// const upload = multer({storage:storage});
// //form xóa sinh viên
// router.get('/form',(req,res)=>{
//     res.sendFile(path.join(__dirname),'../views/form.html');
// });
// //Thực hiện thêm sinh viên
// router.post('/',upload.single('picture'),async(req,res)=>{
//     try {
//         const {name} = req.body;
//         const {picture} = req.file? req.file.filename:null;
//         const sv = new SinhVien({name,picture});
//         await sv.save();
//         res.redirect('/');
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({error: error});
//     }
// });
// module.exports =router;

// Tham chiếu thư viện
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const SinhVien = require('../models/sinhvienModel');

// Thiết lập multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route hiển thị form thêm sinh viên
router.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

// Route xử lý thêm sinh viên
router.post('/', upload.single('picture'), async (req, res) => {
    try {
        const { name } = req.body;
        let picture = null;
        if (req.file) {
            picture = req.file.filename;
        }
        const sv = new SinhVien({ name, picture });
        await sv.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

module.exports = router;
