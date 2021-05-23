const Like = ({ liked, onClick }) => {
  let classes = "fa fa-thumbs";
  if (liked) classes += "-up";
  else classes += "-o-up";

  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <i className={classes} aria-hidden="true"></i>
    </div>
  );
};

export default Like;
