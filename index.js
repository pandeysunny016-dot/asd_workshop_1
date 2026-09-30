const express = require('express');
const fs=require("fs/promises");
const path=require("path");
const app = express();
const port = 3000;

const pathToFile=path.join(__dirname,"db.json");

async function readFile(){
    try{
        let data=await fs.readFile(pathToFile,"utf-8");
        return JSON.parse(data);

    }catch(err){
        console.log(err);

    }
    
}



app.get('/products/:id',async (req, res) => {
    try{
        let products=await readFile();
        let {id}=req.params;
        id=Number(id);
        let product=products.find((item)=>{return item.id===id});
        console.log(products,typeof id);
        res.json(products);

    }catch(err){
        console.log(err);
    }
    
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});