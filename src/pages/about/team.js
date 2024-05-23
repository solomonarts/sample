import React from "react";
import robert from "../../assets/team/robert.png";
import stella from "../../assets/team/stella.jpg";
import mercy from "../../assets/team/mercy.png";
import { FaLinkedin } from "react-icons/fa6";

function Team() {
  const members = [
    {
      name: "Viola Stellar Mbuga",
      title: "CEO",
      linkedin: "https://www.linkedin.com/in/viola-mbuga-7966a939/",
      photo: stella,
    },
    {
      name: "Mercy Nyamoita",
      title: "Business Development",
      linkedin: "https://www.linkedin.com/in/nyamoita-osiemo-680a6987/",
      photo: mercy,
    },
    {
      name: "Robert Okello",
      title: "Growth Advisor",
      linkedin: "https://www.linkedin.com/in/robert-okello-364b7625/",
      photo: robert,
    },
  ];
  return (
    <div className="container py-10 mx-auto">
      <h3 className="mt-1 mb-8 text-4xl font-black uppercase main-color">
        The team
      </h3>

      <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member, i) => (
          <div key={i} className="py-4 overflow-hidden border rounded-lg">
            <div className="flex justify-center">
              <img
                src={member.photo}
                alt={member.name}
                className="aspect-square w-40 rounded-full object-contain bg-green-700/10"
              />
            </div>
            <div className="mt-3 text-center">
              <h2 className="text-lg font-semibold">{member.name}</h2>
              <p className="text-[var(--common-green)] font-bold">
                {member.title}
              </p>
            </div>
            <div className="mt-3 flex justify-center text-center">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="aspect-square w-fit p-2 rounded-full bg-slate-600/15 hover:bg-[var(--tan-sprite)] transition-all ease-in-out"
              >
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
