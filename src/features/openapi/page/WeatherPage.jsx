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




// 카카오맵 버전 
import { useEffect, useState } from "react";
import '../css/weather.css';
import WeatherBox from "../ui/WeatherBox";
import WeatherButton from "../ui/WeatherButton";
import KakaoMap from "../ui/KakaoMap";

const key = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherPage = () => {

    // console.log(`debug >>>> open api key `, key);

    const cities = ["Seoul, KR", "Busan, KR", "Daejeon, KR", "Incheon, KR", "Paris", "New York"];

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});

    //handler
    const cityHandler = (e, city) => {
        console.log(`debug >>>> cityHandler city ${city}`);
        setCity(city)
    }

    // 도시버튼 이벤트 발생시
    // city가 업데이트 될때 호출되는 effect
    useEffect(() => {
        console.log(`debug >>>> cityHandler city ${city}`);
        if (city != '') {
            getCityWeather();
        }
    }, [city])

    // 1번 퀴즈에 대한 내 코드
    // const getCityWeather = async () => {

    //     console.log(`debug >>>> getCityWeather city ${city}`);

    //     const endPoint =
    //         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    //     await fetch(endPoint)
    //         .then(response => {
    //             console.log(`debug >>>> city weather response`, response);
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log(`debug >>>> city weather data`, data);

    //             setWeather(data);
    //         })
    //         .catch(error => {
    //             console.log(`debug >>>> city weather error`, error);
    //         });
    // }

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

    ////////////// map

    
    /////////////

    //UI Templete
    return (
        <div className="container">
            {/* kakao map version add */}
            <KakaoMap></KakaoMap>


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