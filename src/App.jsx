/* eslint-disable no-unused-vars */

import {useState, useCallback, useEffect, useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook 
  const passRef = useRef(null);

  // copying the generated password to the clipboard
  const copyPasswordClipboard = useCallback(() => {
    passRef.current?.select(password);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // password is generating
  const passGenerate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQUSTUVWXYZabcdefghijklmnopqustuvwxyz";
    if (numberAllow) {
      str += "0123456789";
    }
    if (charAllow) {
      str += "!@#$%&*(){}|~";
    }

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }

    setPassword(pass);
  }, [length, numberAllow, charAllow, setPassword, numberAllow && charAllow]);

  //useEffect hook

  useEffect(() => {
    passGenerate();
  }, [length, numberAllow, charAllow, passGenerate]);

  // return contains the whole body or the structure of the website in another words its the HTML
  return (
    <>
      <h1 className="text-5xl text-center my-20 text-white font-semibold">
        Password Generator
      </h1>

      <div className=" mx-auto justify-center w-full max-w-md shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600 ">
        <div className="flex  py-4  ">
          <input
            className="w-full py-1 px-3 text-lg outline-none focus:outline-slate-400 focus:rounded-lg  focus:duration-500"
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyPasswordClipboard}
            className="text-white capitalize bg-blue-700 px-4 py-0.5 shrink-0 hover:bg-neutral-700 hover:duration-300 ">
            copy
          </button>
        </div>
        <div className="flex gap-x-2 ">
          <div className="flex items-center gap-x-2">
            <input
              id="length"
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              id="numInput"
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
