import app from './src/app.js';
import connectDb from './src/db/connectDb.js';
const PORT = process.env.PORT 


connectDb()
.then(app.listen(PORT , () =>{
    console.log(`app is listening to port ${PORT}`)
}))
.catch((error) =>{
 console.log(error.message);
})

