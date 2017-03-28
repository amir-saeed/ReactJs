import React from "react";
let ReactDom = require('react-dom');

class IPAddress extends React.Component {

    constructor(props) {
        super(props);
    }

    findIP(onNewIP) { //  onNewIp - your listener function for new IPs
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for firefox and chrome
        var pc = new myPeerConnection({ iceServers: [] }),
            noop = function () { },
            localIPs = {},
            ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
            key;

        function ipIterate(ip) {
            if (!localIPs[ip]) onNewIP(ip);
            localIPs[ip] = true;
        }

        pc.createDataChannel(""); //create a bogus data channel

        pc.createOffer(function (sdp) {
            sdp.sdp.split('\n').forEach(function (line) {
                if (line.indexOf('candidate') < 0) return;
                line.match(ipRegex).forEach(ipIterate);
            });
            pc.setLocalDescription(sdp, noop, noop);
        }, noop); // create offer and set local description

        pc.onicecandidate = function (ice) { //listen for candidate events
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
        };
    }

    addIP(ip) {
        var li = document.createElement('li');
        li.textContent = ip;
        document.getElementById("ip-list").appendChild(li);
    }

    render() {
      //  var ul = document.createElement('ul');
     //   document.body.appendChild(ul);

        this.findIP(this.addIP);
        return (
            <div>
                <ul id="ip-list"></ul>
            </div>
        );
    }
};

export default IPAddress;




