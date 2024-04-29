//POST
import connectDB from "@/config/mongodb";
import Property from "@/models/property_model";
import User from "@/models/user_model";
import getSessionUser from "@/utilis/GetSessionUser";

export const dynamic ='force-dynamic';

export const POST= async(request)=>{
    try {
        await connectDB();
        const { propertyId }= await request.json();
        const sessionUser = await getSessionUser();

        if(!sessionUser || !sessionUser.userId){
            return new Response('User ID is required',{status:401})

        }
        const {userId} = sessionUser;

        const user = await User.findOne({_id:userId});

        //Check if Property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId);
        
        return new Response(JSON.stringify({isBookmarked}),{status:200})

    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong',{status:500})
    }
}