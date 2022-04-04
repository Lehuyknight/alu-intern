const mongoose = requier('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('Succes');
    }
    catch(e){
        console.log(e);
    }
}

module.exports = { connectDB };