export default function Toolbar(props: any) {
  const { date } = props;

  const navigate = (action: any) => {
    props.onNavigate(action);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={navigate.bind(null, "TODAY")}>
          이번달
        </button>
        <button type="button" onClick={navigate.bind(null, "PREV")}>
          이전
        </button>
        <span className="rbc-toolbar-label">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</span>
        <button type="button" onClick={navigate.bind(null, "NEXT")}>
          다음
        </button>
      </span>
    </div>
  );
}
