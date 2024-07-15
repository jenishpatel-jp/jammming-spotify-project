import { getServerSession } from "next-auth";
import { Redirect } from "next";

const Restricted = async () => {
    const session = await getServerSession();
    if (!session || !session.user){
        
    }

}