import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";

async function createTodo( data: FormData){
 "use server"

 const title=data.get('title')?.valueOf();
 if(typeof title !== 'string' || title.length===0){
    throw new Error ("invalid title")
 }

 await prisma.todo.create({data:{title , complete:false}})
 redirect("/")
 
 console.log("hi")   
}

export default function  Page(){
    return <>
    <header className="flex justify-between items-center mb-4">
      <h1 className=" bg-gradient-to-r from-red-500 via-yellow-500 to-white-500 bg-clip-text text-4xl">New</h1>
</header>
<form action={createTodo} className=" flex gap-2  flex-col">
    <input type="text" name="title" className="border
     border-slate-300 bg-transparent
        text-slate-300 px-2 py-1 rounded 
        hover:bg-slate-700 
        focus-within:bg-slate-700 outline-none"></input>
        <div className="flex gap-3 justify-end">


            <Link href=".."  className="border
     border-slate-300 bg-transparent
        text-slate-300 px-2 py-1 rounded 
        hover:bg-slate-700 
        focus-within:bg-slate-700 outline-none pl-4 pr-4">Cancel</Link>


            <button type="submit" className="border
     border-slate-300 bg-transparent
        text-slate-300 px-2 py-1 rounded 
        hover:bg-slate-700 
        focus-within:bg-slate-700 outline-none  pl-4 pr-4">Create</button>
        </div>
</form>
    </>
}