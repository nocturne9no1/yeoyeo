import { IntroContents } from "src/constants/contents";

function Intro() {
  const { body } = IntroContents;

  const poemGenerator = (poem: string, paragraphSpacing?: number[]) => {
    const result = poem.split("\n");
    if (paragraphSpacing) {
      const sortedArr = paragraphSpacing?.sort();
      for (let i = 0; i < sortedArr?.length; i += 1) {
        result.splice(paragraphSpacing[i] + i, 0, "");
      }
    }
    return result;
  };
  return (
    <div className="intro-wrap">
      <article className="contents-section">
        <div className="top">
          <p>Intro page</p>
          <p>Content top</p>
        </div>
        <div className="body">
          <p>Content body</p>
          <div className="poem">
            {poemGenerator(body.poem, [4, 9, 13, 17]).map((sentence) => {
              if (!sentence) {
                return <br />;
              }
              return (
                <p>
                  <span>{sentence}</span>
                </p>
              );
            })}
          </div>
        </div>
        <div className="bottom">
          <button className="nav-resrve-btn" type="button">
            예약하기
          </button>
        </div>
        {/* <div className="side">

        </div> */}
      </article>
    </div>
  );
}

export default Intro;
