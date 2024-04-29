import connectDB from "@/config/mongodb";
import Property from "@/models/property_model";
import getSessionUser from "@/utilis/GetSessionUser";
//GET api/properties
export const GET = async(request,{params})=>{
    try {
        await connectDB();
        const property = await Property.findById(params.id)
        if(!property) return new Response('Property Not Found', {status:404});
        return new Response(JSON.stringify(property),{status: 200});
    } catch (error) {
        console.log(error)
        return Response('Something went wrong',{status:500});
    }
}
//DELETE api/properties/:id
export const DELETE = async(request,{params})=>{
    try {
        const propertyId =params.id;
        const sessionUser=await getSessionUser();
        if(!sessionUser || !sessionUser.userId) return new Response('User id is required',{status:401})
        const {userId}= sessionUser;

        
        await connectDB();
        const property = await Property.findById(propertyId)
        if(!property) return new Response('Property Not Found', {status:404});

        if(property.owner.toString() !== userId){
            return new Response('Unauthorized',{status:401})
        }
        await property.deleteOne();
        return new Response('Property Delete Success',{status: 200});
    } catch (error) {
        console.log(error)
        return Response('Something went wrong',{status:500});
    }
}


//PUT
export const PUT = async(request,{params})=>{
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        console.log(sessionUser)
        if(!sessionUser || !sessionUser.userId){
            return new Response('User ID is Required',{status:401})
        }
        const{ id }=params;
        const {userId}=sessionUser;
        const formData = await request.formData();

        //Access all values
        const amenities = formData.getAll('amenities');

        //Get Property To Update
        const existingProperty= await Property.findById(id);
        if(!existingProperty) return new Response("Property does not exist",{status:404})

        //verify ownership
        if(existingProperty.owner.toString() !== userId) return new Response("Unauthorized Access",{status:401})
        //Create propertyData object for database
        const propertyData={
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street : formData.get('location.street'),
                city : formData.get('location.city'),
                state : formData.get('location.state'),
                zipcode : formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates:{
                weekly:formData.get('rates.weekly'),
                monthly:formData.get('rates.monthly'),
                nightly:formData.get('rates.nightly')
            },
            seller_info:{
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.email')
            },
            owner:userId,
        
        }
        //Update the property
        const updatedProperty =await Property.findByIdAndUpdate(id,propertyData);

        return new Response(JSON.stringify(updatedProperty),{status:200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: 'Failed To Add Property'}),{status:500})   
    }
}