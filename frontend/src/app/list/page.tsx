"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([
    {
      id: 0,
      name: "",
      age: "",
      pref: "",
    },
  ]);

  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const req = await fetch("http://localhost:3001/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res = await req.json();
        console.log("success!", res);
        setList(res);
        setLoading(false);
      } catch (error) {
        console.log("failed", error);
      }
    };
    getList();
  }, []);

  return (
    <div>
      <h1>USER LIST</h1>
      {loading && <p>Loading...</p>}
      {loading || (
        <ul>
          {list.map((item) => (
            <li key={item.id} className="md:flex space-x-4 text-white">
              <p>ID: {item.id}</p>
              <p>NAME: {item.name}</p>
              <p>AGE: {item.age}</p>
              <p>PREF: {item.pref}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
