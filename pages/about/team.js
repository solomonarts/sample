import React from "react";
import robert from "../../assets/team/robert.png";
import stella from "../../assets/team/stella.jpg";

function Team() {
  const members = [
    { name: "Viola Stellar Mbuga", title: "CEO", photo: stella },
    { name: "Robert Okello", title: "Growth Advisor", photo: robert },
    { name: "John doe", title: "", photo: "" },
    { name: "John doe", title: "", photo: "" },
  ];
  return (
    <div className="container py-16 mx-auto">
      <h3 className="mt-3 mb-8 text-3xl font-black uppercase main-color">
        The team
      </h3>

      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {members.map((member, i) => (
          <div key={i} className="p-5 overflow-hidden border rounded-lg">
            <div className="flex justify-center">
              <img
                src={member.photo}
                alt={member.name}
                className="aspect-[1/1] w-36 rounded-full"
              />
            </div>
            <div className="mt-3 text-center">
              <h2 className="font-medium">{member.name}</h2>
              <p>{member.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
