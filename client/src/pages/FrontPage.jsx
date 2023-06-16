import React from "react";
import "../css/Frontpage.css";
import Buddha from "../Assets/Images/buddha_Avatar.png";
import PenguinCircle from "../Assets/Images/penguin_linux_circle.png";
import PenguinSquare from "../Assets/Images/linux_penguin.png";
import Sapling from "../Assets/Images/Sapling.jpg";
import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <div className="first_container">
      <div className="desktop-1">
        <div className="welcome-to-evergreen">Vanarakshak</div>

        <div className="benefits-of-tree-plantation-parent">
          <p className="here-are-the">Open Sourcing with Nature!</p>
          <img className="benefits-of-tree-plantation-" alt="" src={Sapling} />
          <div className="here-are-the-container">
            <p className="here-are-the">{`”Vanarakshak”, is dedicated to mitigating the  
`}</p>
            <p className="here-are-the">{`environmental impact of the IT sector by utilizing  `}</p>
            <p className="here-are-the">
              technology for nature conservation and promoting
            </p>
            <p className="here-are-the">{`sustainability. `}</p>
            <p className="the-correct-data">
              Join us in our journey to merge technology
            </p>
            <p className="here-are-the">{`with environment.`}</p>
            <Link to="/login" style={{ marginRight: "20px" }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
        <div className="frame-2">
          <div className="frame-2-child" />
          <div className="top-3-ranked">Our Top 3 Leaders</div>
          <div className="top-3">
            <div className="rank1">
              <img className="rank1-child" alt="" src={Buddha} />
              {/* <img className="st-1-icon" alt="" src={Buddha} /> */}
              <div className="people-info">
                <div className="people-info-child" />
                <b className="plants1">550 plants</b>
                <div className="hari-adhikari">Ashbin Wosti</div>
              </div>
            </div>
            <div className="rank2">
              <img className="rank2-child" alt="" src={PenguinSquare} />
              {/* <img
								className="rd-1-icon"
								alt=""
								src={PenguinCircle}
							/> */}
              <div className="people-info1">
                <div className="people-info-child" />
                <b className="plants2">523 plants</b>
                <div className="hari-adhikari">Hari Adhikari</div>
              </div>
            </div>
            <div className="rank3">
              <img className="rank3-child" alt="" src={PenguinCircle} />
              {/* <img
								className="nd-1-icon"
								alt=""
								src={PenguinSquare}
							/> */}
              <div className="people-info2">
                <div className="people-info-child" />
                <b className="plants2">495 plants</b>
                <div className="hari-adhikari">Binaye Marhatta</div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: "590px", fontSize: "24px" }}>
            <p>
              ABOUT THE PROJECT We propose a comprehensive tree management
              platform that integrates OpenStreetMap (OSM) data. With a focus on
              tree conservation and urban greening, our platform empowers
              individuals, communities, and organizations to actively engage in
              tree planting campaigns, preserve trees in urban planning, and
              assess tree-based ecosystem services. Through advanced features
              such as tree inventory, mapping, and species identification, we
              provide the necessary tools to make a positive environmental
              impact. Our mission is to foster environmental sustainability,
              support social welfare programs, and create a greener future by
              using statistics tools to collect data and provide a way to reward
              contributors based on the number of trees they plant through a
              user-friendly application (web or mobile) that efficiently manages
              tree-related data. Join us in our journey to merge technology with
              environmental sustainability and contribute significantly to a
              resilient and sustainable future.
            </p>
            <p>
              PROBELM YOU ARE SOLVING The main problem with social welfare
              programs lies in people's lack of responsibility and their race to
              take ownership of contribution from the general mass. Yearly,
              thousands of trees and forests, cultivable land and tree canopy
              areas are being destroyed even with the efforts from countless
              NGOs INGOs which are not so open about what they’ve done and how
              they function as an organization. Our main objective is to
              maintain an online record of every plant in a region, plant people
              would like to grow, aiming to tackle major issues such as
              deforestation, forest fires, air pollution and features to provide
              solutions to minor issues related to farming and cultivation.
              Planting a few trees alone cannot purify the air, but by making it
              open source, we could encourage community-wide contributions to
              create a larger impact. What we’re trying to accomplish is not
              just open source as in technical statements but a community effort
              that can pave ways to green future for the next generation.
            </p>
            <p>
              USE OF OSM OpenStreetMap (OSM) can be utilized in this project by
              evaluating geolocation information and transforming it based on
              plants and trees data. This integration would significantly
              enhance worldwide surveys and data collection efforts, allowing
              for a comprehensive assessment of tree distribution and
              characteristics across different regions. To ensure privacy and
              respect land ownership, it is essential to map trees in public
              spaces or obtain the landowner's permission. Furthermore, OSM can
              be utilized to calculate the percentage of land covered by green
              areas, analyze the distribution of green spaces in various
              regions, and assess the proximity of green spaces to specific
              locations. By incorporating OSM data, it becomes possible to
              quantify the ecosystem services provided by trees, such as carbon
              sequestration and stormwater management. This information is
              valuable for decision-making processes, impact assessments, and
              advocacy efforts, as it can be integrated with other environmental
              factors such as air quality and water bodies. Lastly, visualizing
              the positive impact of trees through OSM helps effectively
              communicate their benefits to users.
            </p>
            <p>
              ABOUT TEAM We are a team of four IT students with a wide range of
              skills ranging from backend development, frontend development,
              UI/UX designing and database implementation. We are passionate
              about innovation and are eager to showcase our talents. We have
              been working hard to prepare for the upcoming hackathon and are
              confident that we have what it takes to create a winning project.
              We are a team of innovators, collaborators, and problem-solvers
              who are excited to work together to create something truly
              special. We are determined to succeed and are ready to pave our
              path to Kathmandu valley.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
