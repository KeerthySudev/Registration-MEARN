/**
 * verifyAadhar - Function to verify an Aadhaar number using an external API.
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {void}
 */
const verifyAadhar = async (req, res) => {
  // Check if the HTTP method is POST
  if (req.method === "POST") {
    // Extract the Aadhaar number from the request body
    const { aadharNumber } = req.body;

    // If the Aadhaar number is not provided, return a 400 Bad Request response
    if (!aadharNumber) {
      return res.status(400).send("Aadhaar number is required.");
    }

    try {
      // Make an API request to the external service to verify the Aadhaar number
      const apiResponse = await fetch(
        "https://api.apyhub.com/validate/aadhaar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apy-token":
              "APY04k4M8jfNhrVUf27zliiohjpMNBAclnyH5ngh5AXLoJWuDYeEt8h9mfQxE5wkasd7tJ6xon11e",
          },
          body: JSON.stringify({ aadhaar: aadharNumber }),
        }
      );

      // Parse the JSON response from the API
      const responseData = await apiResponse.json();

      // If the API request was successful, return a 200 OK response with the data
      if (apiResponse.ok) {
        return res
          .status(200)
          .json({
            message: "Aadhaar number verified successfully!",
            responseData,
          });
      } else {
        // If the API request failed, return a 400 Bad Request response with the error message
        const error = await apiResponse.text();
        return res.status(400).send(`Verification failed: ${error}`);
      }
    } catch (error) {
      // If an error occurred during the API request, return a 500 Internal Server Error response
      return res.status(500).send(`An error occurred: ${error.message}`);
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed response
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

/**
 * verifyPAN - Function to verify a PAN number using an external API.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {void}
 */
const verifyPAN = async (req, res) => {
  // Check if the HTTP method is POST
  if (req.method === "POST") {
    // Extract the PAN number from the request body
    const { PAN } = req.body;

    // If the PAN number is not provided, return a 400 Bad Request response
    if (!PAN) {
      return res.status(400).send("PAN number is required.");
    }

    try {
      // Make an API request to the external service to verify the PAN number
      const apiResponse = await fetch(
        "https://aadhaar-number-verification-api-using-pan-number.p.rapidapi.com/api/validation/pan_to_aadhaar",
        {
          method: "POST",
          headers: {
            "x-rapidapi-key":
              "fa4f79a898msh6830f3d47e628b3p19d3e7jsna175e12c4db3",
            "x-rapidapi-host":
              "aadhaar-number-verification-api-using-pan-number.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pan: PAN,
            consent: "y",
            consent_text:
              "I hereby declare my consent agreement for fetching my information via AITAN Labs API",
          }),
        }
      );

      // Parse the JSON response from the API
      const responseData = await apiResponse.json();
      console.log(responseData);

      // If the API request was successful, return a 200 OK response with the data
      if (apiResponse.ok) {
        return res
          .status(200)
          .json({ message: "PAN number verified successfully!", responseData });
      } else {
        // If the API request failed, return a 400 Bad Request response with the error message
        const error = await apiResponse.text();
        return res.status(400).send(`Verification failed: ${error}`);
      }
    } catch (error) {
      // If an error occurred during the API request, return a 500 Internal Server Error response
      return res.status(500).send(`An error occurred: ${error.message}`);
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed response
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

/**
 * verifyGST - Function to verify a GST number using an external API.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {void}
 */
const verifyGST = async (req, res) => {
  // Check if the HTTP method is POST
  if (req.method === "POST") {
    // Extract the GST number from the request body
    const { GST } = req.body;

    // If the GST number is not provided, return a 400 Bad Request response
    if (!GST) {
      return res.status(400).send("GST number is required.");
    }

    try {
      // Make an API request to the external service to verify the GST number
      const apiResponse = await fetch(
        "https://gst-verification.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_gst_certificate",
        {
          method: "POST",
          headers: {
            "x-rapidapi-key":
              "fa4f79a898msh6830f3d47e628b3p19d3e7jsna175e12c4db3",
            "x-rapidapi-host": "gst-verification.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_id: "74f4c926-250c-43ca-9c53-453e87ceacd1",
            group_id: "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e",
            data: { gstin: GST },
          }),
        }
      );

      // Parse the JSON response from the API
      const responseData = await apiResponse.json();
      console.log(responseData);

      // If the API request was successful, return a 200 OK response with the data
      if (apiResponse.ok) {
        return res
          .status(200)
          .json({ message: "GST number verified successfully!", responseData });
      } else {
        // If the API request failed, return a 400 Bad Request response with the error message
        const error = await apiResponse.text();
        return res.status(400).send(`Verification failed: ${error}`);
      }
    } catch (error) {
      // If an error occurred during the API request, return a 500 Internal Server Error response
      return res.status(500).send(`An error occurred: ${error.message}`);
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed response
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

/**
 * verifyBank - Function to verify a bank account number and IFSC code using an external API.
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {void}
 */
const verifyBank = async (req, res) => {
  // Check if the HTTP method is POST
  if (req.method === "POST") {
    // Extract the bank account number and IFSC code from the request body
    const { AccountNo, IFSCcode } = req.body;

    // If either the IFSC code or account number is missing, return a 400 Bad Request response
    if (!IFSCcode || !AccountNo) {
      return res.status(400).send("Both values are required.");
    }

    try {
      // Make an API request to the external service to verify the bank account and IFSC code
      const apiResponse = await fetch(
        "https://indian-bank-account-verification.p.rapidapi.com/v3/tasks/async/verify_with_source/validate_bank_account",
        {
          method: "POST",
          headers: {
            "x-rapidapi-key":
              "fa4f79a898msh6830f3d47e628b3p19d3e7jsna175e12c4db3",
            "x-rapidapi-host":
              "indian-bank-account-verification.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task_id: "123",
            group_id: "1234",
            data: {
              bank_account_no: AccountNo,
              bank_ifsc_code: IFSCcode,
            },
          }),
        }
      );

      // Parse the JSON response from the API
      const responseData = await apiResponse.json();
      console.log(responseData);

      // If the API request was successful, return a 200 OK response with the data
      if (apiResponse.ok) {
        return res
          .status(200)
          .json({ message: "ID fetched successfully!", responseData });
      } else {
        // If the API request failed, return a 400 Bad Request response with the error message
        const error = await apiResponse.text();
        return res.status(400).send(`Verification failed: ${error}`);
      }
    } catch (error) {
      // If an error occurred during the API request, return a 500 Internal Server Error response
      return res.status(500).send(`An error occurred: ${error.message}`);
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed response
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

/**
 * getBank - Function to retrieve bank details using an ID from an external API.
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {void}
 */
const getBank = async (req, res) => {
  // Check if the HTTP method is POST
  if (req.method === "POST") {
    // Extract the ID from the request body
    const { ID } = req.body;

    // If the ID is missing, return a 400 Bad Request response
    if (!ID) {
      return res.status(400).send("ID is required.");
    }

    try {
      // Make an API request to the external service to retrieve bank details using the provided ID
      const apiResponse = await fetch(
        `https://indian-bank-account-verification.p.rapidapi.com/v3/tasks?request_id=${ID}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "fa4f79a898msh6830f3d47e628b3p19d3e7jsna175e12c4db3",
            "x-rapidapi-host":
              "indian-bank-account-verification.p.rapidapi.com",
          },
        }
      );

      // Parse the JSON response from the API
      const responseData = await apiResponse.json();
      console.log(responseData);

      // If the API request was successful, return a 200 OK response with the bank details
      if (apiResponse.ok) {
        return res
          .status(200)
          .json({
            message: "Bank details verified successfully!",
            responseData,
          });
      } else {
        // If the API request failed, return a 400 Bad Request response with the error message
        const error = await apiResponse.text();
        return res.status(400).send(`Verification failed: ${error}`);
      }
    } catch (error) {
      // If an error occurred during the API request, return a 500 Internal Server Error response
      return res.status(500).send(`An error occurred: ${error.message}`);
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed response
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

module.exports = { verifyAadhar, verifyPAN, verifyGST, verifyBank, getBank };
