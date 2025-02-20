const express=require('express')
const app = express()
const port=3010

app.use(express.json())

let users=[{
    email:"user1@example.com",password:"user1@"
},{
    email:'user2@example.com',password:'user2@'
}]

app.get('/user',(req,res)=>{
    try{
        const {email}=req.query

        if(!email){
            return res.status(400).send('Email is required')
        }

        const user=users.find(user=>user.email===email);

        if(!user){
            return res.status(404).send('User not found')
        }

        res.status(200).send({message:'user fetched successfully',user})

    }catch(Err){
        return res.status(500).send(Err.message)
    }
})

app.post('/login',(req,res)=>{
    try{
        const {email,password}=req.body

        if(!email || !password){
            return res.status(400).send('Email and password are required')
        }

        const user=users.find(user=>user.email===email && user.password===password)

        if(!user){
            return res.status(401).send('Invalid email or password')
        }

        return res.send('logged in successfully')
    }catch(err){
        return res.status(500).send({ Error: err })
    }
})

app.put('/update-user',(req,res)=>{
    try{
        const {email,password}=req.body

        if(!email || !password){
            return res.status(400).send('Email and password are required')
        }

        const user=users.find(user=>user.email===email)

        if(!user){
            return res.status(404).send('User not found')
        }

        user.password=password;
        return res.status(200).send({message:'user updated sccessfully',user})
    }catch(err){
        return res.status(500).send({ Error: err })
    }
})

app.delete('/delete-user',(req,res)=>{
    try{
        const { email } = req.query

        if(!email){
            return res.status(400).send('Email is required')
        }

        const userExists=users.some(user=>user.email===email);

        if(!userExists){
            return res.status(404).send('user not found')
        }

        users=users.filter(user=>user.email!==email)

        
        res.status(200).send('user deleted successfully')
    }catch(err){
        return res.status(500).send(err.message)
    }
})

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})