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
  const [flag, set_flag] = useState(false);

  useEffect(() => {
    set_access_token(window.localStorage.getItem("access_token"));
    if (address1 != null) {
      setaddress2(JSON.parse(address1));
    }
  }, [address1]);

  const [commentText, setCommentText] = useState("");

  const onChangeText = (e) => {
    e.preventDefault();
    set_access_token(window.localStorage.getItem("access_token"));
    setCommentText(e.target.value);
  };

  const onSubmit = (e) => {
    useEffect(() => {});
  };

  const onRemove = (e) => {
    set_flag(true);
    console.log("flag1", flag);
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: { id: id, access_token: access_token },
    });
  };

  useEffect(() => {
    if (typeof id !== "undefined" && !flag) {
      console.log("flag2", flag);
      dispatch({
        type: LOAD_POST_REQUEST,
        data: id,
      });
    }
  }, [id, singlePost]);

  return (
    <div>
      {singlePost ? (
        <div>
          <Header />

          <div className="mx-auto w-full max-w-[950px] items-center justify-center p-12">
            <div className="mb-3">
              <div>
                <div class="flex justify-between items-center ">
                  <button
                    type="button"
                    value="한식"
                    class="rounded-xl inline-block text-[17px] outline outline-offset-0 border-0 px-9 py-3 bg-[#FFD15C] text-white hover:bg-[#FFD15C] hover:text-white focus:bg-[#FFD15C] focus:text-white "
                  >
                    {map1.get(singlePost.category)}
                  </button>
                  <div className=" text-[#555555] title-font font-light mb-1">
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
              </div>
              <div class="">
                <button
                  onClick={onRemove}
                  className="float-right mt-2 hover:shadow-form rounded-md bg-[#42DDBB]  px-5 py-3 text-base font-semibold text-white outline-none"
                  // loading={addCommentLoading}
                >
                  삭제
                </button>

                <div>
                  {/* <a href="/editform">dd</a> */}
                  <Link
                    href={{
                      pathname: `/editpost/[post_id]`,
                      query: {
                        post_id: id,
                      },
                    }}
                  >
                    <button className="float-right mt-2 mr-2 hover:shadow-form rounded-md bg-[#42DDBB]  px-5 py-3 text-base font-semibold text-white outline-none">
                      수정
                    </button>
                  </Link>
                </div>
              </div>
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
        <div>loading…</div>
      )}
    </div>
  );
};

export default Content;
