// import { useEffect, useState } from "react";
// import '../css/weather.css';
// import WeatherBox from "../ui/WeatherBox";
// import WeatherButton from "../ui/WeatherButton";

// const key = process.env.REACT_APP_WEATHER_API_KEY;

// const WeatherPage = () => {

//     // console.log(`debug >>>> open api key `, key);

//     const cities = ["Seoul, KR", "Busan, KR", "Daejeon, KR", "Incheon, KR", "Paris", "New York"];

//     const [city, setCity] = useState('');
//     const [weather, setWeather] = useState({});

//     //handler
//     const cityHandler = (e, city) => {
//         console.log(`debug >>>> cityHandler city ${city}`);
//         setCity(city)
//     }

//     // 도시버튼 이벤트 발생시
//     // city가 업데이트 될때 호출되는 effect
//     useEffect(() => {
//         console.log(`debug >>>> cityHandler city ${city}`);
//         if (city != '') {
//             getCityWeather();
//         }
//     }, [city])

//     // 1번 퀴즈에 대한 내 코드
//     // const getCityWeather = async () => {

//     //     console.log(`debug >>>> getCityWeather city ${city}`);

//     //     const endPoint =
//     //         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

//     //     await fetch(endPoint)
//     //         .then(response => {
//     //             console.log(`debug >>>> city weather response`, response);
//     //             return response.json();
//     //         })
//     //         .then(data => {
//     //             console.log(`debug >>>> city weather data`, data);

//     //             setWeather(data);
//     //         })
//     //         .catch(error => {
//     //             console.log(`debug >>>> city weather error`, error);
//     //         });
//     // }

//     // 1번 퀴즈에 대한 강사님 코드
//     const getCityWeather = async () => {
//         console.log(`debug >>>> getCityWeather city ${city}`);

//         const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

//         await fetch(endPoint)
//             .then(response => {
//                 console.log(`debug >>>> city weather response`, response);
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(`debug >>>> city weather data`, data);

//                 setWeather(data);
//             })
//             .catch(error => {
//                 console.log(`debug >>>> city weather error`, error);
//             });
//     }

//     // 마운트시
//     const getCurrnetLocation = () => {
//         navigator.geolocation.getCurrentPosition((position) => {
//             let lat = position.coords.latitude;
//             let lon = position.coords.longitude;

//             getCurrnetWeather(lat, lon);
//         })
//     }

//     /*
//     Q)
//     fetch api - get(QueryString)
//     endpoint - https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key}
//     */

//     const getCurrnetWeather = async (lat, lon) => {
//         console.log(`debug >>>> getCurrentWeather lat ${lat}`);
//         console.log(`debug >>>> getCurrentWeather lon ${lon}`);

//         // const endpoint = `https://api.openweathermap.org/data/2.5/onecall/current?lat=${lat}&lon=${lon}&appid=${key}`
//         // const endpoint = `https://api.openweathermap.org/data/2.5/weather/current?lat=${lat}&lon=${lon}&appid=${key}`;
//         const endPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

//         // let response = await fetch(endpoint);
//         // console.log(`debug >>>> fecth response`, response);
//         // let data = await response.json();
//         // console.log(`debug >>>> data response`, data);

//         await fetch(endPoint)
//             .then(response => {
//                 console.log(`debug >>>> fetch response`, response);
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(`debug >>>> fetch response`, data);
//                 // 원하는 코드 작업

//                 // 퀴즈에 대한 내 코드
//                 setWeather(data);
//             })
//             .catch(error => {
//                 console.log(`debug >>>> fetch error`, error);
//             })
//     }

//     useEffect(() => {
//         getCurrnetLocation();
//     }, [])

//     //UI Templete
//     return (
//         <div className="container">
//             <WeatherBox weather={weather}></WeatherBox>
//             <WeatherButton
//                 cities={cities}
//                 city={city}
//                 handler={cityHandler}></WeatherButton>

//         </div>
//     )
// }
// export default WeatherPage;



// 퀴즈 이후 카카오맵 연동 실습 코드
// 카카오맵 버전 
import { useEffect, useState } from "react";
import '../css/weather.css';
import WeatherBox from "../ui/WeatherBox";
import WeatherButton from "../ui/WeatherButton";
import KakaoMap from "../ui/KakaoMap";

const key = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherPage = () => {

    // console.log(`debug >>>> open api key `, key);

    const cities = ["서울", "부산", "대전", "인천", "대구", "광주"]; // 광주는 전라도랑 경기도 두개가 있어서 전라도 광주를 원하면 전남 광주로 해야됨.

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});

    //handler
    const cityHandler = (e, city) => {
        console.log(`debug >>>> cityHandler city ${city}`);
        setCity(city)

        // 기존 api 대신 좌표값 기반으로 변경
        getCoordsByCity(city);
    }

    // 도시버튼 이벤트 발생시
    // city가 업데이트 될때 호출되는 effect
    useEffect(() => {
        console.log(`debug >>>> cityHandler city ${city}`);
        if (city != '') {
            getCityWeather();
        }
    }, [city])

    const getCityWeather = async () => {
        console.log(`debug >>>> getCityWeather city ${city}`);

        const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

        await fetch(endPoint)
            .then(response => {
                console.log(`debug >>>> city weather response`, response);
                return response.json();
            })
            .then(data => {
                console.log(`debug >>>> city weather data`, data);

                setWeather(data);
            })
            .catch(error => {
                console.log(`debug >>>> city weather error`, error);
            });
    }

    // 마운트시
    const getCurrnetLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            getCurrnetWeather(lat, lon);
        })
    }

    /*
    Q)
    fetch api - get(QueryString)
    endpoint - https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key}
    */

    const getCurrnetWeather = async (lat, lon) => {
        console.log(`debug >>>> getCurrentWeather lat ${lat}`);
        console.log(`debug >>>> getCurrentWeather lon ${lon}`);

        // const endpoint = `https://api.openweathermap.org/data/2.5/onecall/current?lat=${lat}&lon=${lon}&appid=${key}`
        // const endpoint = `https://api.openweathermap.org/data/2.5/weather/current?lat=${lat}&lon=${lon}&appid=${key}`;
        const endPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

        // let response = await fetch(endpoint);
        // console.log(`debug >>>> fecth response`, response);
        // let data = await response.json();
        // console.log(`debug >>>> data response`, data);

        await fetch(endPoint)
            .then(response => {
                console.log(`debug >>>> fetch response`, response);
                return response.json();
            })
            .then(data => {
                console.log(`debug >>>> fetch response`, data);
                // 원하는 코드 작업

                // 퀴즈에 대한 내 코드
                setWeather(data);
            })
            .catch(error => {
                console.log(`debug >>>> fetch error`, error);
            })
    }

    useEffect(() => {
        getCurrnetLocation();
    }, [])

    ////////////// map, 도시 클릭시 좌표 얻기(kakao goecoder)
    const [moveTo, setMoveTo] = useState(null);

    const getWeatherByCoords = async (lat, lng) => {
        console.log(`debug >>>> getWeatherByCoords lat, lon : ${lat}, ${lng} `);
        let endPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;
        await fetch(endPoint)
            .then(response => {
                console.log(`debug >>>> fetch response `, response);
                return response.json();
            })
            .then(data => {
                console.log(`debug >>>> fetch response data `, data);
                setWeather(data);
            })
            .catch(error => {
                console.log(`debug >>>> fetch error `, error);
            });
    };

    ///////////// 좌표 변환 함수
    const getCoordsByCity = (cityName) => {
        console.log(`debug >>>> city name`, cityName)
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(cityName, (result, status) => {
            console.log(`debug >>>> getCoordsByCity status`, status);
            console.log(`debug >>>> getCoordsByCity rusult`, result);
            console.log(`debug >>>> getCoordsByCity status ok`, window.kakao.maps.services.Status.OK);
            if (status === window.kakao.maps.services.Status.OK) {
                const lat = parseFloat(result[0].y);
                const lng = parseFloat(result[0].x);
                setMoveTo({ lat: lat, lng: lng, time: Date.now() })
                getWeatherByCoords(lat, lng);
            } else {
                console.log(`debug >>>> getCoordsByCity 좌표변환 실패`);
            }
        });
    }


    //UI Templete
    return (
        <div className="container">
            {/* kakao map version add : coords(좌표 - 위(lat)/경도(lon)) */}
            <KakaoMap setWeatherByCoords={getWeatherByCoords}
                moveTo={moveTo}></KakaoMap>


            {/* api.openweathermap.org */}
            <WeatherBox weather={weather}></WeatherBox>
            <WeatherButton
                cities={cities}
                city={city}
                handler={cityHandler}></WeatherButton>

        </div>
    )
}
export default WeatherPage;