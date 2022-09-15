import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../pages/components/header";
import Comment from ".././comment";
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
  const address_id = 1;

  const onChangeText = (e) => {
    e.preventDefault();
    set_access_token(window.localStorage.getItem("access_token"));
    setCommentText(e.target.value);
  };

  const onSubmit = (e) => {
    useEffect(() => {});
  };

  const onRemove = (e) => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: { id: address_id, access_token: access_token },
    });
  };

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
          {/*<a*/}
          {/*  onClick={onRemove}*/}
          {/*  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#6A64F1] rounded-lg hover:bg-[#5f57ff] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/}
          {/*>*/}
          {/*  삭제*/}
          {/*  <svg*/}
          {/*    aria-hidden="true"*/}
          {/*    className="ml-2 -mr-1 w-4 h-4"*/}
          {/*    fill="currentColor"*/}
          {/*    viewBox="0 0 20 20"*/}
          {/*    xmlns="http://www.w3.org/2000/svg"*/}
          {/*  ></svg>*/}
          {/*</a>*/}
          <div className=" items-center justify-center p-12">
            {/*container*/}
            <div className="m-5 mx-auto w-full max-w-[700px]">
              <div className="">
                <h2 className="h-6 text-sm title-font text-gray-500 tracking-widest">
                  {address2.addressname}&nbsp; / {singlePost.category}
                </h2>
                <div>
                <h1 className="h-11 text-gray-900 text-4xl title-font font-medium mb-1">
                  {singlePost.title}
                </h1>

                <h1 className=" text-gray-900 text-xs title-font font-medium mb-1">
                  {singlePost.updated_at.split("T")[0]}  {singlePost.updated_at.split("T")[1].split(".")[0]}
                </h1>

                </div>
              </div>
              <div className="mb-40">
                <div className="h-5 flex-grow border-t-2 "></div>
                <p>{singlePost.content}</p>
              </div>

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
