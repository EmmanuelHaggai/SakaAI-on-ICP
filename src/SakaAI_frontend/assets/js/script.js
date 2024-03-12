function highlightMenu(id) {
  for (var i = 1; i <= 5; i++) {
    var menu = document.getElementById("link" + i);
    menu.classList.remove("active");
  }

  var menu = document.getElementById("link" + id);
  menu.classList.add("active");

  var body_content = document.getElementById("body_content");
  if (id === "1") {
    location.reload();
  } else if (id === "2") {
    document.getElementById("login").click();
  } else if (id === "3") {
    body_content.innerHTML = reg_data;

    var input = document.querySelector("#phone_number");
    var iti = window.intlTelInput(input, {
      formatOnDisplay: true,
      hiddenInput: "phone_number",
      initialCountry: "ke",
      placeholderNumberType: "MOBILE",
      preferredCountries: ['ke', 'us', 'gb'],
      utilsScript: "intl_phone_number/js/utils.js",
    });

    var div_principal = document.getElementById("principal").textContent;
    // console.log("Reg: " + div_principal);

    document.getElementById("RegistrationForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      formData.append('principal_text', div_principal);
      const endpoint2 = 'https://api.emmanuelhaggai.com/icp-reg/';

      document.getElementById('submit_registration').value = "Registering...";

      try {
        const response = await fetch(endpoint2, {
          method: 'POST',
          body: formData
        });


        if (response.ok) {
          const htmlResponse = await response.text();
          // console.log('Reg response:', htmlResponse);
          document.getElementById('reg_feedback').innerHTML = htmlResponse;

          var reg_status = document.getElementById("reg_feedback_status").textContent;
          if (reg_status == "success") {
            document.getElementById("RegistrationForm").style.display = "none";
            document.getElementById("reg_subinfo").style.display = "none";

            document.getElementById("show_section3").style.display = "none";
            document.getElementById("show_section4").style.display = "block";

            var pro_info = document.getElementById("pro_info").innerHTML;
            document.getElementById('principal_data').innerHTML = pro_info;

            document.getElementById("pro_info").innerHTML = "";

          }

          // console.log("Reg Status: ", reg_status);

        } else {
          // console.error('Server responded with an error:', response.status, response.statusText);
        }
      } catch (error) {
        // console.error('Network error:', error);
      }

      document.getElementById('submit_registration').value = "Begin Registration";


    });

  } else if (id === "4") {
    body_content.innerHTML = profile_data;

    var div_principal = document.getElementById("principal").innerHTML;
    // console.log("PROFILE: " + div_principal);

    var my_info = document.getElementById("principal_data_info").innerHTML;
    document.getElementById("my_info").innerHTML = my_info;
    // console.log("My info", my_info);

    var update_first_name = document.getElementById("principal_data_first_name").textContent;
    document.getElementById("update_first_name").value = update_first_name;
    // console.log("update_first_name", update_first_name);

    var update_last_name = document.getElementById("principal_data_last_name").textContent;
    document.getElementById("update_last_name").value = update_last_name;
    // console.log("update_last_name", update_last_name);

    var phone_number2 = document.getElementById("principal_data_phone_number").textContent;
    document.getElementById("phone_number2").value = phone_number2;
    // console.log("phone_number2", phone_number2);


    var input = document.querySelector("#phone_number2");
    var iti = window.intlTelInput(input, {
      formatOnDisplay: true,
      hiddenInput: "phone_number2",
      initialCountry: "ke",
      placeholderNumberType: "MOBILE",
      preferredCountries: ['ke', 'us', 'gb'],
      utilsScript: "intl_phone_number/js/utils.js",
    });

    document.getElementById("updateForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      formData.append('principal_text', div_principal);
      const endpoint3 = 'https://api.emmanuelhaggai.com/icp-update/';


      document.getElementById('submit_update').value = "Updating...";

      try {
        const response = await fetch(endpoint3, {
          method: 'POST',
          body: formData
        });


        if (response.ok) {
          const htmlResponse = await response.text();
          // console.log('Update response:', htmlResponse);
          document.getElementById('update_feedback').innerHTML = htmlResponse;

          var update_status = document.getElementById("update_feedback_status").textContent;
          if (update_status == "success") {

            var pro_info = document.getElementById("pro_info").innerHTML;
            document.getElementById('principal_data').innerHTML = pro_info;

            var my_info = document.getElementById("principal_data_info").innerHTML;
            document.getElementById("my_info").innerHTML = my_info;
            // console.log("My info", my_info);

            document.getElementById("pro_info").innerHTML = "";


          }

          // console.log("Update Status: ", update_status);

        } else {
          // console.error('Server responded with an error:', response.status, response.statusText);
        }
      } catch (error) {
        // console.error('Network error:', error);
      }

      document.getElementById('submit_update').value = "Update My Profile";


    });



  } else if (id === "5") {
    document.getElementById("logout").click();
  }

}


function handleLoginEvent(data) {
  // console.log('Login was successful', data);

  document.getElementById("login").style.display = "none";
  document.getElementById("show_section2").style.display = "none";

  document.getElementById("show_section5").style.display = "block";

}

document.getElementById("show_section1").addEventListener("click", function () {
  highlightMenu("1");
});
document.getElementById("show_section2").addEventListener("click", function () {
  highlightMenu("2");
});
document.getElementById("show_section3").addEventListener("click", function () {
  highlightMenu("3");
});
document.getElementById("show_section4").addEventListener("click", function () {
  highlightMenu("4");
});
document.getElementById("show_section5").addEventListener("click", function () {
  highlightMenu("5");
});


function convertImageToBase64() {
  var input = document.getElementById("cropImage");

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var base64String = e.target.result;

      console.log("Base64 String:", base64String);
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    console.log("Please select an image");
  }
}

var homeData = `
<section class="section bg-gradient half-home" id="section1">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div class="text-center">
                  <h1 class="text-white home-title mb-0">
                    SakaAI <br /> Transforming WhatsApp with AI and Blockchain Brilliance
                  </h1>
                  <div class="mt-4">
                    <a id="please_wait" style="display: block" class="btn btn-outline-white btn-round active"> Please wait...</a>
                    <a id="login" style="display: none" class="btn btn-outline-white btn-round"> Log in with Internet Identity</a>
                    <a id="open_whatsapp" style="display: none" href="https://wa.me/254797656515/?text=Hello" class="btn btn-outline-white btn-round"> Open WhatsApp </a>
                  </div>

                  <div id="externalData"></div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

var reg_data = `
<section class="section" id="section2">
<div class="container">

  <div class="row justify-content-center mt-4">
    <div class="col-xl-6 col-10">
      <div class="text-center">
        <h3 class="title"> <span class="fw-bold">SakaAI Registration Form</span></h3>
      </div>
    </div>
  </div>

  <div class="row">

    <div class="col-lg-12">
      <div class="myprofile-form mt-4 pt-4">
        <h5 id="reg_subinfo"> Let's begin your journey towards seamless AI interactions on the ICP blockchain through WhatsApp.
          Please fill out the form below to get started. <br> </h5>
          
          <div id="reg_feedback"></div>

        <form method="post" name="RegistrationForm" id="RegistrationForm">

          <div class="row">

            <div class="col-lg-6">
              <div class="form-group">
                <label for="first_name"> First Name: </label>
                <input name="first_name" id="first_name" type="text" value="" class="form-control"
                  placeholder="Your first name*">
              </div>
            </div>

            <div class="col-lg-6">
              <div class="form-group">
                <label for="last_name"> Last Name: </label>
                <input name="last_name" id="last_name" type="text" value="" class="form-control"
                  placeholder="Your last name*">
              </div>
            </div>

            <div class="col-lg-12">
              <div class="form-group">
                <label for="phone_number"> WhatsApp Phone Number: </label>
                <input id="phone_number" value="" type="tel" class="form-control"
                  placeholder="Your whatsApp phone number*">
              </div>
            </div>

          </div>

          <p class="row">
          <div class="col-lg-12">
            By providing your information, you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms of
              Service</a>.
          </div>
          </p>

          <div class="row">
            <div class="col-lg-12">
              <input type="submit" id="submit_registration" name="send" class="submitBnt btn btn-primary col-md-12"
                value="Begin Registration">
              <div id="simple-msg1"></div>
            </div>
          </div>

        </form>


      </div>

    </div>

  </div>

</div>

</section>
`;



var profile_data = `
<section class="section" id="section3">
    <div class="container">

      <div class="row justify-content-center mt-4">
        <div class="col-xl-6 col-10">
          <div class="text-center">
            <h3 class="title"> <span class="fw-bold">Update Your SakaAI Profile</span></h3>
            <p>Use this form to update your profile information and preferences, ensuring a personalized and seamless
              interaction with SakaAI on WhatsApp.</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4">
          <div class="mt-4 pt-4" id="my_info">
            <h5> My Information </h5>
            <div class="text-muted"> <span class="fw-bold ">Name:</span> Emmanuel Haggai </div>
            <div class="text-muted"> <span class="fw-bold ">WhatsApp Phone Number:</span> +254712345678 </div>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="myprofile-form mt-4 pt-4">
            <h5> Edit Personal Information </h5>

            <div id="update_feedback"></div>

            <form method="post" name="updateForm" id="updateForm">

              <div class="row">

                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="update_first_name"> First Name: </label>
                    <input name="update_first_name" id="update_first_name" type="text" value="" class="form-control"
                      placeholder="Your first name*">
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="update_last_name"> Last Name: </label>
                    <input name="update_last_name" id="update_last_name" type="text" value="" class="form-control"
                      placeholder="Your last name*">
                  </div>
                </div>

                <div class="col-lg-12">
                  <div class="form-group">
                    <label for="phone_number2"> WhatsApp Phone Number: </label>
                    <input id="phone_number2" value="" type="tel" class="form-control"
                      placeholder="Your whatsApp phone number*">
                  </div>
                </div>

              </div>

              <p class="row">
              <div class="col-lg-12">

              </div>
              </p>

              <div class="row">
                <div class="col-lg-12">
                  <input type="submit" id="submit_update" name="send" class="submitBnt btn btn-primary col-md-12"
                    value="Update My Profile">
                  <div id="simple-msg2"></div>
                </div>
              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  </section>
`;

function openFundWalletModal() {
  var modal = new bootstrap.Modal(document.getElementById('icpWalletModal'));
  modal.show();
}


function openAirtimeModal() {
  //populate data using js - icpAirtimeModalBody
  
  const airtime_principal = document.getElementById("principal").textContent;
  
  const postData = {
    principal: airtime_principal
  };

  updateTransactionState('https://api.emmanuelhaggai.com/icp-airtime/', postData)
    .then(html => {
      document.getElementById('icpAirtimeModalBody').innerHTML = html;
      attachOnClickEventListenerToClass('btn-transaction');
    });


  //create the button event listners
  attachOnClickEventListenerToClass('btn-transaction');

  // open the modal
  var modal = new bootstrap.Modal(document.getElementById('icpAirtimeModal'));
  modal.show();

}

function removeHashFromUrl() {
  history.pushState("", document.title, window.location.pathname + window.location.search);
}


function attachOnClickEventListenerToClass(className) {
  const elements = document.querySelectorAll('.' + className);

  function handleClick(event) {
    const clickedElement = event.target;

    const relValue = clickedElement.getAttribute('rel');
    const actionValue = clickedElement.getAttribute('action');

    //disable button and change text
    clickedElement.disabled = true;
    clickedElement.textContent = "Processing...";

    // console.log('Element clicked with value:', relValue, actionValue);
    const airtime_principal = document.getElementById("principal").textContent;

    const postData = {
      relValue: relValue,
      principal: airtime_principal,
      actionValue: actionValue,
    };

    updateTransactionState('https://api.emmanuelhaggai.com/icp-airtime/', postData)
      .then(html => {
        document.getElementById('icpAirtimeModalBody').innerHTML = html;
        attachOnClickEventListenerToClass('btn-transaction');
      });

  }

  elements.forEach(function (element) {
    element.addEventListener('click', handleClick);
  });
}


// document.addEventListener('DOMContentLoaded', function() {
//   attachOnClickEventListenerToClass('btn-transaction');
// });


function updateTransactionState(url, data) {
  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  return fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(html => {
      return html;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

