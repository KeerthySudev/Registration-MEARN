
const addressLookup = async (req , res) => {
    if (req.method === 'POST') {
      const { PIN } = req.body;
  
      if (!PIN) {
        return res.status(400).send('PIN number is required.');
      }
  
      try {
        // Replace this with your actual API call to verify the Aadhaar number
        const apiResponse = await fetch(`https://api.postalpincode.in/pincode/${PIN}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const responseData = await apiResponse.json();
        console.log(responseData)
        
  
        if (apiResponse.ok) {
          // Aadhaar number is valid
          return res.status(200).json({ message: 'PIN number verified successfully!', responseData });
        } else {
          // API returned an error
          const error = await apiResponse.text();
          return res.status(400).send(`Verification failed: ${error}`);
        }
      } catch (error) {
        return res.status(500).send(`An error occurred: ${error.message}`);
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  
  module.exports = { addressLookup};
  