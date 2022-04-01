import React, { Component } from "react";
import TorrentCard from "./TorrentCard";
import { getTorrents } from "../utils/network_utils";
import { NoContentFound, ServerError } from "../components/CustomError";
import ClipLoader from "react-spinners/ClipLoader";
import { default as v4 } from "uuid/dist/v4";

class TorrentTab extends Component {
  PROXY_URL = "https://cors-anywhere.herokuapp.com/";
  // PROXY_URL = "https://crosdev.herokuapp.com/";
  state = {
    torrents: undefined,
    no_content_found: false,
    server_error: false,
    server_is_waking: false,
    retry: true,
  };

  componentDidMount() {
    getTorrents(this.props.endpoint, this.props.query)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            torrents: res.data["data"],
          });
        } else if (res.status === 204) {
          this.setState({
            no_content_found: true,
            retry: false,
          });
        } else {
          this.setState({
            server_error: true,
            retry: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          server_error: true,
          retry: false,
        });
      });
    setInterval(this.setServerIsWaking, 10000);
  }

  setServerIsWaking = () => {
    if (this.state.server_error) {
      return;
    }
    if (this.state.torrents === undefined) {
      this.setState({
        server_is_waking: true,
      });
      if (this.state.retry) {
        getTorrents(this.props.endpoint, this.props.query)
          .then((res) => {
            if (res.status === 200) {
              this.setState({
                torrents: res.data["data"],
                server_is_waking: false,
              });
            } else if (res.status === 204) {
              this.setState({
                no_content_found: true,
                server_is_waking: false,
              });
            } else {
              this.setState({
                server_error: true,
                server_is_waking: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  render() {
    if (this.state.no_content_found) {
      return <NoContentFound />;
    } else if (this.state.torrents === undefined) {
      return this.state.server_is_waking ? (
        <div className="container p-5">
          <div className="col">
            <h4 className="text-monospace text-muted">
              Sorry for inconvenience <br /> Wait for Few Seconds while server
              is Waking
            </h4>
            <ClipLoader color="red" />
          </div>
        </div>
      ) : (
        <div className="container p-5">
          <ClipLoader color="red" />
        </div>
      );
    } else if (this.state.server_error) {
      return <ServerError />;
    } else {
      return (
        <div className="row">
          {this.state.torrents.map((e, index) => {
            return (
              <div
                className="col-lg-4 col-md-12 col-sm-12"
                key={`${this.props.website}${index.toString()}`}
              >
                <TorrentCard torrent={e} Key={v4()} />
                <br></br>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default TorrentTab;
