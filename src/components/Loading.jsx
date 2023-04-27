const Loading = ({ size }) => {
  return (
    <span
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
      }}
      className="loading_icon"
    ></span>
  );
};

export default Loading;
