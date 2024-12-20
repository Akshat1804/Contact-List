
import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

const App = () => {
  const [name, setname] = useState("");
  const [company, setcompany] = useState("");
  const [phone, setphone] = useState("");
  const [Favourite, setFavourite] = useState("");
  const [contacts, setcontacts] = useState(JSON.parse(localStorage.getItem("contacts")) ||[ ]);

  const submithandler = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      company: company,
      phone: phone,
      Favourite: Favourite,
    };

    console.log(data);

    setcontacts([...contacts, data]);

    const nano = {
      id: nanoid(),
      name: name,
      company: company,
      phone: phone,
      Favourite: Favourite,
    };

    const newtask = [...contacts, nano];
    setcontacts(newtask);

    setname("");
    setcompany("");
    setphone("");
    setFavourite("");
  };

  const deletehandler = (id) => {
    const copytask = contacts.filter((contact) => contact.id !== id);
    setcontacts(copytask);
  };



  const fav = (isfavourite) => {
    if (isfavourite == true) {
      return "bg-orange-400";
    } else {
      return"bg-transparent text-transparent";
    }
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));

  return (
    <div className="App bg-slate-50 h-screen w-screen flex items-center justify-center px-4">
      <div className="contact-p bg-slate-200 w-[60%] h-[96%] flex flex-col shadow-sm shadow-slate-800">
        <h1 className="md:text-2xl text-center mt-4 font-semibold">ADD CONTACT</h1>
        <form onSubmit={submithandler} className="flex flex-col md:ml-8 ml-4">
          <h1 className="md:mt-[50px] mt-6 text-[15px]">Name</h1>
          <input
            className="md:w-[400px] w-[300px] md:h-[50px]  p-2 rounded-lg "
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
          <h1 className="md:mt-[50px] mt-3 text-[15px]">Company</h1>
          <input
            className="md:w-[400px] w-[300px] md:h-[50px] p-2 rounded-lg "
            type="text"
            placeholder="Enter your company"
            onChange={(e) => setcompany(e.target.value)}
            value={company}
          />
          <h1 className="md:mt-[50px] mt-3 text-[15px]">Phone No.</h1>

          <input
            className="md:w-[400px] w-[300px] md:h-[50px] p-2 rounded-lg "
            type="text"
            placeholder="Enter your phone no."
            onChange={(e) => setphone(e.target.value)}
            value={phone}
          />
          <div className="flex mt-6 ">
            <input
              type="checkbox"
              onChange={(e) => setFavourite(e.target.checked)}
              value={Favourite}
            />
            <h1>Favourite</h1>
          </div>
          <button 
            className="bg-blue-800 md:w-[400px] w-[300px] md:h-[50px] h-10 md:mt-[50px] mt-3 rounded-lg text-white flex items-center justify-center"
            type="submit"
          >
            Add Contact
          </button>
        </form>
      </div>
      <div className="right md:w-[86%] w-full md:h-[96%] h-[50%] flex flex-col shadow-sm shadow-slate-800">
        <h1 className="md:text-2xl  text-center mt-4 font-semibold">
          Contact List
        </h1>
        {contacts.map((t) => {
          return (
            <ul
              key={t.id}
              className="box bg-slate-300  md:w-[800px] w-[300px]  md:mt-[50px] mt-[50px] mx-auto ">
              <div className="pl-[20px]">
                <div className="flex flex-col items-start justify-center font-extrabold mt-[10px]  ">
                  <h1 className="md:text-[25px] ">{t.name}</h1>
                </div>
                <div className="flex items-start justify-center mt-[10px]">
                  <h5 className="md:text-[15px] text-[10px] font-bold mr-2 ">Company : </h5>
                  <h5 className="md:text-[15px] text-[10px] ">{t.company}</h5>
                </div>
                <div className="flex items-start justify-center mt-[10px]">
                  <h5 className="md:text-[15px] text-[10px] font-bold mr-2 ">Phone No. : </h5>
                  <h5 className="md:text-[15px] text-[10px] ">{t.phone}</h5>
                </div>
                <div className="flex flex-col items-start justify-center mt-[10px] mb-[10px]" >
                  <h1 className={` text-[8px] font-semibold bg-orange-400 p-2 rounded-full ${fav(t.Favourite)}`}>
                    Favourite
                  </h1>
                  <h1 className="text-[15px]"></h1>
                </div>
              </div>
              <div className="dustbin">
                <i
                  onClick={() => deletehandler(t.id)} 
                  className="fa-solid fa-trash-can"
                ></i>
              </div>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default App;
