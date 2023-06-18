import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";

async function createTodo(data: FormData) {
  // "use server" indicates that this code should be executed on the server-side

  const title = data.get('title')?.valueOf();
  if (typeof title !== 'string' || title.length === 0) {
    throw new Error("invalid title");
  }

  await prisma.todo.create({ data: { title, complete: false } });

  // Redirect the user to the home page
  redirect("/");
  
  console.log("hi");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="bg-gradient-to-r from-red-500 via-yellow-500 to-white-500 bg-clip-text text-4xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        ></input>
        <div className="flex gap-3 justify-end">
          <Link
            href=".."
            className="border border-slate-300 bg-transparent text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none pl-4 pr-4"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 bg-transparent text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none  pl-4 pr-4"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}

/*Explanation:

The createTodo function is an asynchronous function that handles the creation of a new todo. It receives the form data as a parameter.

Inside the createTodo function, the title value is extracted from the form data using the get method and converted to a string.

If the title is not a valid string or is empty, an error is thrown.

If the title is valid, a new todo is created in the database using prisma.todo.create, with the provided title and a default completion status of false.

After the todo is created, the user is redirected to the home page using the redirect("/") function from the next/navigation package.

The Page component is the default export of the module and serves as the page for creating a new todo.

Inside the Page component, the form's action is set to the createTodo function, so it will be called when the form is submitted.

The form inputs are rendered, including the title input for entering the todo title.

The Link component is used to create a cancel button that redirects to the previous page when clicked.

The create button triggers the form submission and creates a new todo. */
