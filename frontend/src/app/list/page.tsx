"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<number[]>([]);
  const [list, setList] = useState([
    {
      id: 0,
      name: "",
      age: "",
      pref: "",
      flag: 0,
      created_at: "",
    },
  ]);

  const selectAccount = (id: number) => {
    if (data.includes(id)) {
      setData(data.filter((item) => item !== id));
      return;
    }
    data.length === 0 ? setData([id]) : setData([...data, id]);
  };

  const deleteAccount = async () => {
    console.log("get array", data);
    const account = data
      .map((id) => {
        return list.filter((item) => item.id === id).map((item) => item.name);
      })
      .flat(1);

    confirm(`Are you sure you want to delete?${"\n"}${account.join("\n")}`);
    try {
      for await (const id of data) {
        const req = await fetch(`http://localhost:3001/list/${id}`, {
          method: "DELETE",
        });
        const res = await req.json();
        console.log("success!", res);
      }

      setList(list.filter((item) => !data.includes(item.id)));
    } catch (error) {
      console.log("failed", error);
    }
  };

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
    <div className="  w-full">
      <a className=" block p-3 bg-gray-400" href="/">
        ホーム画面
      </a>

      <button onClick={deleteAccount}>delete account</button>
      <h1 className="text-center  text-3xl font-black">USER LIST</h1>
      {loading && <p className="text-center p-3">Loading...</p>}
      {loading || (
        <ul className="text-black grid gap-5">
          {list.map((item) => (
            <li
              key={item.id}
              className=" text-black  bg-gray-200 cursor-pointer"
              onClick={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
                selectAccount(item.id)
              }
            >
              <p>NO: {item.id}</p>
              <p>NAME: {item.name}</p>
              <p>AGE: {item.age}</p>
              <p>PREF: {item.pref}</p>
              <p>FLAG: {item.flag}</p>
              <p>CREATED AT: {item.created_at}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
