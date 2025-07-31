const express =require('express');
const bodyparser=require('body-parser');
const cors =require ('cors');
const db=require('../models/db');
const app =express();
const port =3000;

app.use(cors());
app.use(bodyparser.json());

app.listen(port,()=>{
    console.log(`servidor corriendo en http://localhost:${port}`);
});

//obtener todos los prodcutos 
app.get('/productos',(req, res)=>{
    db.query('SELECT * FROM productos', (err,results)=> {
        if(err) return res.status(500).send('error al obtener productos');
        res.json(results);
    });
});

// Insertar un producto
app.post('/productos', (req, res) => {
    const { nombre,descripcion,precio } = req.body;
    const sql = 'INSERT INTO productos (nombre,descripcion, precio) VALUES (?, ?, ?)';
    db.query(sql, [nombre, descripcion,precio], (err, result) => {
        if (err) {
            console.error('Error al insertar producto:', err); // añade esto
            return res.status(500).send('Error al insertar producto: ' + err.message);
        }

        res.json({ id: result.insertId, nombre,descripcion, precio });
    });
});

// Actualizar un producto
app.patch('/productos/:id',(req,res)=>{
    const {id}=req.params;
    const {precio}=req.body;
    const sql='UPDATE productos SET precio= ? WHERE id= ?';
    db.query(sql, [precio,id], (err,result) => {
        if(err) return res.status(500).send('error al actualizar el prodcuto ');
        res.send('prodcuto actualizado');

    });

});

//eliminar prodcuto 
app.delete('/productos/:id',(req,res)=>{
    const {id}=req.params;
    const sql='DELETE FROM productos WHERE id=?';
    db.query(sql,[id],(err,result)=>{
        if (err) return res.status(500).send('error al elimianr el producto');
        res.send('producto eliminado');
    });
});
