const express = require('express');
const yahooFinance = require('yahoo-finance2').default;
const app = express();
const PORT = 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route to fetch Nifty data
app.get('/nifty50', async (req, res) => {
    try {
        const niftyData = await yahooFinance.quote("^NSEI");
        res.json(niftyData);
    } catch (error) {
        console.error("Error fetching Nifty data:", error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
});

// Route to fetch Bank Nifty data
app.get('/banknifty', async (req, res) => {
    try {
        const bankNiftyData = await yahooFinance.quote("^NSEBANK");
        res.json(bankNiftyData);
    } catch (error) {
        console.error("Error fetching Bank Nifty data:", error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
});

// Route to fetch Reliance stock price
app.get('/reliance', async (req, res) => {
    try {
        const relianceData = await yahooFinance.quote("RELIANCE.NS");
        res.json(relianceData);
    } catch (error) {
        console.error("Error fetching Reliance data:", error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
});

app.get('/aartiind', async (req, res) => {
    try {
        const relianceData = await yahooFinance.quote("AARTIIND.NS");
        res.json(relianceData);
    } catch (error) {
        console.error("Error fetching Reliance data:", error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
});

app.get('/abb', async (req, res) => {
    try {
        const relianceData = await yahooFinance.quote("ABB.NS");
        res.json(relianceData);
    } catch (error) {
        console.error("Error fetching Reliance data:", error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
});

app.get('/abbotindia', async (req, res) => {
    try {
        const relianceData = await yahooFinance.quote("ABBOTINDIA.NS");
        res.json(relianceData);
    } catch (error) {
        console.error("Error fetching Reliance data:", error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
});

app.get('/abcapital', async (req, res) => {
    try {
        const relianceData = await yahooFinance.quote("ABCAPITAL.NS");
        res.json(relianceData);
    } catch (error) {
        console.error("Error fetching Reliance data:", error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
});

app.get('/acc', async (req, res) => {
    try {
        const relianceData = await yahooFinance.quote("ACC.NS");
        res.json(relianceData);
    } catch (error) {
        console.error("Error fetching Reliance data:", error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
});

// Route to fetch TCS stock price
app.get('/tcs', async (req, res) => {
    try {
        const tcsData = await yahooFinance.quote("TCS.NS");
        res.json(tcsData);
    } catch (error) {
        console.error("Error fetching TCS data:", error);
        res.status(500).json({ error: "Unable to fetch data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
