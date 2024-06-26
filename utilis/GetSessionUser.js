import { authOptions } from "@/utilis/Auth_options";
import { getServerSession } from "next-auth";
 
const getSessionUser = async ()=>{
   try {
     const session = await getServerSession(authOptions);
     if(!session || !session.user) return null;
         return {
             user: session.user,
             userId:session.user.id
         }
   } catch (error) {
    console.error(error)
    return null;
   }
}
export default getSessionUser;