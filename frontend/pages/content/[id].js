import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../pages/components/header";
import Comment from "../../pages/comment";
import { LOAD_POST_REQUEST, REMOVE_POST_REQUEST } from "../../reducers/post";
import { useRouter } from "next/router";
import CommentForm from "../../pages/commentForm";
import Link from "next/link";

const Content = ({}) => {
  const { singlePost } = useSelector((state) => state.post);
  const { AllPost } = useSelector((state) => state.post);
  const router = useRouter();
  const address1 = router.query.address;
  const dispatch = useDispatch();
  const id = router.query.id;
  const map1 = new Map();
  map1.set("a", "한식");
  map1.set("b", "중식");
  map1.set("c", "일식");
  map1.set("d", "치킨");
  map1.set("e", "분식");
  map1.set("f", "카페/디저트");

  const [access_token, set_access_token] = useState({});
  const [address2, setaddress2] = useState({});

  useEffect(() => {
    set_access_token(window.localStorage.getItem("access_token"));
    if (address1 != null) {
      setaddress2(JSON.parse(address1));
    }
  }, [address1]);

  const [commentText, setCommentText] = useState("");

  // const access_token = `"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InNqYTk3MDdAZGF1bS5uZXQiLCJleHAiOjE2NjMxNjExMzAsImVtYWlsIjoic2phOTcwN0BkYXVtLm5ldCJ9.tqnzK4CCn-wLGUmNJJdf81HUlvXgjP2t2sWt3XkMWCE"`;

  const onChangeText = (e) => {
    e.preventDefault();
    set_access_token(window.localStorage.getItem("access_token"));
    setCommentText(e.target.value);
  };

  const onSubmit = (e) => {
    useEffect(() => {});
  };

  // const onRemove = (e) => {
  //   dispatch({
  //     type: REMOVE_POST_REQUEST,
  //     data: { id: address_id, access_token: access_token },
  //   });
  // };

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: id,
    });
  }, [id, singlePost]);

  return (
    <div>
      {singlePost ? (
        <div>
          <Header />

          <div className="mx-auto w-full max-w-[950px] items-center justify-center p-12">
            <div class="flex justify-between items-center ">
              <button
                type="button"
                value="한식"
                class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-[#FFD15C] text-white hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white "
              >
                {map1.get(singlePost.category)}
              </button>
              <div className=" text-[#555555] title-font font-light mb-1">
                {/* 2020-10-17 22:48:00 */}
                {singlePost.updated_at.split("T")[0]}{" "}
                {singlePost.updated_at.split("T")[1].split(".")[0]}
              </div>
            </div>

            <div class="mt-7">
              <label
                for="message"
                className="mb-5 font-custom text-[30px] block text-base font-medium text-[#07074D]"
              >
                {singlePost.title}
              </label>
              <p
                rows="9"
                id="message"
                class="w-full break-words whitespace-pre-wrap h-40 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#42DDBB] "
              >
                {singlePost.content}
              </p>
            </div>
            <div className=" mt-10">
              <div className="">{/* <p>{singlePost.content}</p> */}</div>

              <CommentForm post_id={id} />
              {singlePost.comments.map((c) => {
                return <Comment key={c.id} comments={c} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Content;
