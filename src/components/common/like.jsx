const Like = ({ liked, onClick, disabled }) => {
  let classes = "fa fa-thumbs";
  if (liked) classes += "-up";
  else classes += "-o-up";

  return (
    <div
      onClick={disabled ? null : onClick}
      className={disabled ? null : "clickable"}
    >
      <i className={classes} aria-hidden="true"></i>
    </div>
  );
};

export default Like;
