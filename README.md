# Weather Dashboard

A production-ready interactive weather dashboard that fetches real-time data from the OpenWeatherMap API. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 🌤️ Features

### Current Weather
- Real-time temperature, humidity, pressure, and wind speed
- Weather conditions with animated icons
- Feels-like temperature
- Wind chill and dew point calculations
- UV index estimation
- Sunrise/sunset times
- Cloud cover percentage

### Forecasts
- **24-Hour Forecast**: Detailed hourly predictions
- **5-Day Forecast**: Daily weather outlook
- Temperature min/max
- Precipitation probability
- Weather icons and descriptions

### Analytics & Charts
- **Temperature Trend**: Line chart showing temperature changes
- **Humidity Level**: Humidity progression over time
- **Precipitation Chance**: Bar chart of rain probability
- **Wind Speed**: Wind speed variations
- Interactive charts with Chart.js

### Location Management
- **Geolocation**: Automatic location detection
- **Search**: Find any location worldwide using geocoding API
- **Favorites**: Save and quickly access favorite locations
- **Reverse Geocoding**: Get location name from coordinates

### User Experience
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Dark Theme**: Beautiful glassmorphism UI with dark background
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Real-time Updates**: Refresh button to get latest data
- **Error Handling**: Graceful error messages and fallbacks
- **Loading States**: Visual feedback during data fetching

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom animations
- **State Management**: Zustand with persistence
- **Data Fetching**: Axios with error handling
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenWeatherMap API key (free tier available)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/5cxxpb2yrr-ui/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your OpenWeatherMap API key:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   NEXT_PUBLIC_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
   NEXT_PUBLIC_GEO_API_URL=https://api.openweathermap.org/geo/1.0
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 API Integration

### OpenWeatherMap API
The dashboard uses the free tier of OpenWeatherMap API:

**Endpoints Used:**
- `Current Weather`: `/weather` - Real-time weather data
- `Forecast`: `/forecast` - 5-day forecast with 3-hour intervals
- `Geocoding`: `/geo/1.0/direct` - Location search
- `Reverse Geocoding`: `/geo/1.0/reverse` - Coordinates to location

**Sign Up:**
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Generate an API key from your account dashboard
4. Add to `.env.local`

## 🎨 UI Components

### Core Components
- `Button`: Customizable button with variants (primary, secondary, ghost, danger)
- `Card`: Glassmorphism card with backdrop blur
- `Input`: Styled input field with focus states

### Weather Components
- `CurrentWeather`: Displays current weather conditions and metrics
- `HourlyForecast`: 24-hour forecast with scrollable timeline
- `DailyForecast`: 5-day daily forecast
- `LocationSearch`: Location search with autocomplete
- `FavoritesList`: Manage favorite locations

### Chart Components
- `WeatherCharts`: 4-chart layout showing trends (temperature, humidity, precipitation, wind)

## 🎯 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main dashboard page
├── components/
│   ├── ui/                 # Base UI components
│   ├── weather/            # Weather-specific components
│   └── charts/             # Chart components
├── lib/
│   └── api.ts              # API calls and utilities
├── store/
│   └── weather.ts          # Zustand store with persistence
├── types/
│   └── index.ts            # TypeScript type definitions
└── styles/
    └── globals.css         # Global styles and animations
```

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Format code
npm run format
```

### Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
vercel
```

## 📊 Features Deep Dive

### Weather Calculations
- **Wind Chill**: Uses formula when temp < 10°C and wind > 3 m/s
- **Dew Point**: Calculated from temperature and humidity
- **UV Index**: Estimated from cloud cover and time of day
- **Wind Direction**: Converted from degrees to compass direction (N, NE, E, etc.)

### State Management
Using Zustand with localStorage persistence:
- Current weather data
- Forecast data
- User preferences (unit, theme, sidebar state)
- Favorite locations
- Loading and error states

### Performance Optimizations
- Cached API responses
- Lazy-loaded charts
- Optimized re-renders with React 19
- Responsive image handling
- CSS animations and transitions

## 🔒 Privacy & Security

- No user data is stored on servers
- Only geolocation coordinates are used (with user permission)
- API key should never be exposed (use backend proxy in production)
- Local storage for user preferences only

## 🐛 Error Handling

- Network error handling with fallbacks
- Graceful degradation without API key
- User-friendly error messages
- Automatic retries for failed requests
- Validation of API responses

## 📱 Responsive Breakpoints

- **Mobile**: < 640px - Single column layout
- **Tablet**: 640px - 1024px - Two column layout
- **Desktop**: > 1024px - Four column grid (sidebar + 3-column content)

## 🎨 Theming

Dark theme with glassmorphism:
- Background: `#0f172a` - Slate 900
- Surface: `#1e293b` - Slate 800  
- Glass: `#ffffff10` with backdrop blur
- Primary: `#3b82f6` - Blue 500
- Accent colors for different metrics

## 🚦 Testing

For local testing without API key:
- Mock data functions available in `lib/api.ts`
- Commented-out fallback data
- Can test UI/UX without live API calls

## 📝 Usage Examples

### Search for a location
1. Click on location search input
2. Type city name or coordinates
3. Select from results
4. Weather data updates automatically

### Add to favorites
1. View a location's weather
2. Click "Add to Favorites" button
3. Location appears in sidebar favorites
4. Click favorite to quickly switch locations

### Change temperature unit
1. Click °F or °C button in header
2. All temperatures update throughout the app
3. Preference is saved to localStorage

## 🔗 API Documentation

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [Current Weather API](https://openweathermap.org/current)
- [Forecast API](https://openweathermap.org/forecast5)
- [Geocoding API](https://openweathermap.org/api/geocoding-api)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- Chart.js for charting library
- Next.js team for the framework
- Tailwind CSS for utility-first styling

## 📞 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

---

**Built with ❤️ for weather enthusiasts**
