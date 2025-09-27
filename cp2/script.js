const API_KEY = "5ffb831cd5cd5a6b0efa7d055f5726e8"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const ICON_BASE_URL = "https://openweathermap.org/img/wn/";

// Lấy các phần tử DOM
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const locationButton = document.getElementById('locationButton');
const weatherCard = document.getElementById('weatherCard');
const errorMessage = document.getElementById('errorMessage');

// Lấy các phần tử hiển thị dữ liệu
const cityNameEl = document.getElementById('cityName');
const weatherIconEl = document.getElementById('weatherIcon');
const temperatureEl = document.getElementById('temperature');
const weatherDescriptionEl = document.getElementById('weatherDescription');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');

// --- HÀM XỬ LÝ HIỂN THỊ DỮ LIỆU ---
function displayWeather(data) {
    // Ẩn thông báo lỗi nếu có
    errorMessage.classList.add('d-none');
    
    // Hiển thị thẻ thời tiết
    weatherCard.classList.remove('d-none');

    // Cập nhật nội dung
    cityNameEl.textContent = data.name;
    // Chuyển đổi nhiệt độ từ Kelvin sang Celsius: K - 273.15
    const tempCelsius = (data.main.temp - 273.15).toFixed(1); 
    temperatureEl.textContent = `${tempCelsius}°C`;
    
    const iconCode = data.weather[0].icon;
    weatherIconEl.src = `${ICON_BASE_URL}${iconCode}@2x.png`;
    weatherIconEl.alt = data.weather[0].description;
    
    // Viết hoa chữ cái đầu tiên của mô tả
    const description = data.weather[0].description;
    weatherDescriptionEl.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    
    humidityEl.textContent = `${data.main.humidity}%`;
    // Chuyển đổi từ m/s sang km/h: m/s * 3.6
    const windKmH = (data.wind.speed * 3.6).toFixed(1); 
    windSpeedEl.textContent = `${windKmH} km/h`;
}

// --- HÀM GỌI API CHUNG ---
async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                 throw new Error("Không tìm thấy thành phố. Vui lòng kiểm tra lại tên.");
            } else {
                 throw new Error(`Lỗi API: ${response.status} - ${response.statusText}`);
            }
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
        // Hiển thị thông báo lỗi trên giao diện
        weatherCard.classList.add('d-none');
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('d-none');
    }
}

// --- 1. GỌI API THEO TÊN THÀNH PHỐ ---
function fetchWeatherByCity() {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Vui lòng nhập tên thành phố!");
        return;
    }

    
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}`;
    fetchWeatherData(url);
}

// --- 2. GỌI API THEO VỊ TRÍ ĐỊNH VỊ ---
function fetchWeatherByLocation() {
    // Ẩn thẻ thời tiết cũ và thông báo lỗi
    weatherCard.classList.add('d-none');
    errorMessage.classList.add('d-none');
    
    if (navigator.geolocation) {
        // Yêu cầu quyền định vị từ người dùng
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Cú pháp URL: lat={lat}&lon={lon}&appid={API key}
                const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
                fetchWeatherData(url);
            },
            (error) => {
                console.error("Lỗi định vị:", error);
                weatherCard.classList.add('d-none');
                errorMessage.textContent = "Không thể lấy vị trí của bạn. Vui lòng cho phép quyền truy cập vị trí.";
                errorMessage.classList.remove('d-none');
            }
        );
    } else {
        alert("Trình duyệt của bạn không hỗ trợ định vị địa lý.");
    }
}

// --- GẮN SỰ KIỆN ---
searchButton.addEventListener('click', fetchWeatherByCity);
cityInput.addEventListener('keypress', (e) => {
    // Cho phép tìm kiếm khi nhấn Enter
    if (e.key === 'Enter') {
        fetchWeatherByCity();
    }
});
locationButton.addEventListener('click', fetchWeatherByLocation);

// Tải thời tiết Hà Nội mặc định khi khởi động
window.onload = () => {
    cityInput.value = "Hanoi";
    fetchWeatherByCity();
};