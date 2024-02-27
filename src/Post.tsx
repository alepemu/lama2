function Post({ text }: { text: string }) {
  return (
    <div className="w-1/5 h-auto bg-orange-300 p-2">
      <h1 className="">{text}</h1>
    </div>
  );
}

export default Post;
