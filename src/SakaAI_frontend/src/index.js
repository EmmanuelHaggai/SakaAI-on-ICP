import { createActor, SakaAI_backend } from "../../declarations/SakaAI_backend";

import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

const authClient = await AuthClient.create();
const identity = authClient.getIdentity();

const agent = new HttpAgent({ identity });

let actor;

try {
  actor = createActor(process.env.CANISTER_ID_SAKAAI_BACKEND, {
    agent,
  });
} catch (e) {
  actor = SakaAI_backend;
}

(async function () {
  const my_principal = await actor.whoami();
  const text_principal = my_principal.toString();

  document.getElementById("principal").innerText = text_principal;

  const segments = text_principal.split('-');

  if (segments.length > 4) {
    // console.log('User is logged in - improved');

    loginEmitter.emit('loginEvent', 'User was already logged in successfully!');

    checkRegistrationStatus(text_principal);

    document.getElementById('please_wait').style.display = 'none';

    document.getElementById('logout').style.display = 'block';
    document.getElementById('show_section5').style.display = 'block';

    document.getElementById('login').style.display = 'none';
    document.getElementById('show_section2').style.display = 'none';

    if (window.location.hash) {

      const hash = window.location.hash;

      if (hash === "#topup") {
        openFundWalletModal();
      }


    } else {
      // console.log("empty hash");
    }

  } else {
    // console.log('User is not logged in - improved');

    document.getElementById('please_wait').style.display = 'none';

    document.getElementById('logout').style.display = 'none';
    document.getElementById('show_section5').style.display = 'none';
    document.getElementById('open_whatsapp').style.display = 'none';

    document.getElementById('login').style.display = 'block';
    document.getElementById('show_section2').style.display = 'block';
  }
})();


const logout = document.getElementById("logout");

logout.onclick = async (e) => {
  e.preventDefault();
  const logout = document.getElementById("logout");
  logout.innerText = "Logging out..";
  logout.setAttribute("disabled", true);


  const logout2 = document.getElementById("show_section5");
  logout2.innerText = "Logging out..";
  logout2.setAttribute("disabled", true);

  if (authClient) {
    await authClient.logout();
    location.reload();
  }

  return false;
};


const logout2 = document.getElementById("show_section5");

logout2.onclick = async (e) => {
  e.preventDefault();

  const logout2 = document.getElementById("show_section5");
  logout2.innerText = "Logging out..";
  logout2.setAttribute("disabled", true);

  if (authClient) {
    await authClient.logout();

    location.reload();
  }

  return false;
};


const loginButton = document.getElementById("login");

loginButton.onclick = async (e) => {
  e.preventDefault();
  let authClient = await AuthClient.create();
  await new Promise((resolve) => {
    authClient.login({
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app"
          : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
      onSuccess: resolve,
    });
  });
  const identity = authClient.getIdentity();
  const agent = new HttpAgent({ identity });
  actor = createActor(process.env.CANISTER_ID_SAKAAI_BACKEND, {
    agent,
  });

  loginEmitter.emit('loginEvent', 'Login was successful!');

  document.getElementById('please_wait').style.display = 'block';

  const my_principal = await actor.whoami();
  const text_principal = my_principal.toString();

  document.getElementById("principal").innerText = text_principal;

  checkRegistrationStatus(text_principal)

  document.getElementById('logout').style.display = 'block';
  document.getElementById('show_section5').style.display = 'block';

  document.getElementById('login').style.display = 'none';
  document.getElementById('show_section2').style.display = 'none';

  document.getElementById('please_wait').style.display = 'none';

  return false;
};




function retrieveDetailsFromHash() {
  const hash = window.location.hash;

  const parts = hash.substring(1).split('-');

  if (parts.length === 2) {
    const phone = parts[0];
    const pin = parts[1];

    // console.log('Part 1:', phone);
    // console.log('Part 2:', pin);

    return { phone, pin };
  } else {
    // console.error('Unexpected hash format:', hash);
    return null;
  }
}

async function updateInfo(phone, pin, principal_text) {
  const endpoint = 'https://api.emmanuelhaggai.com/icp/';

  let formData = new FormData();

  formData.append('phone', phone);
  formData.append('pin', pin);
  formData.append('principal_text', principal_text);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const htmlResponse = await response.text();
      // console.log('Server responded with HTML:', htmlResponse);
      document.getElementById('externalData').innerHTML = htmlResponse;

    } else {
      // console.error('Server responded with an error:', response.status, response.statusText);
    }
  } catch (error) {
    // console.error('Network error:', error);
  }
}

async function checkRegistrationStatus(principal_text) {
  const endpoint = 'https://api.emmanuelhaggai.com/icp/';

  let formData = new FormData();

  formData.append('principal_text', principal_text);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const htmlResponse = await response.text();

      // console.log('Feedback:', htmlResponse);

      document.getElementById('principal_data').innerHTML = htmlResponse;

      var principal_data_principal = document.getElementById("principal_data_principal").textContent;

      if (principal_data_principal === principal_text) {
        document.getElementById("show_section4").style.display = "block";
        document.getElementById("open_whatsapp").style.display = "block";


      } else {
        document.getElementById("show_section3").style.display = "block";

        document.getElementById("show_section3").click();
      }
    } else {
      // console.error('Response Error:', response.status, response.statusText);
    }
  } catch (error) {
    // console.error('Network error:', error);
  }
}


function EventEmitter() {
  this.events = {};
}
EventEmitter.prototype.on = function (eventName, listener) {
  if (!this.events[eventName]) {
    this.events[eventName] = [];
  }
  this.events[eventName].push(listener);
};
EventEmitter.prototype.emit = function (eventName, data) {
  if (this.events[eventName]) {
    this.events[eventName].forEach(function (listener) {
      listener(data);
    });
  }
};

const loginEmitter = new EventEmitter();

loginEmitter.on('loginEvent', handleLoginEvent);

