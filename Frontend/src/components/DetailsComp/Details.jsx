import React, { useContext, useEffect, useState } from "react";
import { useStartupsData } from "../../contexts/GroupContext";
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/userContext";
import { toast } from "react-toastify";

const Details = ({ startupId,setJoinedStartups }) => {
    const navigate = useNavigate()
  const { startupsData } = useStartupsData();
  const [clickedStartup, setClickedStartup] = useState(null);
  const {user} = useContext(UserDataContext)

  useEffect(() => {
    const data = startupsData.find((startup) => startup._id === startupId);
    setClickedStartup(data);
  }, [startupId, startupsData]);

  if (!clickedStartup) {
    return <div className="text-white p-6">Loading blog...</div>;
  }


  const handleJoin = async() => {
     try {
       const res =   await fetch(`${import.meta.env.VITE_BASE_URL}/group/join-group`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                group:clickedStartup._id,
                user: user._id
            })
         })

         if(res.ok){
            setJoinedStartups((prev) => [
                {
                    name: clickedStartup.name,
                    bgColor:clickedStartup.bgColor,
                    groupId: clickedStartup._id,
                },
                ...prev,
            ]);
            toast.success(`Joined ${clickedStartup.name}`);
         }else{
            const data = await res.json();
            toast.error(data.message || "Already joined group");
         }
     } catch (error) {
         console.log(error);
         toast.error("Something went wrong!");
     }

  }

  const { name, description, website, industry, funding, bgColor } =
    clickedStartup;

  return (
    <div className="min-h-screen mt-4 rounded-md bg-gray-950 text-white px-4 md:px-10 py-12 font-serif leading-relaxed">
      <article className="max-w-full mx-auto space-y-12 ">
      <button className="flex gap-5 bg-zinc-200 text-zinc-800 p-2 rounded-md " 
       onClick={() => navigate("/Home")}
      >
        <FaBackward className="text-xl mt-1"/>
        Back To Feed
        </button>

        {/* Header  */}
        <header className="text-center"> 
          <h1 className="text-5xl font-bold mb-4" style={{ color: bgColor }}>
            {name}
          </h1>

          <p className="text-md">Kathmandu, Nepal • {industry.join(", ")}</p>

         <button 
         className="mt-2 mb-0 bg-zinc-200 text-zinc-800 px-5 py-1 rounded-md hover:bg-blue-200" 
         onClick={() => handleJoin()}
         >
            Join
          </button>
        </header>

        {/* Hero Image  */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://imgs.search.brave.com/Sc-7Ks_abV0oMa31Maw7Ntl13IWfTd-Cq8clyBmcunc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by90ZWNobm9sb2d5/LXN0YXJ0dXAtY29u/Y2VwdF82NzAxNDct/NzU4NzkuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA"
            alt="Startup Visual"
            className="w-full h-72 object-cover"
          />
        </div>
        {/* Into Blog Section  */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">
            Redefining Opportunities in Nepal
          </h2>
          <p className="text-lg text-gray-300">
            In a world where connections matter more than ever,{" "}
            <strong>{name}</strong> is stepping up to bridge the gap between
            talent and opportunity. Born in the heart of Kathmandu, this
            platform is more than a job portal-it's a lifeline for job seekers
            and a powerful tool for recruiters looking for top talent in Nepal
            and beyond.
          </p>
        </section>

        {/* About the Startup  */}
        <section>
          <h2
            className="text-2xl font-semibold mb-3"
            style={{ color: bgColor }}
          >
            A Platform with a Purpose
          </h2>
          <p className="text-gray-300">
            {description} With a focus on unsability, simplicity, and impact,{" "}
            <strong>{name}</strong> brings a fresh take to recruitment in South
            Asia. Whether you're a fresh graduate looking to break into Your
            field or a company scaling up, this platform ensures you're seen by
            the right people.
          </p>
        </section>

        {/* Industry Context  */}
        <section>
          <h2
            className="text-2xl font-semibold mb-3"
            style={{ color: bgColor }}
          >
            Why Recruitment and HR Tech Matter
          </h2>

          <p className="text-gray-300">
            The <em>{industry.join(" and ")}</em> industries are no longer about
            just hiring. They're about creating inclusive, data-driven
            workplaces and making career discovery smarter.
            {name} recognizes this and uses technology to simplify and humanize
            hiring processes.
          </p>
        </section>
        {/* Funding Journey */}
        <section>
          <h2
            className="text-2xl font-semibold mb-3"
            style={{ color: bgColor }}
          >
            Fueling Growth with Purpose
          </h2>
          <div className="text-gray-300">
            <p>
              With funding secured in the <strong>{funding.stage}</strong>{" "}
              stage, {name} has shown that investors are seeing the potential.
              It has gone through <strong>{funding.rounds}</strong>{" "}
              {funding.rounds > 1 ? "rounds" : "round"} of funding.
            </p>
            {funding.investors && funding.investors.length > 0 && (
              <p>
                Backed by investor like <em>{funding.investors.join(", ")}</em>,
                the platform is ready to scale and evolve.
              </p>
            )}
          </div>
        </section>

        {/* Visual Break  */}
        <div
          className="w-full h-[2px] my-6"
          style={{ backgroundColor: bgColor }}
        ></div>

        {/* Call to Action */}
        <section className="text-center">
            <h2 className="text-2xl font-semibold mb-2" style={{color: bgColor}}>
             Ready to Explore?
            </h2>
         <p className="text-gray-300 mb-4">
            Join thousands eho trust {name} to find their next opportunity.
         </p>
         <a 
         href={website}
         target="_blank"
         rel="noopener noreferrer"
         className="inline-block px-6 py-2 rounded-full text-white transition group"
         style={{'--bg-color': bgColor}}
         >
            <span className="group-hover:text-[var(--bg-color)]">🌐 Visit Official Website</span>

         </a>
        </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-700 pt-6 text-sm text-center text-gray-500">
         <p>
            Originally published on StartupSpotlight •{" "}
            {new Date().toDateString()}
         </p>
      </footer>

      </article>
    </div>
  );
};

export default Details