import { cookies } from "next/headers";

export async function DELETE(req){
    const cookieStore =  cookies();
    cookieStore.delete("token");

    return new Response(JSON.stringify({message : "Logout successfully"}) , {status : 200})

}