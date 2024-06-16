const CommentBox = ({ data }) => {
  return data.map((comment, index) => (
    <div className=" pl-10 border-l-2 border-black" key={index}>
      <div className="flex h-20 items-center">
      
          <img
            className="w-14 h-14 p-2 rounded-full"
            src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
            alt="user"
          />
        <div className=" h-14 gap-1">
          <p className="font-bold px-2">{comment.username}</p>
          <p className="px-2">{comment.comment}</p>
        </div>
        
      </div>
      {/* this is recursion component is used inside it (Data Structure) */}
      <div>{comment?.replies && <CommentBox data={comment.replies} />}</div>
    </div>
  ));
};
export default CommentBox;
