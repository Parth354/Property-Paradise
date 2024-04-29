import connectDB from "@/config/mongodb";
import Message from "@/models/message_model";
import getSessionUser from "@/utilis/GetSessionUser";

export const dynamic = 'force-dynamic';

//GET /api/messages/unread-count
export const GET= async(request)=>{
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        if(!sessionUser || ! sessionUser.userId){
            return new Response('User ID is Required',{status:401})            
        };
        const {userId} = sessionUser;

        const unReadMessagesCount = await Message.countDocuments({
            recipient: userId,
            read:false
        })
        return new Response(JSON.stringify({count : unReadMessagesCount}),{status:200})
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', {status:500})
    }
}