import React from "react";
import TorrentTab from "./components/TorrentTab";
import * as Constants from "./Constants";

function Result(props) {
  const NavTabs = (props) => {
    return Constants.indexer.map((e, index) => {
      const isActive = e.website === "1337x" ? "active" : "";
      return (
        <li className="nav-item" key={`nav${e.website}${index.toString}`}>
          <a
            className={`nav-link ${isActive} nav-custom-link text-capitalize`}
            id={`nav-${e.website}-tab`}
            data-toggle="tab"
            href={`#k${e.website}`}
            role="tab"
            aria-controls={`k${e.website}`}
            aria-selected="true"
          >
            {e.website}
          </a>
        </li>
      );
    });
  };

  const TabContent = (props) => {
    return Constants.indexer.map((e, index) => {
      const isActive = e.website === "1337x" ? "active" : "";
      return (
        <div
          id={`k${e.website}`}
          className={`container-fluid tab-pane ${isActive}`}
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          key={`tab${e.website}${index.toString}`}
        >
          <TorrentTab
            Key={index.toString}
            website={e.website}
            endpoint={e.endpoint}
            magnet-endpoint={e.magnet_endpoint}
            query={props.query}
          />
        </div>
      );
    });
  };
  return (
    <div className="container-fluid mt-5">
      <h2>Search Result for {props.query}</h2>
      <br></br>
      <div className="d-flex justify-content-center">
        <ul className="nav nav-tabs" role="tablist">
          <NavTabs />
        </ul>
      </div>

      <br></br>
      <div className="tab-content">
        <TabContent query={props.query} />
      </div>
    </div>
  );
}
//   return (
//     <div className="container mt-5">
//       <h2>Search Result for "Avengers"</h2>
//       <br></br>
//       <ul className="nav nav-tabs" role="tablist">
//         <li className="nav-item">
//           <a
//             className="nav-link active"
//             id="nav-1337x-tab"
//             data-toggle="tab"
//             href="#k1337x"
//             role="tab"
//             aria-controls="k1337x"
//             aria-selected="true"
//           >
//             1337x
//           </a>
//         </li>
//         <li className="nav-item">
//           <a
//             className="nav-link"
//             id="nav-menu1-tab"
//             data-toggle="tab"
//             href="#menu1"
//             role="tab"
//             aria-controls="menu1"
//             aria-selected="false"
//           >
//             Menu 1
//           </a>
//         </li>
//       </ul>

//       <br></br>
//       <div className="tab-content">
//         <div
//           id="k1337x"
//           className="container tab-pane active"
//           Key="1"
//           role="tabpanel"
//           aria-labelledby="nav-home-tab"
//         >
//           <TorrentTab name="tejas" website="1337x" />
//         </div>
//         <div
//           id="menu1"
//           className="container tab-pane fade"
//           Key="2"
//           role="tabpanel"
//           aria-labelledby="nav-home-tab"
//         >
//           <TorrentTab name="patil" website="kickass" />
//         </div>
//       </div>
//     </div>
//   );
// }

export default Result;
