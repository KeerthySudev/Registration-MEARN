
const verifyAadhar = async (req , res) => {
  if (req.method === 'POST') {
    const { aadharNumber } = req.body;

    if (!aadharNumber) {
      return res.status(400).send('Aadhaar number is required.');
    }

    try {
      // Replace this with your actual API call to verify the Aadhaar number
      const apiResponse = await fetch('https://api.apyhub.com/validate/aadhaar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apy-token': 'APY04k4M8jfNhrVUf27zliiohjpMNBAclnyH5ngh5AXLoJWuDYeEt8h9mfQxE5wkasd7tJ6xon11e',
        },
        body: JSON.stringify({ aadhaar: aadharNumber }),
      });

      const responseData = await apiResponse.json();

      if (apiResponse.ok) {
        // Aadhaar number is valid
        return res.status(200).json({ message: 'Aadhaar number verified successfully!',responseData });
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

const verifyPAN = async (req , res) => {
  if (req.method === 'POST') {
    const { PAN } = req.body;

    if (!PAN) {
      return res.status(400).send('PAN number is required.');
    }

    try {
      // Replace this with your actual API call to verify the Aadhaar number
      const apiResponse = await fetch('https://aadhaar-number-verification-api-using-pan-number.p.rapidapi.com/api/validation/pan_to_aadhaar', {
        method: 'POST',
        headers: {
          'x-rapidapi-key': 'fa4f79a898msh6830f3d47e628b3p19d3e7jsna175e12c4db3',
    'x-rapidapi-host': 'aadhaar-number-verification-api-using-pan-number.p.rapidapi.com',
    'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pan: PAN,
        consent: "y",
        consent_text: "I hear by declare my consent agreement for fetching my information via AITAN Labs API" }),
      });

      const responseData = await apiResponse.json();
      console.log(responseData)

      if (apiResponse.ok) {
        // Aadhaar number is valid
        return res.status(200).json({ message: 'PAN number verified successfully!',responseData });
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

const verifyGST = async (req , res) => {
  if (req.method === 'POST') {
    const { GST } = req.body;

    if (!GST) {
      return res.status(400).send('GST number is required.');
    }

    try {
      // Replace this with your actual API call to verify the Aadhaar number
      const apiResponse = await fetch('https://gst-verification.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_gst_certificate', {
        method: 'POST',
        headers: {
          'x-rapidapi-key': 'fa4f79a898msh6830f3d47e628b3p19d3e7jsna175e12c4db3',
    'x-rapidapi-host': 'gst-verification.p.rapidapi.com',
    'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task_id: '74f4c926-250c-43ca-9c53-453e87ceacd1',
        group_id: '8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e',
        data: {
          gstin: GST
        } }),
      });

      const responseData = await apiResponse.json();
      console.log(responseData)

      if (apiResponse.ok) {
        // Aadhaar number is valid
        return res.status(200).json({ message: 'GST number verified successfully!',responseData });
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

const verifyBank = async (req , res) => {
  if (req.method === 'POST') {
    const { AccountNo, IFSCcode } = req.body;

    if (!IFSCcode || !AccountNo) {
      return res.status(400).send('Both values are required.');
    }

    try {
      // Replace this with your actual API call to verify the Aadhaar number
      const apiResponse = await fetch('https://indian-bank-account-verification.p.rapidapi.com/v3/tasks/async/verify_with_source/validate_bank_account', {
        method: 'POST',
        headers: {
          'x-rapidapi-key': 'fa4f79a898msh6830f3d47e628b3p19d3e7jsna175e12c4db3',
    'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com',
    'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task_id: '123',
        group_id: '1234',
        data: {
          bank_account_no: AccountNo,
          bank_ifsc_code: IFSCcode
        } }),
      });

      const responseData = await apiResponse.json();
      console.log(responseData)
     

      if (apiResponse.ok) {
        return res.status(200).json({ message: 'ID fetched successfully!',responseData });
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

const getBank = async (req , res) => {
  if (req.method === 'POST') {
    const { ID } = req.body;

    if (!ID) {
      return res.status(400).send('ID is required.');
    }

    try {
      // Replace this with your actual API call to verify the Aadhaar number
      const apiResponse = await fetch(`https://indian-bank-account-verification.p.rapidapi.com/v3/tasks?request_id=${ID}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'fa4f79a898msh6830f3d47e628b3p19d3e7jsna175e12c4db3',
          'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com'
        },
      });

      const responseData = await apiResponse.json();
      console.log(responseData)


      if (apiResponse.ok) {
        return res.status(200).json({ message: 'Bank details verified successfully!',responseData });
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

module.exports = { verifyAadhar,verifyPAN, verifyGST, verifyBank, getBank};
