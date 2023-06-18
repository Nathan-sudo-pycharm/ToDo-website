import Link from 'next/link';
import { prisma } from './db';
import { TodoItem } from './components/TodoItem';

// Function to retrieve all todos from the database
function getTodos() {
  return prisma.todo.findMany();
}

// Function to toggle the completion status of a todo
async function toggleTodo(id: string, complete: boolean) {
  // "use server" indicates that this code should be executed on the server-side

  // Update the todo in the database with the new completion status
  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  // Retrieve all todos from the database
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className=" bg-gradient-to-r from-red-500 via-yellow-500 to-white-500 bg-clip-text text-4xl">ToDo</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
