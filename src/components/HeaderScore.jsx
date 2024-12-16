import "../styles/header.css";
function HeaderShow({ props, prop2 }) {
  return (
    <div className="box-score">
      <div className="names argentina">
        <div className="name_container _1">
          <div className="name_container_name name" data-name="Pelé">
            <span>Score {props}</span>
          </div>
        </div>
        <div className="name_container _4">
          <div className="name_container_name name" data-name="Pelé">
            <span>Best Score {prop2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderShow;
