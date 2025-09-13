const express=require('express');
const app=express();

const userschema=require('./usermodule');
const multer =require('multer');
const path=require('path');
const cyrpto=require('crypto');

app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

let fn="";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cyrpto.randomBytes(12,(err,bytes)=>{
        fn=bytes.toString('hex')+path.extname(file.originalname)
        cb(null, fn)
    });
  }
})

const upload = multer({ storage: storage })

app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/create',(req,res)=>{
    res.render('create');
});

app.post('/create_user',upload.single('image'),async(req,res)=>{
    const {name}=req.body;
    const image=req.file;
    if (image==undefined) {
        fn="default.png";
    }
    console.log(image);
       await userschema.create({
            name,
            image:fn
        });
        fn="";
    res.redirect('create');
});

app.get('/find',async(req,res)=>{
    const all_user=await userschema.find();
    res.render('find',{all_user});
});
app.listen(3000);