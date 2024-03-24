const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const sinhvienRoute = require('./routes/SinhVienRoute');
const SinhVien = require('./models/sinhvienModel');
//tạo đói tượng express
const app = express();
//kết nối csdl
mongooes.connect('mongodb+srv://bachhvph30898:havanbach0112@cluster0.j658u1d.mongodb.net/and103?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlparser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Đã kết nối thành công với mongoosedb');
}).catch((err)=>{
    console.error('Lỗi'+err);
});
//sử dụng bodyparser (lấy dũ liệu từ request)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//sử dụng route
app.use('/sinhvien',sinhvienRoute);
//upload vào thư mục
const uploadDir = path.join(__dirname,'uploads');
app.use('/uploads',express.static(uploadDir));
//sử dụng ejs
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//xử lý yêu cầu đến trang chính
app.get('/',async(req,res)=>{
    try {
        //lấy danh sách sinh viên
        const sinhviens = await SinhVien.find();
        res.render('index',{sinhviens: sinhviens});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error});
    }
});
//Xử lý xóa
app.use(bodyParser.json());
app.use((req,res,next)=>{
    if (req.query._method==='DELETE') {
        req.method = 'DELETE';
        req.url = req.path;
    }
    next();
});
//
app.delete('/SinhVien/:id',async(req,res)=>{
    const id = req.params.id;//lấy về id truyền từ form
    try {
        await SinhVien.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});
//Khởi đọng server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('Server đang chạy ở cổng 3000');
})