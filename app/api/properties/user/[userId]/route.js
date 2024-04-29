
import connectDB from "@/config/mongodb";
import Property from "@/models/property_model";

//GET api/properties/user/:userId
export const GET = async(request,{params})=>{
    try {
        await connectDB();
        const userId=params.userId
        if(!userId) return new Response('User ID is Required',{status:400})
        const properties = await Property.find({owner:userId})
        return new Response(JSON.stringify(properties),{status: 200});
    } catch (error) {
        console.log(error)
        return new Response('Something went wrong',{status:500});

    }
}