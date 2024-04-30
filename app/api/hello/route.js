export async function GET() {
  const res = await fetch("https://api.github.com/users/nishant0919");
  const data = await res.json();

  return Response.json({ message: "Hello World!", data });
}
