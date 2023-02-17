interface Section123Type {
  title: string;
  desc: string;
  buttonTitle: string;
}

function Section123({ title, desc, buttonTitle }: Section123Type) {
  return (
    <div className="grid-container">
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="body">
        <div className="desc">
          <p>{desc}</p>
        </div>
        <button className="nav-resrve-btn" type="button">
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}

export default Section123;
