import moongose from "moongose";

async function connectDB(){
    if(moongose.connections[0].readyState){
        return true;
    }

    try {
        await moongose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected')
        return true
    } catch (error){
        console.log(error)
    }
}