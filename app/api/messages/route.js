import connectDB from "@/config/mongodb";
import Message from "@/models/message_model";
import getSessionUser from "@/utilis/GetSessionUser";

export const dynamic = 'force-dynamic'

//GET /api/messages
export const GET =async()=>{
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        if(!sessionUser || ! sessionUser.userId){
            return new Response('User ID is Required',{status:401})            
        };
        const {userId} = sessionUser;
        const readMessages = await Message.find({recipient: userId , read:true})
        .sort({createdAt:-1})//Sorts read messages in ascending Order
        .populate('sender','username')
        .populate('property','name')

        const unReadMessages = await Message.find({recipient: userId , read:false})
        .sort({createdAt:-1})//Sorts read messages in ascending Order
        .populate('sender','username')
        .populate('property','name')

        const messages =[...unReadMessages, ...readMessages]

        return new Response(JSON.stringify(messages),{status:200})

        
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong',{status:500});
    }
}

//POST /api/messages
export const POST = async (request) =>{
    try {
        await connectDB();
        const { name , email , phone , message ,property , recipient} = await request.json();
        const sessionUser = await getSessionUser();

        if(!sessionUser || ! sessionUser.userId){
            return new Response(JSON.stringify({message:'User ID is Required'}),{status:401})
            
        }

        const { user }=sessionUser;
        // Can not send mesaage to self
        if(user.id === recipient){
            return new Response(JSON.stringify({message:'Cannot send message to yourself'}),{status:400})
        }

        const newMessage = new Message({
            sender:user.id,
            recipient,
            property,
            email,
            name,
            phone,
            body:message,
        }) 
       await newMessage.save();
       return new Response(JSON.stringify({message:'Message Sent'}),{status:200})
    } catch (error) {
        console.log(error)
        return new Response('Something went Wrong',{status:500})
    }
}