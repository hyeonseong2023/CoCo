import { useLocation } from 'react-router-dom';

const SinglePage: React.FC = () => {
  const location = useLocation();
  const data = location.state as any;

  const [boardData, setBoardData] = useState();

  const fetchData = async() => {
    console.log(data.id);
    console.log(data.cust_id);
    console.log("axios 전");

          await axios.get(`http://localhost:8099/selectpostviews/${data.id}`)
          .then(res => {
              console.log(res.data);
              console.log(res.data[0]);
              setBoardData(res.data[0]);     
          })
    console.log("axios 후");   
  }

  useEffect(()=>{
      fetchData()
  }, [])

  const handleLoginButtonClick = () => {
  };

  return (
    <div>
      <h1>Single Page Content for ID {data.id}</h1>
      <p>Title: {data.title}</p>
      <p>Content: {data.content}</p>
      <p>Name: {data.name}</p>
      <p>Deadline: {data.board_deadline}</p>
      <p>Date: {data.board_dt}</p>
      <p>Members: {data.board_members}</p>
      <p>Open Link: {data.board_openlink}</p>
      <p>Period: {data.board_period}</p>
      <p>Position: {data.board_position}</p>
      <p>Views: {data.board_views}</p>
      <p>Customer ID: {data.cust_id}</p>
      <p>Profile Image: {data.pro_img}</p>
      <p>Profile Link: {data.pro_link}</p>
      <p>Profile Title: {data.pro_title}</p>
    </div>
  );
};

export default SinglePage;
