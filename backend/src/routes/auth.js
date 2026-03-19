const express=require("express");
const router=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const mongoose=require("mongoose");

router.post("/login",async(req,res)=>{
  try{
    const{email,senha,perfil}=req.body;
    const u=await mongoose.connection.collection("usuarios").findOne({email,perfil});
    if(!u) return res.status(400).json({mensagem:"Credenciais invalidas."});
    const ok=await bcrypt.compare(senha,u.senha);
    if(!ok) return res.status(400).json({mensagem:"Credenciais invalidas."});
    const token=jwt.sign({id:u._id,perfil:u.perfil,nome:u.nome},process.env.JWT_SECRET,{expiresIn:"8h"});
    res.json({token,usuario:{id:u._id,nome:u.nome,email:u.email,perfil:u.perfil,unidade:u.unidade}});
  }catch(err){
    console.log(err);
    res.status(500).json({mensagem:"Erro no servidor."});
  }
});

router.post("/cadastrar",async(req,res)=>{
  try{
    const{nome,email,senha,perfil,unidade}=req.body;
    const existe=await mongoose.connection.collection("usuarios").findOne({email});
    if(existe) return res.status(400).json({mensagem:"Email ja cadastrado."});
    const hash=await bcrypt.hash(senha,10);
    await mongoose.connection.collection("usuarios").insertOne({nome,email,senha:hash,perfil,unidade:unidade||""});
    res.status(201).json({mensagem:"Usuario cadastrado."});
  }catch(err){
    res.status(500).json({mensagem:"Erro no servidor."});
  }
});

module.exports=router;
