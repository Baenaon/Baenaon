import React, { useEffect, useState } from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_ALLPOST_REQUEST } from "../reducers/post";
import Header from "../pages/components/header";

const Maps = () => {
  const dispatch = useDispatch();
  const [location_list, setLocationList] = useState({});
  const { allPost } = useSelector((state) => state.user);
  const [access_token, set_access_token] = useState({});

  

  useEffect(() => {
    
    set_access_token(window.localStorage.getItem("access_token"));
  
    axios
      .get("http://127.0.0.1:8000/api/map/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (response) {
        setLocationList(response.data.address);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [access_token]);

  useEffect(() => {
  
    dispatch({
      type: LOAD_ALLPOST_REQUEST,
      data: location_list,
    });
  }, [location_list]);

  return (
    <div>
      <Header />
      <Map // 지도를 표시할 Container
        center={{
          lat: 37.6209501145497,
          lng: 127.061242629476,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "700px",
        }}
        level={4}
      >
        {Object.keys(location_list).map((position) => (
          <MapMarker
            position={{
              lat: location_list[position].lat,
              lng: location_list[position].long,
            }} // 마커를 표시할 위치
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35,
              },
            }}
            title={location_list[position].id}
          >
            <Link
              href={{
                pathname: "/postcards/[post_id]",
                query: {
                  post_id: location_list[position].id,
                },
              }}
            >
              <div style={{ padding: "3px", color: "#000" }}>
                <span> &nbsp; {location_list[position].locationname}</span>

                <span style={{ color: "red" }}>
                  &nbsp; {location_list[position].post_count}
                </span>
              </div>
            </Link>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
};

export default Maps;
