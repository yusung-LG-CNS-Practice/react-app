import { useEffect } from "react";

const KakaoMap = () => {

    useEffect(() => {
        window.kakao.map.load(() => {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                const container = document.getElementById('map');
                const map = new window.kakao.maps.Map(container, {
                    center: new window.kakao.map.LatLng(lat, lon),
                    level: 3
                });
            })
        });
    }, [])

    return (
        <div id="map" style={{ width: '100%', height: '400px' }}>

        </div>
    );
}
export default KakaoMap;