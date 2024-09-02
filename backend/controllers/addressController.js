/**
 * addressLookup - Function to verify a given PIN number using an external postal API.
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {void}
 */

const addressLookup = async (req, res) => {
  // Check if the HTTP method is POST
  if (req.method === "POST") {
    // Extract the PIN number from the request body
    const { PIN } = req.body;

    // If the PIN number is not provided, return a 400 Bad Request response
    if (!PIN) {
      return res.status(400).send("PIN number is required.");
    }

    try {
      // Make an API request to the postal pincode service to verify the PIN number
      const apiResponse = await fetch(
        `https://api.postalpincode.in/pincode/${PIN}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Parse the JSON response from the API
      const responseData = await apiResponse.json();
      console.log(responseData);

      // If the API request was successful, return a 200 OK response with the data
      if (apiResponse.ok) {
        return res
          .status(200)
          .json({ message: "PIN number verified successfully!", responseData });
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

module.exports = { addressLookup };
