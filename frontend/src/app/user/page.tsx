"use client";

const db = fetch("http://localhost:3001/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then(console.log);

console.log(db);

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>User Page</h1>
    </main>
  );
}
