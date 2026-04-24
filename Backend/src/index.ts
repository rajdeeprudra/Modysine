import express from 'express';

const app = express();

const PORT = 4000;

app.get("/health", (req,res)=>{
    res.json({
        msg:"ALL OK NIGGA MOVE!"
    })
})


app.listen(PORT);

