const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

const apiKey = 'c190936c72e53edaff0d21041094ef10'; // Replace with your OpenWeather API key

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});