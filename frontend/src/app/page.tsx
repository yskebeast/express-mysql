"use client";
import { useState, ChangeEventHandler, FormEventHandler } from "react";

import { prefectures } from "@/utils/prefectures";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [pref, setPref] = useState(prefectures[0]);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setName(event.target.value);

  const handleAgeChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setAge(event.target.value);

  const handlePrefChange: ChangeEventHandler<HTMLSelectElement> = (event) =>
    setPref(event.target.value);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const regex = /^[^0-9０-９\s!-/:-@[-`{-~]+$/g;
    const nameCheck = regex.test(name);

    if (!name.length) {
      alert("名前は必須です");
      return;
    }
    if (!age.length) {
      alert("年齢は必須です");
      return;
    }
    if (!nameCheck) {
      alert("数字や記号は入力できません");
      return;
    }
    if (!name.length || !age.length) {
      alert("名前と年齢は必須です");
      return;
    }

    try {
      const req = await fetch("http://localhost:3001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, pref }),
      });

      const res = await req.json();
      console.log("success!", res);
      setName("あああああああああ");
      setAge("");
      setPref(prefectures[20]);
      alert(`added ${name} to the list`);
    } catch (error) {
      console.log("failed", error);
      alert("cannot add to the list");
    }
  };

  return (
    <main>
      <a className=" block p-3 bg-gray-400" href="/list">
        LIST PAGE
      </a>
      <h1 className="text-center  text-3xl font-black">HOME PAGE</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-black "
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="NAME"
            required
            onChange={handleNameChange}
          />
        </div>
        <br />
        <div>
          <label
            htmlFor="age"
            className="block mb-2 text-sm font-medium text-black "
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            min="0"
            value={age}
            onChange={handleAgeChange}
          />
        </div>
        <br />
        <div>
          <label
            htmlFor="pref"
            className="block mb-2 text-sm font-medium text-black "
          >
            Pref
          </label>
          <select
            value={pref}
            onChange={handlePrefChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {prefectures.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          SUBMIT
        </button>
      </form>
    </main>
  );
}
