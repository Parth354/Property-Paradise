import connectDB from "@/config/mongodb";
import Property from "@/models/property_model";

//GET api/properties/featured
export const GET = async(request)=>{
    try {
        await connectDB();

        
        const properties = await Property.find({
            is_featured:true
        });

        return new Response(JSON.stringify(properties),{status: 200});
    } catch (error) {
        console.log(error)
        return Response('Something went wrong',{status:500});

    }
}