import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/mongodb";
import Property from "@/models/property_model";
import getSessionUser from "@/utilis/GetSessionUser";

export const dynamic = 'force-dynamic'

//GET api/properties
export const GET = async(request)=>{
    try {
        await connectDB();

        const page = request.nextUrl.searchParams.get('page') || 1;
        const pageSize = request.nextUrl.searchParams.get('pageSize') || 6;

        const skip = (page - 1 ) *pageSize;
        const totalProperties = await Property.countDocuments({});
        const properties = await Property.find({}).skip(skip).limit(pageSize);
        const result = { 
            totalProperties,
            properties
         }
        return new Response(JSON.stringify(result),{status: 200});
    } catch (error) {
        console.log(error)
        return Response('Something went wrong',{status:500});

    }
}

export const POST = async(request)=>{
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        console.log(sessionUser)
        if(!sessionUser || !sessionUser.userId){
            return new Response('User ID is Required',{status:401})
        }
        const {userId}=sessionUser;
        const formData = await request.formData();

        //Access all values
        const amenities = formData.getAll('amenities');
        const images =  formData.getAll('images').filter((image)=> image.name !==''); //filtering for empty image data
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

        //Upload Images on Cloudinary
        const imageUploadPromises = [];
        for(const image of images){
            const imageBuffer = await image.arrayBuffer();
            const imageArray=Array.from(new Uint8Array(imageBuffer));
            const imageData=Buffer.from(imageArray)
        
            //Convert the image data to base 64
            const imageBase64 = imageData.toString('base64');

            //Make request to upload to cloudinary
            const result= await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,{
                folder: 'PropertyParadise'
                }
            );
            imageUploadPromises.push(result.secure_url);
        }
        //Wait for all images to upload
        const uploadedImages = await Promise.all(imageUploadPromises)
        //Add uploaded images to property data
        propertyData.images=uploadedImages;
        const newProperty = new Property(propertyData);
        await newProperty.save();

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: 'Failed To Add Property'}),{status:500})   
    }
}