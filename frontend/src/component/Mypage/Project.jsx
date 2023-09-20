import '../../css/Project.css';


const Project = () => {


   const ProjectData = [
    // {
    //   id: 1,
    //   imageSrc: wunder,
    //   text: "Hip한 소셜미디오 앱",
    // }, {
    //   id: 1,
    //   imageSrc: wunder,
    //   text: "Hip한 소셜미디오 앱",
    // }, {
    //   id: 1,
    //   imageSrc: wunder,
    //   text: "Hip한 소셜미디오 앱",
    // }, {
    //   id: 1,
    //   imageSrc: wunder,
    //   text: "Hip한 소셜미디오 앱",
    // }, {
    //   id: 1,
    //   imageSrc: wunder,
    //   text: "Hip한 소셜미디오 앱" }
    ];


  return (

    // 프로젝트 보여주는 곳
    <div>
      <div className='pro-map-container'>
        {ProjectData.map((item) => (
          <div key={item.id} className="port-list">
            <img src={item.imageSrc} alt="포트폴리오 파일의 첫 사진" />
            <div className="port-text">{item.text}</div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Project